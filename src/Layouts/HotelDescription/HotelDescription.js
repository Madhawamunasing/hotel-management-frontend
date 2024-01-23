import React, { Component, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getHotelById } from '../../Services/Api/Utilities/Index'
import DarkOverlaybackGround from '../../Components/DarkOverlaybackGround/DarkOverlaybackGround'
import '../../Assets/styles/css/Components/hotelPageTabs.css'

const HotelDescription = () => {
  const [loading, setLoading] = useState(true)
  const [searchedParams, setSearchedparams] = useSearchParams()
  const [hotelDetails, setHotelDetails] = useState(null)
  useEffect(() => {
    window.scrollTo(0, 0)
    getHotelDetails()
  }, [])
  const getHotelDetails = async () => {
    const dataModal = {
      id: searchedParams.get('hotel') || '',
    }
    await getHotelById(dataModal)
      .then((res) => {
        if (res.status === 200) {
          setHotelDetails(res.data[0])
          setLoading(false)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className='hotelDescription-container' id='hotel-description'>
      {hotelDetails != null ? (
        <>
          <div className='mt-4 p-2 '>
            <h2>Stay in the {hotelDetails.name}</h2>
            <div>
              <p>{hotelDetails.description}</p>
              <br />
              <br />
              <p className='booknow-description'>
                {hotelDetails.name} has been welcoming BookNow.LK guests since
                {' ' + hotelDetails.createdAt.split('-')[0]}
              </p>
              <br />
              <br />
              <h3>Most popular facilities </h3>
              <div className='facilities-container text-center mt-4  '>
                <i class='fa-solid fa-person-swimming'>
                  <div>Swimming Pool</div>
                </i>
                <i class='fa-solid fa-spa'>
                  <div>Spa</div>
                </i>
                <i class='fa-solid fa-square-parking'>
                  <div>Free parking</div>
                </i>
                <i class='fa-solid fa-champagne-glasses'>
                  <div>Bar</div>
                </i>
                <i class='fa-solid fa-handshake-angle'>
                  <div>Room service</div>
                </i>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <DarkOverlaybackGround loading={loading} content={''} />
    </div>
  )
}

export default HotelDescription
