import React from 'react'
import '../../Assets/styles/css/Pages/accountSettings.css'
import Navbar from '../../Components/Navbar/Navbar'
import Accountsettingsmodel from '../../Layouts/AccountSettings/AccountSettings'
import Footer from '../../Layouts/Footer/Footer'

const Accountsettings = () => {
  return (
    <div>
      <Navbar />
      <div className='acc-container'>
        <Accountsettingsmodel />
      </div>
      <div className='acc-footer'>
        <Footer />
      </div>
    </div>
  )
}
export default Accountsettings
