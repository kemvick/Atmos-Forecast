import React from 'react'
import './forecast.css'
import moon from '../../assets/Small Moon cloud mid rain.png'
function HourlyForecast() {
  const hourlyData = [1, 2, 3, 4, 5, 6, 7]
  return (
    <div className='hourly-forecast-container'>
      {hourlyData.map((hourlyData, index) => (
        <div key={index} className='per-hour'>
          <p>12am</p>
          <img src={moon} alt='' className='daily-weekly-img' />
          <p>30°</p>
        </div>
      ))}
    </div>
  )
}

export default HourlyForecast
