import React from 'react'
import './forecast.css'
import iconMapping from '../../functions/functions'
// import moon from '../../assets/Small Sun cloud mid rain.png'
const HourlyForecast = ({ data, units, icon }) => {
  // const { hour } = data
  const customIcon = iconMapping[icon] || icon
  return (
    <>
      <div className='hourly-forecast-container'>
        {data.map((d, index) => (
          <div key={index} className='per-hour'>
            <p>{d.title}</p>
            <img src={customIcon} alt='' className='daily-weekly-img' />
            <p>{`${d.temp.toFixed()}°${units === 'metric' ? 'C' : 'F'}`}</p>
          </div>
        ))}
      </div>
      {/* <p className='hourly-note'>This is 3hours step forecast!</p> */}
    </>
  )
}

export default HourlyForecast
