import React from 'react'
import { FaSearchLocation } from 'react-icons/fa'
import { FiHome, FiSearch } from 'react-icons/fi'
import { TbCurrentLocation } from 'react-icons/tb'
import './forecast.css'
import { useNavigate } from 'react-router-dom'
import Home from '../home/home'
import Searchbar from '../weather-search/search'
function TabBar({ activeTabBar, setActiveTabBar, setQuery }) {
  const navigate = useNavigate()
  // route to home
  const toHome = () => {
    navigate('/home')
  }
  //  route to search
  const toSearch = () => {
    navigate('/search')
  }
  // Display weather data based on current location
  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        setQuery({ lat: latitude, lon: longitude })
      })
    }
  }
  return (
    <div className='tab-bar'>
      {/* <div
        className={`tab-item ${activeTabBar === 'home' ? 'active' : ''}`}
        onClick={() => setActiveTabBar('home')}
      ></div> */}
      {/* <div
        className={`tab-item ${activeTabBar === 'search' ? 'active' : ''}`}
        onClick={() => setActiveTabBar('search')}
      ></div>
      <div
        className={`tab-item ${
          activeTabBar === 'currentlocation' ? 'active' : ''
        }`}
        onClick={() => setActiveTabBar('currentlocation')}
      ></div> */}
      <FiHome onClick={toHome} />

      <FaSearchLocation onClick={toSearch} />

      <TbCurrentLocation onClick={handleLocation} />
    </div>
  )
}

export default TabBar
