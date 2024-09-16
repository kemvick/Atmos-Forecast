import React from 'react'
import './forecast.css'
import iconMapping from '../../functions/functions'
function WeeklyForecast({ data, units, icon }) {
  const customIcon = iconMapping[icon] || icon
  return (
    <div className='hourly-forecast-container'>
      {data.map((d, index) => (
        <div key={index} className='per-hour t-scrp'>
          <p>{d.title}</p>
          <img src={customIcon} alt='' className='daily-weekly-img t-scri' />
          <p className='p-te'>{`${d.temp.toFixed()}° ${
            units === 'metric' ? 'C' : 'F'
          }`}</p>
        </div>
      ))}
    </div>
  )
}

export default WeeklyForecast
