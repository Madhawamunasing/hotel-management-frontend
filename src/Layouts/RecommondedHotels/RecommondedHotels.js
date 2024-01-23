import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import HotelCard from '../../Components/HotelCard/HotelCard'

const Recommendeds = (hotels) => {
  return (
    <div className='container'>
      <div className='mb-5 mt-5'>
        <h2>Recommonded from us</h2>
      </div>
      <div className='row '>
        {hotels.length != 0 ? (
          hotels.hotels.map((item, index) => {
            return (
              <div class='col-6 col-lg-3 '>
                <HotelCard hotel={item.hotel} />
              </div>
            )
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
export default Recommendeds
