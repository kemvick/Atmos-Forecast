import React, { useState, useEffect } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '../forecast/forecast.css'

// Fix for the default marker icon not showing
import markerIconPng from 'leaflet/dist/images/marker-icon.png'
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png'

// Custom marker setup
const markerIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const MapComponent = ({
  lat = 40.7128,
  lon = -74.006,
  setLatLon,
  fetchWeatherData,
}) => {
  const [position, setPosition] = useState({ lat, lng: lon })

  // Handle map click to update position and fetch weather data
  const MapEvents = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng
        const newPos = { lat, lng }

        // Update the position state
        setPosition(newPos)

        // Pass the new position back to parent (if needed)
        setLatLon(newPos)

        // Fetch weather data for the clicked location
        fetchWeatherData(lat, lng)
      },
    })
    return null
  }

  // Effect to update position when lat/lon props change
  useEffect(() => {
    if (lat && lon) {
      setPosition({ lat, lng: lon })
    }
  }, [lat, lon])

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: '600px', width: '100%' }}
      className='map-container'
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        position={position}
        icon={markerIcon}
        draggable={true}
        eventHandlers={{
          dragend(e) {
            const { lat, lng } = e.target.getLatLng()
            const newPos = { lat, lng }
            setPosition(newPos)
            setLatLon(newPos)
            fetchWeatherData(lat, lng)
          },
        }}
      >
        <Popup>You are here</Popup>
      </Marker>
      <MapEvents />
    </MapContainer>
  )
}

export default MapComponent
