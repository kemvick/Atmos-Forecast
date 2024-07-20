import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Welcomepage from './components/welcome-page/welcome-page'
import Home from './components/home/home'
import Searchbar from './components/weather-search/search'
import Forecast from './components/forecast/forecast'
import getformattedWeatherData from './services/weatherServices'
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'

const AnimatedRoutes = () => {
  const [query, setQuery] = useState({ q: 'london' })
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)
  // hour and daily
  // const weatherData = {
  //   daily: weather.daily,
  // }
  const getWeather = async () => {
    await getformattedWeatherData({ ...query, units }).then((data) => {
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
                setUnits={setUnits}
              />
            }
          ></Route>
        )}
      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
