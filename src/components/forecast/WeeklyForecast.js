import React from 'react'
import './forecast.css'
import sun from '../../assets/Small Sun cloud angled rain.png'
function WeeklyForecast({ data }) {
  // const { daily } = data
  return (
    <div className='hourly-forecast-container'>
      {data.map((d, index) => (
        <div key={index} className='per-hour'>
          <p>{d.title}</p>
          <img src={sun} alt='' />
          <p>{`${d.temp.toFixed()}°`}</p>
        </div>
      ))}
    </div>
  )
}

export default WeeklyForecast
