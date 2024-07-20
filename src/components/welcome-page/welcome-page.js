import React from 'react'
import './welcome-page.css'
import '../../index.css'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { duration } from '@mui/material'
const Welcomepage = () => {
  const navigate = useNavigate()

  const goToHome = () => {
    navigate('/home')
  }
  const zoomTransition = {
    scale: {
      duration: 0.5,
      yoyo: Infinity,
      ease: 'easeInOut',
    },
  }
  return (
    <>
      <div className='hero'>
        <div className='hero-container'>
          <div className='hero-text'>
            <motion.h3
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              Welcome to
            </motion.h3>

            <div>
              <motion.h1
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.5, delay: 0 }}
                className='name'
              >
                Atmos
              </motion.h1>
              <motion.h1
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.5, delay: 0 }}
                className='name'
              >
                Forecast
              </motion.h1>
              <motion.p
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
                className='herotext-p'
              >
                Convinent and easy access to accurate weather information
              </motion.p>
            </div>
            <motion.button
              initial={{ y: '100%' }}
              animate={{ scale: [1, 1.2, 1] }}
              exit={{ opacity: 0 }}
              onClick={goToHome}
              className='getstarted-btn'
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Welcomepage
