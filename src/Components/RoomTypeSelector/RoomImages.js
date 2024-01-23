import React, { Component } from 'react'
import RoomImageModal from '../Modal/RoomImages/RoomImageModal'
import '../../Assets/styles/css/Layouts/roomImages.css'
// import HotelImageScript from '../../Assets/js/roomImage.js'

var Carousel = require('react-responsive-carousel').Carousel

const RoomImages = ({ roomId }) => {
  return (
    <div>
      <RoomImageModal roomId={roomId} />
    </div>
  )
}
export default RoomImages
