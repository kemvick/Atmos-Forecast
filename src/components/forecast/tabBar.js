import React from 'react'
import { FaSearchLocation } from 'react-icons/fa'
import { FiHome, FiSearch } from 'react-icons/fi'
import { TbCurrentLocation } from 'react-icons/tb'
import './forecast.css'
import Home from '../home/home'
import Searchbar from '../weather-search/search'
function TabBar({ activeTabBar, setActiveTabBar }) {
  return (
    <div className='tab-bar'>
      {/* <div
        className={`tab-item ${activeTabBar === 'home' ? 'active' : ''}`}
        onClick={() => setActiveTabBar('home')}
      ></div>
      <div
        className={`tab-item ${activeTabBar === 'search' ? 'active' : ''}`}
        onClick={() => setActiveTabBar('search')}
      ></div>
      <div
        className={`tab-item ${
          activeTabBar === 'currentlocation' ? 'active' : ''
        }`}
        onClick={() => setActiveTabBar('currentlocation')}
      ></div> */}
      <FiHome />

      <FaSearchLocation />

      <TbCurrentLocation />
    </div>
  )
}

export default TabBar
