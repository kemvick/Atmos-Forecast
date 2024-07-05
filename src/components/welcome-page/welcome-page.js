import React from 'react'
import './welcome-page.css'
import '../../index.css'
import { useNavigate } from 'react-router-dom'
const Welcomepage = () => {
  const navigate = useNavigate()

  const goToHome = () => {
    navigate('/home')
  }
  return (
    <>
      <div className='hero'>
        <div className='hero-container'>
          <div className='hero-text'>
            <h3>Welcome to</h3>
            <div>
              <h1 className='name'>Atmos</h1>
              <h1 className='name'>Forecast</h1>
              <p className='herotext-p'>
                Convinent and easy access to accurate weather informations
              </p>
            </div>
            <button onClick={goToHome} className='getstarted-btn'>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Welcomepage
