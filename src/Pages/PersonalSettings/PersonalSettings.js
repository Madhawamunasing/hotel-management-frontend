import React from 'react'

import PersonalSettings from '../../Layouts/PersonalSettings/PersonalSettings'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Layouts/Footer/Footer'

import '../../Assets/styles/css/Pages/personalSettings.css'

function Personalsettings() {
  return (
    <div>
      <Navbar />
      <div className='per-container'>
        <PersonalSettings />
      </div>
      <Footer />
    </div>
  )
}
export default Personalsettings
