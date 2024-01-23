import React from 'react'

import Navbars from '../../Components/Navbar/Navbar.js'
import SecuritySettings from '../../Layouts/SecuritySettings/SecuritySettings'
import Footer from '../../Layouts/Footer/Footer.js'

import '../../Assets/styles/css/Pages/securitySettings.css'

function Securitysettings() {
  return (
    <div>
      <Navbars />
      <div className='sec-container'>
        <SecuritySettings />
      </div>
      <Footer />
    </div>
  )
}
export default Securitysettings
