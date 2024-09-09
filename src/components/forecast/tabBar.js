import React from 'react'
import { FaSearchLocation } from 'react-icons/fa'
import { FiHome } from 'react-icons/fi'
import { TbCurrentLocation } from 'react-icons/tb'
import './forecast.css'
import { useNavigate } from 'react-router-dom'

function TabBar({ setQuery }) {
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
  // const handleLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const { latitude, longitude } = position.coords
  //       setQuery({ lat: latitude, lon: longitude })
  //     })
  //   }
  // }
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
    </div>
  )
}

export default TabBar
