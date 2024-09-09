import React, { useState, useEffect } from 'react'
import '../../index.css'
import './forecast.css'
import '../weather-search/search.css'
import { FaThermometerEmpty } from 'react-icons/fa'
import { FaAngleLeft } from 'react-icons/fa'
import { FiWind } from 'react-icons/fi'
import { BiSolidDropletHalf } from 'react-icons/bi'
import { GiSunrise, GiSunset } from 'react-icons/gi'
import { MdOutlineCompress } from 'react-icons/md'
import TabContent from './tabContent.js'
import HourlyForecast from './hourlyForecast.js'
import WeeklyForecast from './WeeklyForecast.js'
import TabBar from './tabBar.js'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
// import iconMapping, { defaultIcon } from '../../functions/functions'
import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { IoLocation } from 'react-icons/io5'
import MapComponent from '../map/map.js'
import customIcon01d from '../../static/icons/01d.png'
import customIcon01n from '../../static/icons/01n.png'
import customIcon02d from '../../static/icons/02d.png'
import customIcon02n from '../../static/icons/02n.png'
import customIcon03d from '../../static/icons/03d.png'
import customIcon03n from '../../static/icons/03n.png'
import customIcon04d from '../../static/icons/04d.png'
import customIcon04n from '../../static/icons/04n.png'
import customIcon09d from '../../static/icons/09d.png'
import customIcon09n from '../../static/icons/09n.png'
import customIcon10d from '../../static/icons/10d.png'
import customIcon10n from '../../static/icons/10n.png'
import customIcon11d from '../../static/icons/11d.png'
import customIcon11n from '../../static/icons/11n.png'
import customIcon13d from '../../static/icons/13d.png'
import customIcon13n from '../../static/icons/13n.png'
import customIcon50d from '../../static/icons/50d.png'
import customIcon50n from '../../static/icons/50n.png'

const API_KEY = 'b61f46bf84aaaa8369a53271a2168089'

const Forecast = ({
  weather: {
    formattedLocalTime,
    name,
    country,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    description,
    sunrise,
    sunset,
    speed,
    pressure,
    icon,
    lat,
    lon,
  },
  data,
  setQuery,
  units,
  setUnits,
}) => {
  const [latLon, setLatLon] = useState([lat, lon]) // Initialize with weather coordinates

  // Fetch weather data based on lat and lon
  const fetchWeatherByLatLon = async (lat, lon) => {
    try {
      if (lat && lon) {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
        )
        if (!response.ok) {
          throw new Error('Failed to fetch weather data.')
        }
        const data = await response.json()
        setQuery(data.name) // Update the city based on fetched data
      }
    } catch (error) {
      console.error('Error fetching weather data:', error)
    }
  }

  useEffect(() => {
    // Fetch weather data when user clicks on the map or drags the marker
    if (latLon[0] && latLon[1]) {
      fetchWeatherByLatLon(latLon[0], latLon[1])
    }
  }, [latLon])
  console.log(latLon)

  // iconmapping
  const iconMapping = {
    '01d': customIcon01d,
    '01n': customIcon01n,
    '02d': customIcon02d,
    '02n': customIcon02n,
    '03d': customIcon03d,
    '03n': customIcon03n,
    '04d': customIcon04d,
    '04n': customIcon04n,
    '09d': customIcon09d,
    '09n': customIcon09n,
    '10d': customIcon10d,
    '10n': customIcon10n,
    '11d': customIcon11d,
    '11n': customIcon11n,
    '13d': customIcon13d,
    '13n': customIcon13n,
    '50d': customIcon50d,
    '50n': customIcon50n,
  }
  const weatherStatDetails = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: 'Real feel',
      value: `${feels_like.toFixed()}° ${units === 'metric' ? 'C' : 'F'}`,
    },
    {
      id: 2,
      Icon: BiSolidDropletHalf,
      title: 'Humidity',
      value: `${humidity.toFixed()}%`,
    },
    {
      id: 3,
      Icon: FiWind,
      title: 'Wind',
      value: `${speed.toFixed()} ${units === 'metric' ? 'km/h' : 'm/s'}`,
    },
    {
      id: 4,
      Icon: GiSunrise,
      title: 'Sunrise',
      value: `${sunrise}`,
    },
    {
      id: 5,
      Icon: GiSunset,
      title: 'Sunset',
      value: `${sunset}`,
    },
    {
      id: 6,
      Icon: MdOutlineCompress,
      title: 'Pressure',
      value: `${pressure} ${units === 'metric' ? 'mb' : 'inHmg'}`,
    },
  ]
  const [activeTab, setActiveTab] = useState(0)
  const [activeTabBar, setActiveTabBar] = useState(0)
  const [showTabBar, setShowTabBar] = useState(false)
  const customIcon = iconMapping[icon] || icon
  const tabs = [
    {
      label: 'Hourly Forecast',
      content: (
        <HourlyForecast
          data={data.hourly}
          units={units}
          icon={icon}
          customIcon={customIcon}
        />
      ),
    },
    {
      label: 'Daily Forecast',
      content: (
        <WeeklyForecast
          data={data.daily}
          units={units}
          icon={icon}
          customIcon={customIcon}
        />
      ),
    },
  ]
  // console.log(icon)

  const navigate = useNavigate()
  const fromForecastToSearch = () => {
    navigate('/search')
  }
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 650) {
        setShowTabBar(true)
      } else {
        setShowTabBar(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <>
      <section className='weather-details'>
        <section className='search-header search'>
          <div className='header-title'>
            <FaAngleLeft onClick={fromForecastToSearch} />
            <div>AtmosForecast</div>
          </div>
          <div className='units-btn'>
            <button onClick={() => setUnits('metric')}>°C</button>
            <p>|</p>
            <button onClick={() => setUnits('imperial')}>°F</button>
          </div>
        </section>
        <div className='time-location'>
          <motion.p
            initial='hidden'
            exit={{ y: '-100%' }}
            variants={{
              visible: { y: '-100' },
              hidden: { y: 0 },
            }}
            transition={{ duration: 0.5, delay: 0 }}
            className='time'
          >
            {formattedLocalTime}
          </motion.p>
        </div>
        <div className='temp-and-details'>
          <motion.p
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            className='city-name'
          >
            <div className='county_name'>
              <IoLocation />
              {`${name}, ${country}`}
            </div>
          </motion.p>
          <div className='horizontal-details'>
            <div className='deg-img'>
              <img
                inherit={{ y: '-100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 0, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
                src={customIcon}
                alt='icon'
                className='weather-img'
              />
              {/* <img src={icon} alt='weather_icon' className='weather-img' /> */}
              <motion.h1
                initial={{ y: '-100%' }}
                animate={{ y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut', delay: 0 }}
                className='temp'
              >
                {`${temp.toFixed()}° ${units === 'metric' ? 'C' : 'F'}`}
              </motion.h1>
              <motion.p
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
                className='weather-desc'
              >
                {description}
              </motion.p>
            </div>
            <motion.p
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              className='high-low'
            >
              <p>
                <ArrowUpward />
                <span>{`${temp_max.toFixed()}° ${
                  units === 'metric' ? 'C' : 'F'
                }`}</span>
              </p>
              <p>
                <ArrowDownward />
                <span>{`${temp_min.toFixed()}° ${
                  units === 'metric' ? 'C' : 'F'
                }`}</span>
              </p>
            </motion.p>
          </div>
          <div className='weather-stats-container'>
            {weatherStatDetails.map(({ id, Icon, title, value }) => (
              <div key={id} className='weather-stat'>
                <Icon className='cond-img' />
                <p>{title}</p>
                <p>{value}</p>
              </div>
            ))}
          </div>
          {/* forecast */}
          <div className='forecast-container'>
            <div className='top-line'>
              <div className='tabs'>
                <ul className='tab-list'>
                  {tabs.map((tab, index) => (
                    <li
                      key={index}
                      className={`tab ${activeTab === index ? 'active' : ''}`}
                      onClick={() => setActiveTab(index)}
                    >
                      {tab.label}
                    </li>
                  ))}
                </ul>
                <div className='tab-content'>
                  <TabContent content={tabs[activeTab].content} />
                </div>
              </div>
            </div>
          </div>
          {/* map */}
          <div className='weather-map'>
            weather map
            <MapComponent
              lat={latLon[0]}
              lon={latLon[1]}
              setLatLon={setLatLon}
              fetchWeatherData={fetchWeatherByLatLon}
            />
            {/* <div className='map'>
            </div> */}
          </div>
          {/* <Map /> */}
        </div>
        {showTabBar && (
          <TabBar
            activeTabBar={activeTabBar}
            setActiveTabBar={setActiveTabBar}
            setQuery={setQuery}
          />
        )}
      </section>
    </>
  )
}
export default Forecast
