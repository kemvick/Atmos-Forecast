import React from 'react'
import './forecast.css'
import sun from '../../assets/Small Sun cloud angled rain.png'
function WeeklyForecast() {
  const weeklyData = [1, 2, 3, 4, 5, 6, 7]
  return (
    <div className='hourly-forecast-container'>
      {weeklyData.map((weekylyData, index) => (
        <div key={index} className='per-hour'>
          <p>Wed</p>
          <img src={sun} alt='' />
          <p>30°</p>
        </div>
      ))}
    </div>
  )
}

export default WeeklyForecast
