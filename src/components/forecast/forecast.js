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

const Forecast = () => {
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
            <FaAngleLeft />
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
          <p>Sunday 23rd, 2024 | Local Time: 6:30 PM</p>
        </div>
        <div className='temp-and-details'>
          <p className='city-name'>London, GB</p>
          <img src={weathercond2} alt='rainy' className='weather-img' />
          <h1 className='temp'>19°</h1>
          <p className='weather-desc'>mostly clear</p>
          <p className='high-low'>
            <p>
              H-<span>24°</span>
            </p>
            L-<span>18°</span>
          </p>
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
