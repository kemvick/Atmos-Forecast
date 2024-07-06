import React from 'react'
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

const Searchbar = () => {
  // Data
  const cities = [
    {
      id: 1,
      name: 'London, England',
      img: weathercond1,
    },
    {
      id: 2,
      name: 'Sydney, Australia',
      img: weathercond2,
    },
    {
      id: 3,
      name: 'Tokyo, Japan',
      img: weathercond3,
    },
    {
      id: 4,
      name: 'Paris, France',
      img: weathercond2,
    },
    {
      id: 5,
      name: 'Toronto, Canada',
      img: weathercond1,
    },
  ]
  const navigate = useNavigate()
  const goBackToHome = () => {
    navigate('/home')
  }
  const displayWeatherInfo = () => {
    navigate('/forecast')
  }
  return (
    <>
      <section className='body'>
        <motion.section exit={{ opacity: 0 }} className='search-header'>
          <div className='header-title'>
            <FaAngleLeft onClick={goBackToHome} className='back-btn' />
            <div>Weather</div>
          </div>
          <div className='units-btn'>
            <button onClick={displayWeatherInfo}>°C</button>
            <p>|</p>
            <button>°F</button>
          </div>
          {/* <button className='settings-btn'>
            <div className='units-logo'>
              Units
              <FaAngleDown
                className='units-btn'
                type='button'
                onClick={UnitBtnHandler}
              />
            </div>
            <div className='unit-list'>
              <p>Celius</p>
              <p>Fahreint</p>
            </div>
          </button> */}
        </motion.section>
        {/* search bar */}
        <motion.section exit={{ opacity: 0 }} className='search-bar'>
          <input
            type='text'
            placeholder='Search city name...'
            className='input'
          />
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
              <div className='widget-details'>
                <h2 className='temp'>19°</h2>
                <p className='high-low1'>
                  H-
                  <span>24°</span>
                  L-<span>18°</span>
                </p>
                <div className='city-weather-desc'>
                  <p className='city'>{city.name} </p>
                  <p className='weather-desc1'>Fast Wind</p>
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
