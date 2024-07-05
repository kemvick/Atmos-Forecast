import React from 'react'
import './forecast.css'
const TabContent = ({ content }) => {
  return (
    <div>
      <div className='scroll-content'>{content}</div>
    </div>
  )
}

export default TabContent
