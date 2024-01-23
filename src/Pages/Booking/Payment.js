import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import HashLoader from 'react-spinners/HashLoader'
import { toast } from 'react-toastify'
import '../../Assets/styles/css/Pages/payment.css'
import Footer from '../../Layouts/Footer/Footer.js'
import HotelHeader from '../../Layouts/HotelHeader/HotelHeader.js'
import SelectPayment from '../../Layouts/Payment/SelectPayment.js'
import {
  getBookingDetailsById,
  getCustomerDiscount,
  getRoomDetailsById,
  getTotalAmountByBookingId,
  getVASByBookingId,
  validateCoupon,
} from '../../Services/Api/Utilities/Index.js'

const Payament = () => {
  const [loading, setLoading] = useState(true)
  const [searchedParams, setSearchedparams] = useSearchParams()
  const [BookingDetails, setBookkingDetails] = useState(null)
  const [roomDetails, setRoomDetails] = useState(null)
  const [subscribedVAS, setSubscribedVAS] = useState(null)
  const [subPayment, setsubPayment] = useState(null)
  const [discount, setDiscount] = useState(null)
  const [loyalty, setLoyalty] = useState(null)
  const [totalPayment, setTotalPayment] = useState(null)

  useEffect(() => {
    getBookingDetails()
    window.scrollTo(0, 0)
    toast.configure()
  }, [])

  const notify = (message) => {
    toast.success(message)
  }

  const getBookingDetails = async () => {
    const dataModel = {
      id: searchedParams.get('booking') || '',
    }
    await getBookingDetailsById(dataModel)
      .then((res) => {
        setBookkingDetails(res.data)
        console.log(res.data.roomRoomId)

        getRoomDetails(res.data.roomRoomId)
      })
      .catch((err) => {
        //console.log(err)
      })
  }

  const getRoomDetails = async (roomId) => {
    const dataModel = {
      id: roomId,
    }
    await getRoomDetailsById(dataModel)
      .then((res) => {
        setRoomDetails(res.data)
        console.log(res.data.rate)
        getAllVAS()
      })
      .catch((err) => {
        //console.log(err)
      })
  }
  const getAllVAS = async () => {
    const dataModel = {
      id: searchedParams.get('booking') || '',
    }
    await getVASByBookingId(dataModel)
      .then((res) => {
        setSubscribedVAS(res.data)
        console.log(res)
        getTotalCost()
      })
      .catch((err) => {
        //console.log(err)
      })
  }
  const getTotalCost = async () => {
    const dataModel = {
      id: searchedParams.get('booking') || '',
    }
    await getTotalAmountByBookingId(dataModel)
      .then((res) => {
        //console.log(res)
        setsubPayment(res.data)
        setTotalPayment(res.data)
        loyaltyReward(res.data)
      })
      .catch((err) => {
        //console.log(err)
      })
  }
  const validateVoucher = async (dataModel, event) => {
    //console.log(dataModel)
    await validateCoupon(dataModel)
      .then((res) => {
        if (res.data == '') {
          setDiscount(null)
          notify(
            'Sorry, this voucher is not valid. Please check for any typing errors'
          )
          event.target.token.value = ''
        } else {
          setDiscount(res.data)
          setTotalPayment(totalPayment - res.data[0].discount * subPayment)
          notify('You have successfully redeemed!')
          document.getElementById('voucherInputBox').disabled = true
        }
      })
      .catch((err) => {
        //console.log(err)
      })
  }
  const loyaltyReward = async (totPayment) => {
    const dataModel = {
      userId: localStorage.getItem('user'), //user id
      amount: totPayment,
    }
    //console.log(dataModel)
    await getCustomerDiscount(dataModel)
      .then((res) => {
        setLoyalty(res.data)
        setTotalPayment(totPayment - res.data)
        setLoading(false)
      })
      .catch((err) => {
        //console.log(err)
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const dataModel = {
      coupon: event.target.token.value,
      amount: subPayment,
      hotelId: BookingDetails.hotelHotelId,
    }
    if (discount == null) {
      validateVoucher(dataModel, event)
    }
  }

  return (
    <div>
      <HotelHeader />
      <div class='container-fluid step-indicator'>
        <br />
        <br />
        <ul class='list-unstyled multi-steps'>
          <li>Select your room</li>
          <li>Add services</li>
          <li>Enter your details</li>
          <li class='is-active'>Finalize your payament</li>
        </ul>
      </div>
      <div className='user-details'>
        <div className='container'>
          <div className='row user-details '>
            <div className='col-md-7 col-lg-8 mt-1 '>
              <div className='container payment-summary border'>
                <table class='table table-borderless'>
                  <thead className='border-bottom border-dark'>
                    <tr>
                      <th scope='col'>Description</th>
                      <th scope='col'>Unit price</th>
                      <th scope='col'> Qty</th>
                      <th scope='col' className='text-center'>
                        Total
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading && roomDetails == null ? (
                      <tr>
                        <td colspan='4'>
                          <div className='payment-loader'>
                            <HashLoader
                              loading={loading}
                              size={25}
                              margin={2}
                              color='#00AD5F'
                            />
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <>
                        <tr>
                          <td scope='row'>Deluxe Double</td>
                          <td>Rs. {roomDetails.rate}</td>
                          <td>{BookingDetails.noRooms}</td>
                          <td className='text-right'>
                            {' '}
                            Rs.{roomDetails.rate * BookingDetails.noRooms}
                          </td>
                        </tr>
                        {(subscribedVAS != null) != 0 ? (
                          subscribedVAS.map((vas, i) => {
                            return (
                              <tr>
                                <td scope='row'>{vas.name}</td>
                                <td>Rs. {vas.rate}</td>
                                <td>{BookingDetails.noRooms}</td>
                                <td className='text-right'>
                                  {' '}
                                  Rs.
                                  {vas.rate}
                                </td>
                              </tr>
                            )
                          })
                        ) : (
                          <></>
                        )}
                        <tr>
                          <td colspan='3'>
                            <b>Subtotal</b>
                          </td>
                          <td className='text-right'> Rs.{subPayment}</td>
                        </tr>
                        {/* <tr style={{ color: 'gray' }}>
                          <td colspan='3'>Service charge</td>
                          <td className='text-right'>Rs.2,000</td>
                        </tr> */}
                        <tr>
                          <td colspan='4'>
                            <div className='voucher-input-box'>
                              <form onSubmit={handleSubmit}>
                                <div className='row'>
                                  <div className='col-lg-8 col-sm-12'>
                                    <div class='form-group mb-2'>
                                      <label
                                        for='inputPassword2'
                                        class='sr-only'
                                      >
                                        Enter voucher code
                                      </label>
                                      <input
                                        type='text'
                                        class='form-control'
                                        id='voucherInputBox'
                                        placeholder=' Enter voucher code'
                                        name='token'
                                      />
                                    </div>
                                  </div>
                                  <div className='col-lg-3 col-sm-12'>
                                    <button
                                      type='submit'
                                      class='btn btn-primary mb-2'
                                    >
                                      Reedem
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </td>
                        </tr>

                        {discount != null ? (
                          <tr>
                            <td colspan='3'>
                              <b>Voucher offer</b>
                            </td>
                            <td className='text-right'>
                              <b>
                                ({' Rs. '}
                                {discount != null ? (
                                  (Math.round(
                                    discount[0].discount * subPayment
                                  ) *
                                    100) /
                                  100
                                ) : (
                                  <></>
                                )}
                                )
                              </b>
                            </td>
                          </tr>
                        ) : (
                          <></>
                        )}
                        {loyalty != null ? (
                          <tr>
                            <td colspan='3'>
                              <b>loyaly reward</b>
                            </td>
                            <td className='text-right'>
                              <b>
                                ({' Rs. '}.{loyalty.toFixed(2)})
                              </b>
                            </td>
                          </tr>
                        ) : (
                          <></>
                        )}
                        <tr className='total-amount'>
                          <td colspan='3'>
                            <b>Total payment</b>
                          </td>
                          <td
                            className='text-right'
                            style={{ color: 'red', fontWeight: 'bolder' }}
                          >
                            <b>
                              Rs.
                              {totalPayment != null ? (
                                (Math.round(totalPayment) * 100) / 100
                              ) : (
                                <>{subPayment}</>
                              )}
                            </b>
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='col-md-4 col-lg-4 '>
              <div className='border mt-1'>
                <h4>How do you wish to pay ?</h4>
                <SelectPayment amount={totalPayment} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default Payament
