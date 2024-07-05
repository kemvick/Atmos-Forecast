import React, { useState } from 'react'
import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import { FaSearchLocation } from 'react-icons/fa'
import { FiHome, FiSearch } from 'react-icons/fi'
import { TbCurrentLocation } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

const BottomNav = () => {
  const [value, setValue] = useState(0)
  const navigate = useNavigate()
  // handlechange function
  const handleChange = (event, newValue) => {
    setValue(newValue)
    switch (newValue) {
      case 0:
        navigate('/home')
        break
      case 1:
        navigate('/search')
        break
      case 2:
        navigate('/forecast')
        break
      default:
        navigate('/home')
    }
  }

  return (
    <BottomNavigation value={value} onChange={handleChange} showLabels>
      <BottomNavigationAction icon={FiHome} />
      <BottomNavigationAction icon={FaSearchLocation} />
      <BottomNavigationAction icon={TbCurrentLocation} />
    </BottomNavigation>
  )
}

export default BottomNav
