import React, { useEffect } from 'react'
import { FaAngleLeft } from 'react-icons/fa'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
// assests
import assets from '../../assets/Rectangle 1.png'
import '../../index.css'
import { fetchWeatherDataForCities } from '../../services/weatherServices'
import { motion } from 'framer-motion'
import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { useState, useMemo } from 'react'
import iconMapping, { defaultIcon } from '../../functions/functions'

const Searchbar = ({ setQuery }) => {
  // weather widget
  const cities = useMemo(
    () => ['Port Harcourt', 'Otuaka', 'Yenagoa', 'Brass', 'Elebele'],
    []
  )
  const [weatherWidget, setWeatherWidget] = useState([])
  const [isWidgetLoading, setIsWidgetLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    const getWeatherData = async () => {
      try {
        setIsWidgetLoading(true)
        const data = await fetchWeatherDataForCities(cities)
        setWeatherWidget(data)
        console.log(data)
        setTimeout(() => {
          setIsWidgetLoading(false)
        }, 2000)
      } catch (error) {
        setError('failed to fetch weather data')
        setIsWidgetLoading(true)
      }
    }
    getWeatherData()
  }, [cities])

  // input field
  const [city, setCity] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const goBackToHome = () => {
    navigate('/home')
  }
  // Display weather data based on city name
  const handSearchClick = (e) => {
    e.preventDefault()
    setIsLoading(true)
    if (city !== '') setQuery({ q: city })
    setTimeout(() => {
      setIsLoading(false)
      navigate(`/forecast`)
    }, 2000)
  }
  // handle view default cities weather details
  return (
    <>
      {isLoading ? (
        <div className='spinner-container search-sc'>
          <div className='loading'>
            <div className='loading-spinner search-ls'></div>
            <p>Processing Request...</p>
          </div>
        </div>
      ) : (
        <section className='body'>
          <motion.section exit={{ opacity: 0 }} className='search-header'>
            <div className='header-title'>
              <FaAngleLeft onClick={goBackToHome} className='back-btn' />
              <div>Weather Search</div>
            </div>
          </motion.section>
          {/* search bar */}
          <motion.section exit={{ opacity: 0 }} className='search-bar'>
            <form onSubmit={handSearchClick} className='search-frm'>
              <input
                value={city}
                onChange={(e) => setCity(e.currentTarget.value)}
                type='text'
                placeholder='Input city name...'
                className='input'
              />
            </form>
            <FaMagnifyingGlass size={18} className='search-icon' />
          </motion.section>
          {/* widgets */}
          <motion.section className='widgets-container'>
            {isWidgetLoading ? (
              <div className='widget-loading-container'>
                <div className='single-widget-loading'></div>
                <div className='single-widget-loading'></div>
                <div className='single-widget-loading'></div>
                <div className='single-widget-loading'></div>
                <div className='single-widget-loading'></div>
              </div>
            ) : (
              weatherWidget.map((cityWeather, index) => {
                const weatherIconCode = cityWeather.weather[0].icon
                const handleDefuailtCitiesWeatherInfo = () => {
                  setQuery({ q: cityWeather.name })
                  setTimeout(() => {
                    navigate('/forecast')
                  }, 500)
                }
                const customIcon = iconMapping[weatherIconCode] || defaultIcon
                return (
                  <motion.button
                    inherit={{ y: '-100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '100%', opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut', delay: 0 }}
                    key={index}
                    className='widget'
                    onClick={handleDefuailtCitiesWeatherInfo}
                  >
                    <img src={assets} alt='' className='rect' />
                    <img src={customIcon} alt='' className='small-moon' />
                    <div className='widget-details1'>
                      <h2 className='temp1'>
                        {cityWeather.main.temp.toFixed()}°C
                      </h2>
                      <p className='high-low1'>
                        <p>
                          <ArrowUpward fontSize='16px' />
                          <span>{cityWeather.main.temp_max.toFixed()}°C</span>
                        </p>
                        <p>
                          <ArrowDownward fontSize='16px' />
                          <span>{cityWeather.main.temp_min.toFixed()}°C</span>
                        </p>
                      </p>
                      <div className='city-weather-desc'>
                        <p className='city'> {cityWeather.name}</p>
                        <p className='weather-desc1'>
                          {cityWeather.weather[0].description}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                )
              })
            )}
          </motion.section>
        </section>
      )}
    </>
  )
}
export default Searchbar
