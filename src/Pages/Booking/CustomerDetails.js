import React from 'react'
import '../../Assets/styles/css/Layouts/CustomerDetails.css'
import Footer from '../../Layouts/Footer/Footer.js'
import HotelHeader from '../../Layouts/HotelHeader/HotelHeader.js'
import BookingCusDetails from '../../Layouts/PersonalDetails/BookingCusDetails.js'

const CustomerDetails = () => {
  return (
    <div>
      <HotelHeader />
      <div class='container-fluid step-indicator'>
        <br />
        <br />
        <ul class='list-unstyled multi-steps'>
          <li>Select your room</li>
          <li>Add services</li>
          <li class='is-active'>Enter your details</li>
          <li>Finalize your pay ?</li>
        </ul>
      </div>
      <div className='person-details-container'>
        <BookingCusDetails />
      </div>
      <Footer />
    </div>
  )
}

export default CustomerDetails
