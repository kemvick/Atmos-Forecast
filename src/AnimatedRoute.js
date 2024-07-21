import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Welcomepage from './components/welcome-page/welcome-page'
import Home from './components/home/home'
import Searchbar from './components/weather-search/search'
import Forecast from './components/forecast/forecast'
import getformattedWeatherData from './services/weatherServices'
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './toastStyles.css'

const capitalizFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
const AnimatedRoutes = () => {
  const [query, setQuery] = useState({ q: 'london' })
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)
  // hour and daily
  // const weatherData = {
  //   daily: weather.daily,
  // }
  const getWeather = async () => {
    const message = query.q ? query.q : 'current location'
    toast.info(
      `Retrieving weather information for ${capitalizFirstLetter(message)}`
    )
    await getformattedWeatherData({ ...query, units }).then((data) => {
      toast.success(
        `Retrieved weather information for ${data.name}, ${data.country}`
      )
      setWeather(data)
    })
  }
  useEffect(() => {
    getWeather()
  }, [query, units])
  const location = useLocation()
  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route exact path='/' element={<Welcomepage />}></Route>
        <Route path='/home' element={<Home setQuery={setQuery} />}></Route>
        <Route
          path='/search'
          element={<Searchbar setQuery={setQuery} setUnits={setUnits} />}
        ></Route>
        {weather && (
          <Route
            path='/forecast'
            element={
              <Forecast
                weather={weather}
                title='3 hours forecast'
                data={weather.daily}
                setQuery={setQuery}
                units={{ units }}
                setUnits={setUnits}
              />
            }
          ></Route>
        )}
      </Routes>
      <ToastContainer
        autoClose={2000}
        hideProgressBar={false}
        theme='colored'
      />
    </AnimatePresence>
  )
}

export default AnimatedRoutes
