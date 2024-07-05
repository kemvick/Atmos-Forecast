import React from 'react'
import { StrictMode } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Welcomepage from './components/welcome-page/welcome-page'
import Home from './components/home/home'
import Searchbar from './components/weather-search/search'
import Forecast from './components/forecast/forecast'
// import BottomNav from './BottomNav'
const App = () => {
  return (
    <div className='container'>
      <StrictMode>
        <Router>
          <Routes>
            <Route exact path='/' element={<Welcomepage />}></Route>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/search' element={<Searchbar />}></Route>
            <Route path='/forecast' element={<Forecast />}></Route>
          </Routes>
        </Router>
      </StrictMode>
    </div>
  )
}

export default App
