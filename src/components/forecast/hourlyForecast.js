import React from 'react'
import './forecast.css'
import iconMapping from '../../functions/functions'
const HourlyForecast = ({ data, units, icon }) => {
  const customIcon = iconMapping[icon] || icon
  return (
    <>
      <div className='hourly-forecast-container'>
        {data.map((d, index) => (
          <div key={index} className='per-hour'>
            <p>{d.title}</p>
            <img src={customIcon} alt='' className='daily-weekly-img' />
            <p className='p-te'>{`${d.temp.toFixed()}°${
              units === 'metric' ? 'C' : 'F'
            }`}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default HourlyForecast
