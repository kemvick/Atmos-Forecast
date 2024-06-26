import React from 'react'
import '../../index.css'
import './forecast.css'
import weathercond1 from '../../assets/Small Moon cloud mid rain.png'
import weathercond2 from '../../assets/Moon cloud mid rain.png'
import { FaThermometerEmpty } from 'react-icons/fa'
import { FiWind } from 'react-icons/fi'
import { BiSolidDropletHalf } from 'react-icons/bi'
import { GiSun, GiSunrise } from 'react-icons/gi'

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
  return (
    <>
      <section className='weather-details'>
        <div className='time-location'>
          <p>Sunday 23rd, 2024 | Local Time: 6:30 PM</p>
        </div>
        <div className='temp-and-details'>
          <p className='city-name'>London, GB</p>
          <img src={weathercond1} alt='rainy' className='weather-img' />
          <h1 className='temp'>19°</h1>
          <p className='weather-desc'>mostly clear</p>
          <p className='high-low'>
            <p>H-24°</p> L-18°
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
            <div className='map'>hbjbjbejb</div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Forecast
