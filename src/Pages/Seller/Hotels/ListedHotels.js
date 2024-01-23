import React, { useEffect, useState } from 'react'
import '../../../Assets/styles/css/Seller/Pages/listedHotel.css'
import CardMyHotel from '../../../Components/Cards/CardMyHotel'
import InfomationCard from '../../../Components/Cards/InfomationCard'
import Navbars from '../../../Components/Navbar/Navbar'
import Footer from '../../../Layouts/Footer/Footer'
import { getHotelByUserId } from '../../../Services/Api/Utilities/Index.js'

const ListedHotels = () => {
  const [hotels, setHotels] = useState(null)
  useEffect(() => {
    getHotels()
  }, [])
  const getHotels = async () => {
    const dataModel = {
      id: localStorage.getItem('user'), //user id
    }
    await getHotelByUserId(dataModel)
      .then((res) => {
        setHotels(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div>
      <Navbars />
      <div className='hotel-listing-container '>
        <InfomationCard />
        <div className='hotel-heading mt-3'>
          <i class='fa-solid fa-hotel'></i>
          <h3>Your hotels</h3>
        </div>
        <div className='row mt-5 mb-5 '>
          {hotels != null ? (
            hotels.map((hotel) => {
              return (
                <div class=' col-lg-3 col-sm-8 col-md-6 mt-2 '>
                  <CardMyHotel hotel={hotel} getHotels={getHotels} />
                </div>
              )
            })
          ) : (
            <>
              {' '}
              <div
                class='alert alert-primary'
                role='alert'
                style={{
                  height: '20rem',
                  textAlign: 'center',
                }}
              >
                Nothing to display.
              </div>
            </>
          )}
        </div>
      </div>
      <div className='footer-div'>
        <Footer />
      </div>
    </div>
  )
}

export default ListedHotels
