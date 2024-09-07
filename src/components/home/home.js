import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../index.css'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { TbCurrentLocation } from 'react-icons/tb'
import { motion } from 'framer-motion'
const Home = ({ setQuery, icon }) => {
  const navigate = useNavigate()

  // loading
  const [isLoadingButtonOne, setIsLoadingButtonOne] = useState(false)
  const [isLoadingButtonTwo, setIsLoadingButtonTwo] = useState(false)
  const goToSearch = () => {
    setIsLoadingButtonOne(true)

    setTimeout(() => {
      setIsLoadingButtonOne(false)
      navigate('/search')
    }, 2000)
  }

  const handleLocation = () => {
    setIsLoadingButtonTwo(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        setQuery({ lat: latitude, lon: longitude })
        setTimeout(() => {
          setIsLoadingButtonTwo(false)
          navigate('/forecast')
        }, 3000)
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
              disabled={isLoadingButtonOne}
            >
              {isLoadingButtonOne ? (
                <span className='search-loading'></span>
              ) : (
                <span>
                  <FaMagnifyingGlass size={18} />
                  Search by city name
                </span>
              )}
            </motion.button>
            <motion.button
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.5, delay: 0 }}
              className='city-btn'
              onClick={handleLocation}
              disabled={isLoadingButtonTwo}
            >
              {isLoadingButtonTwo ? (
                <span className='search-loading'></span>
              ) : (
                <span>
                  <TbCurrentLocation size={20} />
                  Current location
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
