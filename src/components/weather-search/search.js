import React, { useEffect } from 'react'
import { FaAngleDown, FaAngleLeft } from 'react-icons/fa'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
// assests
import assets from '../../assets/Rectangle 1.png'
import weathercond1 from '../../assets/Moon cloud fast wind.png'
import weathercond2 from '../../assets/Moon cloud mid rain.png'
import weathercond3 from '../../assets/Sun cloud mid rain.png'
import './search.css'
import { motion } from 'framer-motion'
import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { useState } from 'react'

const Searchbar = ({ setQuery, setUnits, weather }) => {
  // Data
  const cities = [
    {
      id: 1,
      temp: '47°',
      city_name: 'brass',
      img: weathercond1,
      weatherDesc: 'rain',
    },
    {
      id: 2,
      temp: `67°`,
      city_name: 'Sydney',
      img: weathercond2,
      weatherDesc: ' rain',
    },
    {
      id: 3,
      temp: `39°`,
      city_name: 'Tokyo',
      img: weathercond3,
      weatherDesc: 'clear',
    },
    {
      id: 4,
      temp: `50°`,
      city_name: 'Paris',
      img: weathercond2,
      weatherDesc: 'snow',
    },
    {
      id: 5,
      temp: `20°`,
      city_name: 'Toronto',
      img: weathercond1,
      weatherDesc: 'sun',
    },
  ]
  let scr = window.innerWidth
  console.log(scr)
  // input field
  const [city, setCity] = useState('')

  const navigate = useNavigate()
  const goBackToHome = () => {
    navigate('/home')
  }
  // useEffect(() => {
  //   setQuery({ q: cities.city_name })
  // })[]
  // Display weather data based on city name
  const handSearchClick = (e) => {
    e.preventDefault()
    if (city !== '') setQuery({ q: city })
    navigate(`/forecast`)
  }

  return (
    <>
      <section className='body'>
        <motion.section exit={{ opacity: 0 }} className='search-header'>
          <div className='header-title'>
            <FaAngleLeft onClick={goBackToHome} className='back-btn' />
            <div>Weather Search</div>
          </div>
          {/* <div className='units-btn'>
            <button onClick={displayWeatherInfo}>°C</button>
            <p>|</p>
            <button>°F</button>
          </div>  */}
        </motion.section>
        {/* search bar */}
        <motion.section exit={{ opacity: 0 }} className='search-bar'>
          <form onSubmit={handSearchClick} className='search-frm'>
            <input
              value={city}
              onChange={(e) => setCity(e.currentTarget.value)}
              type='text'
              placeholder='Search city name...'
              className='input'
            />
          </form>
          <FaMagnifyingGlass size={18} className='search-icon' />
        </motion.section>
        {/* widgets */}
        <motion.section className='widgets-container'>
          {cities.map((city) => (
            <motion.div
              inherit={{ y: '-100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut', delay: 0 }}
              key={cities.id}
              className='widget'
            >
              <img src={assets} alt='' className='rect' />
              <img src={city.img} alt='' className='small-moon' />
              <div className='widget-details1'>
                <h2 className='temp1'>{city.temp}</h2>
                <p className='high-low1'>
                  <p>
                    <ArrowUpward fontSize='16px' />
                    <span>10°</span>
                  </p>
                  <p>
                    <ArrowDownward fontSize='16px' />
                    <span>39°</span>
                  </p>
                </p>
                <div className='city-weather-desc'>
                  <p className='city'> {city.city_name}</p>
                  <p className='weather-desc1'>{city.weatherDesc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.section>
      </section>
    </>
  )
}
export default Searchbar
