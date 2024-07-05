import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../index.css'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { TbCurrentLocation } from 'react-icons/tb'

const Home = () => {
  const navigate = useNavigate()

  const goToSearch = () => {
    navigate('/search')
  }
  return (
    <>
      <section className='home'>
        <div className='home-hero'></div>
        <div className='search-method'>
          <div className='description'>
            <h2> Choose a search method to get weather informations</h2>
          </div>
          <div className='search-button'>
            <button className='city-btn' onClick={goToSearch}>
              <FaMagnifyingGlass size={18} />
              Search by city name
            </button>
            <button className='city-btn'>
              <TbCurrentLocation size={20} />
              Current location
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
