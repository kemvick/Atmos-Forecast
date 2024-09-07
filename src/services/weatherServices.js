import { DateTime } from 'luxon'
import { getIcon } from '../functions/functions'

const API_KEY = 'b61f46bf84aaaa8369a53271a2168089'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/'

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + infoType)
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY })
  return fetch(url).then((res) => res.json())
}
const iconUrlFromCode = (icon) =>
  `https://api.openweathermap.org/img/w/${icon}@2x.png`
// function getIconURL(icon) {
//   getIcon(`${icon}`)
//   return `../static/icons/${icon}.png`
// }
const formatToLocalTime = (
  secs,
  offset,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs + offset, { zone: 'utc' }).toFormat(format)
const formatCurrent = (data) => {
  const {
    coord: { lon, lat },
    dt,
    main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
    name,
    sys: { country, sunrise, sunset },
    timezone,
    visibility,
    weather,
    wind: { speed },
  } = data

  const { main: details, description, icon } = weather[0]
  const formattedLocalTime = formatToLocalTime(dt, timezone)
  return {
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    country,
    sunrise: formatToLocalTime(sunrise, timezone, 'hh:mm a'),
    sunset: formatToLocalTime(sunset, timezone, 'hh:mm a'),
    details,
    description,
    speed,
    icon: iconUrlFromCode(icon),
    formattedLocalTime,
    visibility,
    lat,
    lon,
    timezone,
    dt,
    name,
    pressure,
  }
}
const formatForecastWeather = (secs, offset, data) => {
  // hourly
  const hourly = data
    .filter((f) => f.dt > secs)
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, 'hh:mm a'),
      date: f.dt_txt,
    }))
    .slice(0, 5)
  // weekly
  const daily = data
    .filter((f) => f.dt_txt.slice(-8) === '00:00:00')
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, 'ccc'),
      date: f.dt_txt,
    }))
  return { hourly, daily }
}
// Weather Widget Fetch
export const fetchWeatherDataForCities = async (cities) => {
  const responses = await Promise.all(
    cities.map((city) =>
      fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`)
    )
  )
  const data = await Promise.all(responses.map((response) => response.json()))
  return data
}

const getformattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    'weather',
    searchParams
  ).then(formatCurrent)
  const { dt, lat, lon, timezone } = formattedCurrentWeather
  const formattedForecastWeather = await getWeatherData('forecast', {
    lat,
    lon,
    units: searchParams.units,
  }).then((d) => formatForecastWeather(dt, timezone, d.list))
  return { ...formattedCurrentWeather, ...formattedForecastWeather }
}
export default getformattedWeatherData
