import React from 'react'
import './forecast.css'
import iconMapping from '../../functions/functions'

// import sun from '../../assets/Small Sun cloud angled rain.png'
function WeeklyForecast({ data, units, icon }) {
  // const { week } = data
  const customIcon = iconMapping[icon] || icon

  return (
    <div className='hourly-forecast-container'>
      {data.map((d, index) => (
        <div key={index} className='per-hour'>
          <p>{d.title}</p>
          <img src={customIcon} alt='' className='daily-weekly-img' />
          <p>{`${d.temp.toFixed()}° ${units === 'metric' ? 'C' : 'F'}`}</p>
        </div>
      ))}
    </div>
  )
}

export default WeeklyForecast
