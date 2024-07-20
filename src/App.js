import React, { useEffect } from 'react'
import { StrictMode } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
// import BottomNav from './BottomNav'
import AnimatedRoutes from './AnimatedRoute'
const App = () => {
  return (
    <div className='container'>
      <StrictMode>
        <Router>
          <AnimatedRoutes />
        </Router>
      </StrictMode>
    </div>
  )
}

export default App
