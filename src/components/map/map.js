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

// Create a map component that will take the user's location (city or geolocation)
const MapComponent = ({ lat, lon, setLatLon, fetchWeatherData }) => {
  const [position, setPosition] = useState([lat, lon])

  // Handle map click to update position
  const MapEvents = () => {
    useMapEvents({
      click(e) {
        const newPos = [e.latlng.lat, e.latlng.lng]
        setPosition(newPos)
        setLatLon(newPos)
        fetchWeatherData(newPos[0], newPos[1])
      },
    })
    return null
  }

  useEffect(() => {
    setPosition([lat, lon])
  }, [lat, lon])

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: '600px', width: '100%' }}
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
            const newPos = [e.target.getLatLng().lat, e.target.getLatLng().lng]
            setPosition(newPos)
            setLatLon(newPos)
            fetchWeatherData(newPos[0], newPos[1])
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
