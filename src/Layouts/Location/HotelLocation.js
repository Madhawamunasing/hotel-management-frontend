import React, { Component } from 'react'

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import '../../Assets/styles/css/Layouts/googleMap.css'

//hotel locations
const center = {
  lat: 6.0329,
  lng: 80.2158,
}

function HotelLocation() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyD-RDqFvg7zwemTVQQujx1VOS-AD7HYWOI',
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds()
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <div id='hotel-location'>
      <h3>Hotel Location</h3>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={center}
        zoom={13}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  ) : (
    <></>
  )
}

export default HotelLocation
