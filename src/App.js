// import React, { useEffect } from 'react'
// import { StrictMode } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
// import BottomNav from './BottomNav'
import AnimatedRoutes from './AnimatedRoute'
const App = () => {
  return (
    <div className='container'>
      <Router>
        <AnimatedRoutes />
      </Router>
    </div>
  )
}

export default App
