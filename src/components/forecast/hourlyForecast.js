import React from 'react'
import './forecast.css'
import moon from '../../assets/Small Moon cloud mid rain.png'
const HourlyForecast = ({ data }) => {
  // const { hourly } = data
  return (
    <div className='hourly-forecast-container'>
      {data.map((d, index) => (
        <div key={index} className='per-hour'>
          <p>{d.title}</p>
          <img src={moon} alt='' className='daily-weekly-img' />
          <p>{`${d.temp.toFixed()}°`}</p>
        </div>
      ))}
    </div>
  )
}

export default HourlyForecast
