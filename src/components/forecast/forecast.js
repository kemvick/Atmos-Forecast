import React, { useState, useEffect } from 'react'
import '../../index.css'
import './forecast.css'
import '../weather-search/search.css'
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
import { motion } from 'framer-motion'
import iconMapping, { defaultIcon } from '../../functions/functions'
import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { IoLocation } from 'react-icons/io5'
import MapComponent from '../map/map.js'
import { fetchWeatherByLatLon } from '../../services/weatherServices'

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
    description,
    sunrise,
    sunset,
    speed,
    pressure,
    icon,
    lat = 4.9247,
    lon = 6.2642,
  },
  data,
  setQuery,
  units,
  setUnits,
}) => {
  const [latLon, setLatLon] = useState({ lat, lon }) // Initialize with weather coordinates
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (latLon.lat && latLon.lon) {
      setLoading(true)
      fetchWeatherByLatLon(latLon.lat, latLon.lon)
        .then(() => setLoading(false))
        .catch((error) => {
          console.error('Error fetching weather data:', error)
          setLoading(false)
        })
    }
  }, [latLon])

  // Weather details
  const weatherStatDetails = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: 'Real feel',
      value: `${feels_like.toFixed()}° ${units === 'metric' ? 'C' : 'F'}`,
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
      value: `${speed.toFixed()} ${units === 'metric' ? 'km/h' : 'm/s'}`,
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
      value: `${pressure} ${units === 'metric' ? 'mb' : 'inHmg'}`,
    },
  ]

  const [activeTab, setActiveTab] = useState(0)
  const [activeTabBar, setActiveTabBar] = useState(0)
  const [showTabBar, setShowTabBar] = useState(false)
  console.log(icon)

  const customIcon = iconMapping[icon] || icon
  // console.log(customIcon)

  const tabs = [
    {
      label: 'Hourly Forecast',
      content: (
        <HourlyForecast
          data={data.hourly}
          units={units}
          icon={icon}
          // customIcon={customIcon}
        />
      ),
    },
    {
      label: 'Daily Forecast',
      content: (
        <WeeklyForecast
          data={data.daily}
          units={units}
          icon={icon}
          // customIcon={customIcon}
        />
      ),
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
            className='time'
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
          <div className='horizontal-details'>
            <div className='deg-img'>
              <img
                inherit={{ y: '-100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 0, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
                src={customIcon}
                alt='icon'
                className='weather-img'
              />
              <motion.h1
                initial={{ y: '-100%' }}
                animate={{ y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut', delay: 0 }}
                className='temp'
              >
                {`${temp.toFixed()}° ${units === 'metric' ? 'C' : 'F'}`}
              </motion.h1>
              <motion.p
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
                className='weather-desc'
              >
                {description}
              </motion.p>
            </div>
            <motion.p
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              className='high-low'
            >
              <p>
                <ArrowUpward />
                <span>{`${temp_max.toFixed()}° ${
                  units === 'metric' ? 'C' : 'F'
                }`}</span>
              </p>
              <p>
                <ArrowDownward />
                <span>{`${temp_min.toFixed()}° ${
                  units === 'metric' ? 'C' : 'F'
                }`}</span>
              </p>
            </motion.p>
          </div>
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
          {/* Map Component */}
          <div className='weather-map'>
            <MapComponent
              lat={latLon.lat}
              lon={latLon.lon}
              setLatLon={setLatLon}
              fetchWeatherData={(lat, lon) =>
                fetchWeatherByLatLon(lat, lon, setQuery)
              } // pass setQuery
            />
          </div>
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
