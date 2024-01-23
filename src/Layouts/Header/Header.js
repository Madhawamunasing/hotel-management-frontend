import React from 'react'
import Searchbox from '../../Components/Searchbar'
import Navbar from '../../Components/Navbar/Navbar'

import '../../Assets/styles/css/Layouts/header.css'

const Header = () => {
  return (
    <div className='header'>
      <Navbar />
      <Searchbox />
      <div className='container description '>
        {/* <div className='header-title text-left'>
          <h1>Hello Sri Lanka</h1>
        </div> */}
        {/* <div className='header-description text-center'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi quae
          at quod eos error vel necessitatibus porro officiis molestiae dolores
          temporibus nulla earum qui veritatis, aspernatur quasi. Sit, repellat
          quos.
        </div> */}
      </div>
    </div>
  )
}

export default Header
