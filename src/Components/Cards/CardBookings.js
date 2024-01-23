import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAllBookigsByHotelAdminId } from '../../Services/Api/Utilities/Index.js'

const CardBookings = () => {
  const [bookings, setBookings] = useState(null)
  let navigate = useNavigate()
  useEffect(() => {
    getBookings()
  }, [])

  const getBookings = async (page = 0) => {
    const dataModal = {
      id: localStorage.getItem('user'), //user id
      page: page,
    }
    await getAllBookigsByHotelAdminId(dataModal)
      .then((res) => {
        if (res.status == 200) {
          setBookings(res.data.rows)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div>
      <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded'>
        <div className='rounded-t mb-0 px-4 py-3 border-0'>
          <div className='flex flex-wrap items-center'>
            <div className='relative w-full px-4 max-w-full flex-grow flex-1'>
              <h3 className='font-semibold text-base text-blueGray-700'>
                Recent Bookings
              </h3>
            </div>
            <div className='relative w-full px-4 max-w-full flex-grow flex-1 text-right'>
              <button
                className='bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                type='button'
                onClick={() => {
                  navigate('../seller/bookings')
                }}
              >
                See all
              </button>
            </div>
          </div>
        </div>
        <div className='block w-full overflow-x-auto'>
          {/* Projects table */}
          <table className='items-center w-full bg-transparent border-collapse'>
            <thead>
              <tr>
                <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                  Booking ID
                </th>
                <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                  Hotel
                </th>
                <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                  No Rooms
                </th>
                <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                  Checking
                </th>
                <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings != null ? (
                bookings.map((booking, index) => {
                  return (
                    <tr>
                      <th className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left'>
                        {booking.bookingId}
                      </th>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        {booking.hotel.name}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        {booking.noRooms}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        <i className='fas fa-arrow-up text-emerald-500 mr-4'></i>
                        {booking.checkInDate.split('T')[0]}{' '}
                        {/* {booking.arrivalTime} */}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        <Link to={`/seller/booking/`}>
                          <i
                            class='fa fa-info-circle'
                            style={{ fontSize: '1.2rem' }}
                            aria-hidden='true'
                          ></i>
                        </Link>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CardBookings
