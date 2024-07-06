import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Welcomepage from './components/welcome-page/welcome-page'
import Home from './components/home/home'
import Searchbar from './components/weather-search/search'
import Forecast from './components/forecast/forecast'

import { AnimatePresence } from 'framer-motion'

const AnimatedRoutes = () => {
  const location = useLocation()
  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route exact path='/' element={<Welcomepage />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/search' element={<Searchbar />}></Route>
        <Route path='/forecast' element={<Forecast />}></Route>
      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
