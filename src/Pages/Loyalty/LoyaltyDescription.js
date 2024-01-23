import React, { Component } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import LoyaltyGrades from '../../Layouts/LoyaltyGrades/LoyaltyGrades'
import Footer from '../../Layouts/Footer/Footer.js'
import RedeemLoyalty from '../../Layouts/LoyaltyGrades/RedeemLoyalty'
import '../../Assets/styles/css/Pages/loyaltyDescription.css'

class LoyaltyDescription extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className='container loyalty-description'>
          <LoyaltyGrades />
          {/* <RedeemLoyalty /> */}
        </div>
        <Footer />
      </div>
    )
  }
}

export default LoyaltyDescription
