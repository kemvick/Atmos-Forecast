import React, { useState, useEffect } from 'react'
import '../../index.css'
import './forecast.css'
import '../weather-search/search.css'
import weathercond2 from '../../assets/Moon cloud mid rain.png'
import { FaThermometerEmpty } from 'react-icons/fa'
import { FaAngleLeft } from 'react-icons/fa'
import { FiWind } from 'react-icons/fi'
import { BiSolidDropletHalf } from 'react-icons/bi'
import { GiSunrise, GiSunset } from 'react-icons/gi'
import { MdOutlineCompress } from 'react-icons/md'
import TabContent from './tabContent.js'
import HourlyForecast from './hourlyForecast.js'
import WeeklyForecast from './WeeklyForecast.js'
import TabBar from './tabBar.js'
import { useNavigate } from 'react-router-dom'
import { motion, useAnimation } from 'framer-motion'

import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { IoLocation } from 'react-icons/io5'
// import { Map } from '../map.js'
// import getformattedWeatherData from './services/weatherServices'

const Forecast = ({
  weather: {
    formattedLocalTime,
    name,
    country,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    details,
    sunrise,
    sunset,
    speed,
    pressure,
  },
  data,
  setQuery,
  units,
  setUnits,
}) => {
  // scroll animation
  // const controls = useAnimation()
  // const [ref, inView] = useInView({ triggerOnce: true })

  // React.useEffect(() => {
  //   if (inView) {
  //     controls.start('visible')
  //   }
  // }, [controls, inView])
  const weatherStatDetails = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: 'Real feel',
      value: `${feels_like.toFixed()}°`,
    },
    {
      id: 2,
      Icon: BiSolidDropletHalf,
      title: 'Humidity',
      value: `${humidity.toFixed()}%`,
    },
    {
      id: 3,
      Icon: FiWind,
      title: 'Wind',
      value: `${speed.toFixed()} ${units === 'im' ? 'km/h' : 'm/s'}`,
    },
    {
      id: 4,
      Icon: GiSunrise,
      title: 'Sunrise',
      value: `${sunrise}`,
    },
    {
      id: 5,
      Icon: GiSunset,
      title: 'Sunset',
      value: `${sunset}`,
    },
    {
      id: 6,
      Icon: MdOutlineCompress,
      title: 'Pressure',
      value: `${pressure} Pa`,
    },
  ]
  const [activeTab, setActiveTab] = useState(0)
  const [activeTabBar, setActiveTabBar] = useState(0)
  const [showTabBar, setShowTabBar] = useState(false)
  const tabs = [
    {
      label: 'Hourly Forecast',
      content: <HourlyForecast data={data} />,
    },
    {
      label: 'Daily Forecast',
      content: <WeeklyForecast data={data} />,
    },
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
            <button onClick={() => setUnits('metric')}>°C</button>
            <p>|</p>
            <button onClick={() => setUnits('imperial')}>°F</button>
          </div>
        </section>
        <div className='time-location'>
          <motion.p
            initial='hidden'
            exit={{ y: '-100%' }}
            variants={{
              visible: { y: '-100' },
              hidden: { y: 0 },
            }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            {formattedLocalTime}
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
            <div className='county_name'>
              <IoLocation />
              {`${name}, ${country}`}
            </div>
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
            {`${temp.toFixed()}°`}
          </motion.h1>
          <motion.p
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            className='weather-desc'
          >
            {details}
          </motion.p>
          <motion.p
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            className='high-low'
          >
            <p>
              <ArrowUpward />
              <span>{`${temp_max.toFixed()}°`}</span>
            </p>
            <p>
              <ArrowDownward />
              <span>{`${temp_min.toFixed()}°`}</span>
            </p>
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
          {/* map */}
          <div className='weather-map'>
            weather map
            <div className='map'></div>
          </div>
          {/* <Map /> */}
        </div>
        {showTabBar && (
          <TabBar
            activeTabBar={activeTabBar}
            setActiveTabBar={setActiveTabBar}
            setQuery={setQuery}
          />
        )}
      </section>
    </>
  )
}
export default Forecast
