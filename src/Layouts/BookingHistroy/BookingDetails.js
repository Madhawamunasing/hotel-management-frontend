import React, { Component, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  getBookingDetailsById,
  getHotelById,
  getRoomById,
  getTotalAmountByBookingId,
  getCustomerDiscount,
  getVASByBookingId,
} from '../../Services/Api/Utilities/Index.js'
import Navbars from '../../Components/Navbar/Navbar'
import Footer from '../Footer/Footer.js'
import DarkOverlaybackGround from '../../Components/DarkOverlaybackGround/DarkOverlaybackGround.js'
import '../../Assets/styles/css/Layouts/reservedRoomStyle.css'

const BookingDetails = () => {
  const [booking, setBoooking] = useState(null)
  const [hotel, setHotel] = useState(null)
  const [room, setRoom] = useState(null)
  const [payment, setPayment] = useState(null)
  const [savings, setSavings] = useState(null)
  const [nights, setNights] = useState(null)
  const [vas, setVas] = useState(null)
  const [searchedParams, setSearchedparams] = useSearchParams()
  useEffect(() => {
    getBooking()
  }, [])

  const getBooking = async () => {
    const dataModel = {
      id: searchedParams.get('booking') || '',
    }
    await getBookingDetailsById(dataModel)
      .then(async (res) => {
        setBoooking(res.data)
        const checkOutDate = new Date(res.data.checkOutDate)
        const checkInDate = new Date(res.data.checkInDate)
        setNights((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))

        const hotelId = {
          id: res.data.hotelHotelId,
        }
        await getHotelById(hotelId).then((hotels) => {
          setHotel(hotels.data[0])
        })
        const roomId = {
          id: res.data.roomRoomId,
        }

        await getRoomById(roomId).then((data) => {
          setRoom(data.data)
          console.log(data)
        })

        const bookingId = {
          id: searchedParams.get('booking') || '',
        }
        await getTotalAmountByBookingId(bookingId).then((data) => {
          setPayment(data.data)
        })
        const idAndAmount = {
          userId: localStorage.getItem('user'),
          amount: payment,
        }

        await getCustomerDiscount(idAndAmount).then((data) => {
          setSavings(data.data)
        })

        await getVASByBookingId(bookingId).then((data) => {
          setVas(data.data)
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <Navbars />
      <div className='container booking-history-container booking-details-container'>
        {hotel != null &&
        room != null &&
        payment != null &&
        savings != null &&
        nights != null &&
        vas != null ? (
          <>
            <div className='container-header1'>
              <h1>
                {hotel.name} - All Inclusive, {hotel.district}
              </h1>
              <div className='row'>
                <div className='col-sm-4'>
                  <h4></h4>
                </div>
                <div className='col-sm-4'>
                  <h5>Itinerary # {booking.bookingId}</h5>
                </div>
                <div className='col-sm-4'></div>
              </div>
            </div>
            <div className='container-header1'>
              <h4> {hotel.name} - All Inclusive</h4>
              <div className='row'>
                <div className='col-sm-4'>
                  <h6>
                    {booking.checkInDate.split('T')[0]}-{' '}
                    {booking.checkOutDate.split('T')[0]}{' '}
                  </h6>
                </div>
                <div className='col-sm-4'>{/* <h6>1 room 2 nights</h6> */}</div>
                <div className='col-sm-4'></div>
              </div>
            </div>

            <div className='row'>
              <div className='col-sm-8 col-md-6'>
                <div className='card border-dark mb-3'>
                  <div className='card-header'>
                    Your reservation is booked. No need to call us to reconfirm
                    this reservation.
                  </div>
                  <div class='card-body text-dark'>
                    <p class='card-text '>
                      <p className='t-dark'>Check-in</p>
                      <ul>
                        <li>
                          Check-in time starts at <b>3 PM</b>
                        </li>
                        <li>
                          If a late chek-in is planned contact this hotel
                          direvctly for their late check-in policy.
                        </li>
                      </ul>
                      <b>Important Hotel Information</b>
                      <br />
                      Although Travelocity does not charge a fee to charge or
                      cansel your boking.
                      <b> {hotel.name} - All Inclusive</b> may still charge a
                      fee in accordance with its own rules & regulations.
                      <ul>
                        <li>
                          Cancellations or changes made after 11.59 PM (Romance
                          Daylight Time) on Mar 16, 2016 or no-shows are subject
                          to a hotel fee equal to the first night's rate plus
                          taxes and fees.
                        </li>
                        <li>
                          View your online itinerary for additional rules and
                          restrictions.
                        </li>
                      </ul>
                      <table>
                        <tr>
                          <th>Room</th>
                          <th>{room.roomtype.type}</th>
                        </tr>

                        <tr>
                          <td>Requests </td>
                          <td>
                            {room.persons} Persons x {booking.noRooms + ' '}{' '}
                            Rooms.
                          </td>
                        </tr>
                      </table>
                    </p>
                  </div>
                </div>
              </div>
              <div className='col-sm-4 col-md-6'>
                <div className='card border-dark'>
                  <div className='card-header'>
                    <h5>Price Summary</h5>
                  </div>
                  <div class='card-body text-dark'>
                    <h5 class='card-title'>
                      Total<div className='c'>Rs. {payment}.00</div>
                    </h5>
                    <p class='card-text'>
                      <hr />
                      {savings != 0 ? (
                        <>
                          <div className='row'>
                            <div className='col-6'> Member's price : </div>
                            <div className='col-6'>
                              {' '}
                              <b>{((savings / payment) * 100).toFixed(2)} %</b>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-6'> Prices shown after :</div>
                            <div className='col-6'>
                              {' '}
                              <b>Rs. {payment - savings.toFixed(2)}.00 </b>{' '}
                              savings
                            </div>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      <br />
                      <table>
                        <tr>
                          <td>
                            <b>{nights}</b> nights
                          </td>
                          <td>
                            Rs. <b>{room.rate}.00</b> /night
                          </td>
                        </tr>
                        <tr>
                          <td>Taxes</td>
                          <td>included</td>
                        </tr>
                      </table>
                      Rate quotes in USD are based on current exchange rates,
                      which may vary at a time of travel. Final payment will be
                      settled in local currency directly with the hotel.
                    </p>
                  </div>
                </div>
                <br />
                <div className='card border-dark mb-3'>
                  <div className='card-header'>
                    <h5>Additional Hotel Services</h5>
                  </div>
                  <div class='card-body text-dark'>
                    <p class='card-text'>
                      The below fees and deposits only apply if they are not
                      included in your selected room rate.
                      <br />
                      The following fees and deposits are charged by the
                      property at time of service, check-in, or check-out.
                      <ul>
                        {vas.map((item) => {
                          return (
                            <div className='row'>
                              <div className='col-6'>
                                <li>
                                  <b>{item.name}</b>
                                </li>
                              </div>
                              <div className='col-6'>
                                <b>Rs.{item.rate}.00</b>
                              </div>
                            </div>
                          )
                        })}
                      </ul>
                      The above list may not be comprehensive. Fees and deposits
                      may not include tax and are subject to change.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <DarkOverlaybackGround
            loading={true}
            content={'Looking your booking information'}
          />
        )}
      </div>
      <div className='footer-div'>
        <Footer />
      </div>
    </>
  )
}
export default BookingDetails
