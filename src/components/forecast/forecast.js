import React, { useState, useEffect } from 'react'
import '../../index.css'
import './forecast.css'
import '../weather-search/search.css'
import weathercond2 from '../../assets/Moon cloud mid rain.png'
import { FaThermometerEmpty } from 'react-icons/fa'
import { FaAngleLeft } from 'react-icons/fa'
import { FiWind } from 'react-icons/fi'
import { BiSolidDropletHalf } from 'react-icons/bi'
import { GiSun, GiSunrise } from 'react-icons/gi'
import TabContent from './tabContent.js'
import HourlyForecast from './hourlyForecast.js'
import WeeklyForecast from './WeeklyForecast.js'
import TabBar from './tabBar.js'
import { useNavigate } from 'react-router-dom'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Forecast = () => {
  // scroll animation
  const controls = useAnimation()
  const [ref, inView] = useInView({ triggerOnce: true })

  React.useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])
  const weatherStatDetails = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: 'Real feel',
      value: '15 °C',
    },
    {
      id: 2,
      Icon: BiSolidDropletHalf,
      title: 'Humidity',
      value: '93%',
    },
    {
      id: 3,
      Icon: FiWind,
      title: 'Wind',
      value: '13 km/h',
    },
    {
      id: 4,
      Icon: GiSunrise,
      title: 'Sunrise',
      value: '9:19 Am',
    },
  ]
  const [activeTab, setActiveTab] = useState(0)
  const [activeTabBar, setActiveTabBar] = useState(0)
  const [showTabBar, setShowTabBar] = useState(false)
  const tabs = [
    { label: 'Hourly Forecast', content: <HourlyForecast /> },
    { label: 'Weekly Forecast', content: <WeeklyForecast /> },
  ]
  const navigate = useNavigate()
  const fromForecastToSearch = () => {
    navigate('/search')
  }
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 650) {
        setShowTabBar(true)
      } else {
        setShowTabBar(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <>
      <section className='weather-details'>
        <section className='search-header search'>
          <div className='header-title'>
            <FaAngleLeft onClick={fromForecastToSearch} />
            <div>AtmosForecast</div>
          </div>
          <div className='units-btn'>
            <button>°C</button>
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
        </section>
        <div className='time-location'>
          <motion.p
            ref={ref}
            initial='hidden'
            animate={controls}
            exit={{ y: '-100%' }}
            variants={{
              visible: { y: '-100' },
              hidden: { y: 0 },
            }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            Sunday 23rd, 2024 | Local Time: 6:30 PM
          </motion.p>
        </div>
        <div className='temp-and-details'>
          <motion.p
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            className='city-name'
          >
            London, GB
          </motion.p>
          <motion.img
            inherit={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 0, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            src={weathercond2}
            alt='rainy'
            className='weather-img'
          ></motion.img>
          <motion.h1
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut', delay: 0 }}
            className='temp'
          >
            19°
          </motion.h1>
          <motion.p
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            className='weather-desc'
          >
            mostly clear
          </motion.p>
          <motion.p
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            className='high-low'
          >
            <p>
              H-<span>24°</span>
            </p>
            L-<span>18°</span>
          </motion.p>
          <div className='weather-stats-container'>
            {weatherStatDetails.map(({ id, Icon, title, value }) => (
              <div key={id} className='weather-stat'>
                <Icon className='cond-img' />
                <p>{title}</p>
                <p>{value}</p>
              </div>
            ))}
          </div>
          <div className='weather-map'>
            weather map
            <div className='map'></div>
          </div>
          {/* forecast */}
          <div className='forecast-container'>
            <div className='top-line'>
              <div className='tabs'>
                <ul className='tab-list'>
                  {tabs.map((tab, index) => (
                    <li
                      key={index}
                      className={`tab ${activeTab === index ? 'active' : ''}`}
                      onClick={() => setActiveTab(index)}
                    >
                      {tab.label}
                    </li>
                  ))}
                </ul>
                <div className='tab-content'>
                  <TabContent content={tabs[activeTab].content} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {showTabBar && (
          <TabBar
            activeTabBar={activeTabBar}
            setActiveTabBar={setActiveTabBar}
          />
        )}
      </section>
    </>
  )
}

export default Forecast
