import React from 'react'
import '../../index.css'
import './forecast.css'
import weathercond1 from '../../assets/Small Moon cloud mid rain.png'
import weathercond2 from '../../assets/Moon cloud mid rain.png'
import weathercond3 from '../../assets/Sun cloud mid rain.png'
const Forecast = () => {
  const weatherConditions = [
    {
      condition1: weathercond1,
    },
    {
      condition2: weathercond2,
    },
    {
      condition3: weathercond3,
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
          <img src={weatherConditions.condition1} alt='rainy' />
          <h1 className='temp'>19°</h1>
          <p className='weather-desc'>mostly clear</p>
          <p className='high-low'>
            <p>H-24°</p> L-18°
          </p>
        </div>
      </section>
    </>
  )
}

export default Forecast
