import React, { Component } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import BookingHistroyTable from '../../Layouts/BookingHistroy/BookingHistroyTable'
import Footer from '../../Layouts/Footer/Footer'
const BookingHistory = () => {
  return (
    <div>
      <Navbar />
      <div className='conatainer booking-history-container'>
        <BookingHistroyTable />
      </div>
      <Footer />
    </div>
  )
}

export default BookingHistory
