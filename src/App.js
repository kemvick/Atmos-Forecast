import React from 'react'
import { StrictMode } from 'react'
// import Welcomepage from './components/welcome-page/welcome-page'
// import Home from './components/home/home'
import Searchbar from './components/weather-search/search'
import Forecast from './components/forecast/forecast'
const App = () => {
  return (
    <div className='container'>
      <StrictMode>
        {/* <Welcomepage></Welcomepage> */}
        {/* <Home></Home> */}
        {/* <Searchbar></Searchbar> */}
        <Forecast></Forecast>
      </StrictMode>
    </div>
  )
}

export default App
