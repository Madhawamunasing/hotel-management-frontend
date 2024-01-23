import React, { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import RoomImages from '../../Components/RoomTypeSelector/RoomImages'
import HorizontalLine from '../../Components/HorizontalLine/HorizontalLine'
import NumberInputBox from '../../Components/NumberInputBox/InputBoxNumber'
import {
  getDiscountByHotelId,
  placeBooking,
  updateBookingById,
} from '../../Services/Api/Utilities/Index.js'

import NumericInput from 'react-numeric-input'

const TableBody = ({ rooms, souvenirs1 }) => {
  const [searchedParams, setSearchedparams] = useSearchParams()
  const [roomsData, setRoomsData] = useState([])
  const [params, setParams] = useState({})
  const [roomQty, setRoomQty] = useState(0)
  const [setedRoom, setRoom] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [avQty, setAvQty] = useState(null)
  const navigate = useNavigate()
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    setRoomsData(rooms)
    setRoomQty(0)
    setAvQty(searchedParams.get('rooms') || '')
  }, [rooms])
  useEffect(() => {
    const dataModel = {
      location: searchedParams.get('location') || '',
      checkInDate: searchedParams.get('checkin-date') || '',
      checkOutDate: searchedParams.get('checkout-date') || '',
      adult: searchedParams.get('adults') || '',
      children: searchedParams.get('children') || '',
      rooms: searchedParams.get('rooms') || '',
      hotelId: searchedParams.get('hotel') || '',
    }
    const bookingId = searchedParams.get('booking') || ''
    if (bookingId != '') {
      setIsUpdate(true)
    }
    setParams(dataModel)
    toast.configure()
  }, [])
  const bookRoom = async (setedRoom) => {
    const dataModal = {
      checkInDate: searchedParams.get('checkin-date') || '',
      checkOutDate: searchedParams.get('checkout-date') || '',
      specialRequest: null,
      arrivalTime: null,
      guestName: null,
      rentCar: null,
      location: searchedParams.get('location') || '',
      customerId: localStorage.getItem('user'),
      roomId: setedRoom,
      vasId: null,
      noRooms: searchedParams.get('rooms') || '',
    }

    if (isUpdate) {
      const bookingId = searchedParams.get('booking')
      await updateBookingById(bookingId, {
        roomRoomId: setedRoom,
      })
        .then((res) => {
          notifySuccess('Booking is updated')
        })
        .catch(() => {
          notifyError('Some thing went wrong.')
        })
      let URL = `/booking/vas?location=${params.location}&checkin-date=${
        params.checkInDate
      }&checkout-date=${params.checkOutDate}&adults=${params.adult}&children=${
        params.children
      }&hotel=${
        params.hotelId
      }&rooms=${roomQty}&roomno=${setedRoom}&booking=${searchedParams.get(
        'booking'
      )}`
      navigate(URL)
    } else {
      await placeBooking(dataModal)
        .then((res) => {
          try {
            const bookingId = res.data.bookingId
            const userId = localStorage.getItem('user')
            if (
              localStorage.getItem('session') == 'false' ||
              localStorage.getItem('session') == null
            ) {
              notifyError('Please login your account before book your place!')
            } else {
              if (Number.isInteger(bookingId)) {
                let URL = `/booking/vas?location=${params.location}&checkin-date=${params.checkInDate}&checkout-date=${params.checkOutDate}&adults=${params.adult}&children=${params.children}&hotel=${params.hotelId}&rooms=${roomQty}&roomno=${setedRoom}&booking=${bookingId}`
                navigate(URL)
              } else {
                navigate('/')
                notifyError('Some thing went wrong.')
              }
            }
          } catch (error) {
            console.log(error)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  const getRoomDiscount = async (hotelId, roomId) => {
    const dataModel = {
      id: 1,
    }
    await getDiscountByHotelId(dataModel)
      .then((res) => {
        setDiscount(res.data.discount)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const notifyError = (message) => {
    toast.error(message)
  }
  const notifySuccess = (message) => {
    toast.success(message)
  }
  return (
    <>
      {roomsData.map((room) => {
        let hotelId = searchedParams.get('hotel') || ''
        getRoomDiscount(hotelId, room.roomId)

        return (
          <li class='table-row border border-dark'>
            <div class='col-sm-12 col-md-4  mb-3 '>
              <img src={souvenirs1[0].path} alt='' />
              <RoomImages roomId={room.roomId} />
            </div>
            <div class='col-sm-12 col-1  mb-3 bed-icon'>
              <div className='verticle-center'>
                {[...Array(room.persons)].map((elementInArray, index) => (
                  <i key={index} class='fas fa-bed m-1'></i>
                ))}
              </div>
            </div>

            <div class='col-sm-12 col-md-2 mb-3'>
              <div className='prices-container'>
                {discount != null ? (
                  <div className='save-today'>Save {discount} % Today</div>
                ) : (
                  ''
                )}
                {discount != null ? (
                  <del>
                    <div class='or-amount'>Rs.{room.rate}</div>
                  </del>
                ) : (
                  ''
                )}

                {discount != null ? (
                  <div className='room-price'>
                    Rs.{room.rate * (1 - discount / 100)}
                  </div>
                ) : (
                  <div className='room-price b-light'>Rs.{room.rate}</div>
                )}
              </div>
            </div>
            <div class='col-sm-12 col-md-1  mb-3'>
              <div>
                {roomQty == 0 ? (
                  <NumericInput
                    min={0}
                    max={avQty}
                    value={0}
                    onChange={(value) => {
                      setRoomQty(value)
                      setRoom(room.roomId)
                    }}
                  />
                ) : setedRoom == room.roomId ? (
                  <NumericInput
                    min={0}
                    max={avQty}
                    onChange={(value) => {
                      setRoomQty(value)
                      setRoom(room.roomId)
                    }}
                  />
                ) : (
                  <NumericInput min={0} max={0} value={0} disabled />
                )}
              </div>
            </div>
            <div class='col-sm-12 col-md-4  mb-3' data-label='Payment Status'>
              Your price includes:
              <div className='services'>
                {/* {room.attributes.map((service, index) => {
                  return (
                    <div className='sleep-container'>
                      <i class='fa-solid fa-check mr-3'>
                        <div className='service-name'>{service}</div>
                      </i>
                    </div>
                  )
                })} */}
                <HorizontalLine />
              </div>
              {roomQty != 0 && setedRoom == room.roomId ? (
                <div>
                  <div className='tot-price'>
                    You can reserve this property today Rs.
                    {discount != null
                      ? room.rate * (1 - discount / 100) * roomQty
                      : room.rate}
                  </div>
                  <HorizontalLine />
                  <br />
                </div>
              ) : (
                ''
              )}
              <div>
                {roomQty != 0 && setedRoom == room.roomId ? (
                  <button
                    className='reserve-button'
                    onClick={() => {
                      bookRoom(setedRoom)
                    }}
                  >
                    Reserve
                  </button>
                ) : (
                  <button className='reserve-button' disabled>
                    Reserve
                  </button>
                )}
              </div>
            </div>
          </li>
        )
      })}
    </>
  )
}

export default TableBody
