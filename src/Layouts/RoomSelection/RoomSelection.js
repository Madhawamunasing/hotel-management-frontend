import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate'

import HashLoader from 'react-spinners/HashLoader'
import TableBody from './RoomTableBody'
import {
  getRoomTypesByHotelId,
  getAvailbleRooms,
  getRoomByHotelId,
} from '../../Services/Api/Utilities/Index.js'
import '../../Assets/styles/css/Layouts/roomSelection.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const souvenirs1 = [
  {
    path: '/images/property-types/kabana.jpg',
  },
  {
    path: '/images/property-types/villa.jpg',
  },
  {
    path: '/images/property-types/villa.jpg',
  },
  {
    path: '/images/property-types/bangalow.jpg',
  },
  {
    path: '/images/property-types/guest-houses.jpg',
  },
  {
    path: '/images/property-types/guest-houses.jpg',
  },
  {
    path: '/images/property-types/guest-houses.jpg',
  },
]
const souvenirs2 = [
  {
    path: '/images/property-types/kabana.jpg',
  },
  {
    path: '/images/property-types/kabana.jpg',
  },
  {
    path: '/images/property-types/villa.jpg',
  },
  {
    path: '/images/property-types/bangalow.jpg',
  },
  {
    path: '/images/property-types/guest-houses.jpg',
  },
  {
    path: '/images/property-types/guest-houses.jpg',
  },
  {
    path: '/images/property-types/guest-houses.jpg',
  },
]

function calculatePrice(e, price) {
  // alert(e.target.value)
  // alert(price)
}

const RoomSelection = ({ roomTypeId }) => {
  const [loading, setLoading] = useState(false)

  const [searchedParams, setSearchedparams] = useSearchParams()

  const [rooms, setRooms] = useState([])
  const [pageCount, setpageCount] = useState(0)
  const limit = 10

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchRoomData(0)
    setLoading(true)
  }, [limit])

  useEffect(() => {
    fetchRoomData(0)
  }, [roomTypeId])

  // useEffect(() => {
  //   if (loading) {
  //     document.getElementById('pagination-div').style.display = 'none'
  //   } else {
  //     document.getElementById('pagination-div').style.display = 'block'
  //   }
  // }, [loading])
  const fetchRoomData = async (page) => {
    const dataModel = {
      location: searchedParams.get('location') || '',
      checkInDate: searchedParams.get('checkin-date') || '',
      checkOutDate: searchedParams.get('checkout-date') || '',
      adult: searchedParams.get('adults') || '',
      children: searchedParams.get('children') || '',
      rooms: searchedParams.get('rooms') || '',
      hotelId: searchedParams.get('hotel') || '',
      roomTypeId: roomTypeId,
      page: page,
    }
    await getAvailbleRooms(dataModel)
      .then((res) => {
        let totalRows = res.data.count
        if (res.status == 200) {
          setRooms(res.data.rows)
          setLoading(false)
        }
        setpageCount(Math.ceil(totalRows / limit))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handlePageClick = async (data) => {
    let currentPage = data.selected
    fetchRoomData(currentPage)
    window.scrollTo(0, 1100)
  }

  return (
    <div className='room-selection'>
      <div class='room-selection-container'>
        <ul class='responsive-table'>
          <li
            class='table-header b-primary text-white'
            style={{ background: '#5553B7' }}
          >
            <div class='col-sm-12 col-md-4'>Room</div>
            <div class='col-sm-12 col-md-1'>Sleeps</div>
            <div class='col-sm-12 col-md-2'>Price per night</div>
            <div class='col-sm-12 col-md-1'>Rooms</div>
            <div class='col-sm-12 col-md-4'>Benefits</div>
          </li>
          {loading ? (
            <div className='hotel-loader'>
              <HashLoader
                loading={loading}
                size={25}
                margin={2}
                color='#00AD5F'
              />
            </div>
          ) : (
            <>
              {' '}
              <TableBody rooms={rooms} souvenirs1={souvenirs1} />{' '}
            </>
          )}
          {rooms.length != 0 ? (
            <div className='mt-3 pagination-container' id='pagination-div'>
              <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={'pagination justify-content-center'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
              />
            </div>
          ) : (
            <>
              <div class='alert alert-primary' role='alert'>
                Nothing to display.
              </div>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

export default RoomSelection
