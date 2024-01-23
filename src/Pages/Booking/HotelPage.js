import React, { Component } from 'react'
import HotelHeader from '../../Layouts/HotelHeader/HotelHeader.js'
import HotelDescription from '../../Layouts/HotelDescription/HotelDescription.js'
import Souvenir from '../../Components/Carousel/Souvenir'
import HotelPageTabs from '../../Components/HotelPageTabs/HotelPageTabs.js'
import RoomTypeSelector from '../../Components/RoomTypeSelector/RoomTypeSelector.js'
import Facilities from '../../Layouts/Facilities/Facilities.js'
import Review from '../../Layouts/Reviews/Review.js'
import HotelLocation from '../../Layouts/Location/HotelLocation.js'
import Footer from '../../Layouts/Footer/Footer.js'

import '../../Assets/styles/css/Pages/hotelPage.css'

const hotelPage = () => {
  return (
    <div>
      <HotelHeader />
      <div className='container hotel-room-seletor-container'>
        <Souvenir />
        <HotelPageTabs />
        <HotelDescription />
        <RoomTypeSelector />
        <Facilities />
        <Review />
        <HotelLocation />
      </div>
      <Footer />
    </div>
  )
}

export default hotelPage
