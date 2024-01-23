import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getBookingCountByHotelAdminUserId } from '../../Services/Api/Utilities/Index.js'

const CardExtra = () => {
  const [hotels, setHotels] = useState(null)

  let navigate = useNavigate()
  useEffect(() => {
    getHotels()
  }, [])
  const getHotels = async (page = 0) => {
    const dataModal = {
      id: localStorage.getItem('user'), //user id
    }
    await getBookingCountByHotelAdminUserId(dataModal)
      .then((res) => {
        if (res.status == 200) {
          setHotels(res.data.slice(0, 10))
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const bookingPercentage = (count) => {
    let tot = 0
    for (let index = 0; index < hotels.length; index++) {
      tot += hotels[index].count
    }
    let result = Math.round((count / tot) * 100)
    return result
  }
  return (
    <div>
      <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded'>
        <div className='rounded-t mb-0 px-4 py-3 border-0'>
          <div className='flex flex-wrap items-center'>
            <div className='relative w-full px-4 max-w-full flex-grow flex-1'>
              <h3 className='font-semibold text-base text-blueGray-700'>
                Listed Hotels
              </h3>
            </div>
            {/* <div className='relative w-full px-4 max-w-full flex-grow flex-1 text-right'>
              <button
                className='bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                type='button'
              >
                See all
              </button>
            </div> */}
          </div>
        </div>
        <div className='block w-full overflow-x-auto'>
          {/* Projects table */}
          <table className='items-center w-full bg-transparent border-collapse'>
            <thead className='thead-light'>
              <tr>
                <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                  Hotel
                </th>
                <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                  Visitors
                </th>
                <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px'></th>
              </tr>
            </thead>
            <tbody>
              {hotels != null ? (
                hotels.map((hotel, index) => {
                  return (
                    <tr>
                      <th className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left'>
                        {hotel.hotel.hotelName}
                      </th>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        {hotel.count}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        <div className='flex items-center'>
                          <span className='mr-2'>
                            {bookingPercentage(hotel.count)}%
                          </span>
                          <div className='relative w-full'>
                            <div className='overflow-hidden h-2 text-xs flex rounded bg-red-200'>
                              <div
                                style={{
                                  width: `${bookingPercentage(hotel.count)}%`,
                                }}
                                className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500'
                              ></div>
                            </div>
                          </div>
                        </div>
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

export default CardExtra
