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
import './index.css'

const capitalizFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
const AnimatedRoutes = () => {
  const [query, setQuery] = useState({ q: 'yenagoa' })
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)
  const getWeather = async () => {
    try {
      const message = query.q ? query.q : 'current location'
      toast.info(
        `Retrieving weather information for ${capitalizFirstLetter(message)}`
      )

      const data = await getformattedWeatherData({ ...query, units })
      toast.success(
        `Retrieved weather information for ${data.name}, ${data.country}`
      )
      setWeather(data)
    } catch (error) {
      console.error('Error fetching weather:', error)
      toast.error('Failed to retrieve weather information.')
    }
  }
  useEffect(() => {
    if (query.q) {
      getWeather()
    }
  }, [query, units])
  const location = useLocation()

  const [isLoading, setIsLoading] = useState(true)
  // const [content, setContent] = useState(null)
  useEffect(() => {
    setTimeout(() => {
      // setContent('content')
      setIsLoading(false)
    }, 3000)
  })
  return (
    <>
      {isLoading ? (
        <div className='spinner-container'>
          <div className='loading'>
            <div className='loading-spinner'></div>
            <p>loading...</p>
          </div>
        </div>
      ) : (
        <AnimatePresence mode='wait'>
          <Routes location={location} key={location.pathname}>
            <Route exact path='/' element={<Welcomepage />}></Route>
            <Route path='/home' element={<Home setQuery={setQuery} />}></Route>
            <Route
              path='/search'
              element={<Searchbar setQuery={setQuery} />}
            ></Route>
            {weather && (
              <Route
                path='/forecast'
                element={
                  <Forecast
                    weather={weather}
                    title='3 hours forecast'
                    data={weather}
                    setQuery={setQuery}
                    units={units}
                    setUnits={setUnits}
                  />
                }
              ></Route>
            )}
            {/* <ToastContainer
          autoClose={2000}
          hideProgressBar={false}
          theme='colored'
        /> */}
          </Routes>
        </AnimatePresence>
      )}
    </>
  )
}

export default AnimatedRoutes
