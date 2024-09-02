import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../index.css'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { TbCurrentLocation } from 'react-icons/tb'
import { motion } from 'framer-motion'
const Home = ({ setQuery }) => {
  const navigate = useNavigate()

  const goToSearch = () => {
    navigate('/search')
  }
  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        setQuery({ lat: latitude, lon: longitude })
        navigate('/forecast')
      })
    }
  }
  return (
    <>
      <section className='home'>
        <motion.div
          inherit={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut', delay: 0 }}
          className='home-hero'
        ></motion.div>
        <div className='search-method'>
          <div className='description'>
            <motion.h2
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              Choose a search method to get weather information
            </motion.h2>
          </div>
          <div className='search-button'>
            <motion.button
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, delay: 0 }}
              className='city-btn'
              onClick={goToSearch}
            >
              <FaMagnifyingGlass size={18} />
              Search by city name
            </motion.button>
            <motion.button
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.5, delay: 0 }}
              className='city-btn'
              onClick={handleLocation}
            >
              <TbCurrentLocation size={20} />
              Current location
            </motion.button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
