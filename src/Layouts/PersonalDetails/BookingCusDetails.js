import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CountryDropdown } from 'react-country-region-selector'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { SendEmail } from '../../Services/Gmail/EmailJs'
import { toast } from 'react-toastify'
import SideSummary from '../../Layouts/Payment/SideSummary.js'
import {
  getBookingDetailsById,
  updateBookingById,
  getHotelRules,
} from '../../Services/Api/Utilities/Index.js'

import 'react-phone-number-input/style.css'

const BookingCusDetails = () => {
  const [searchedParams, setSearchedparams] = useSearchParams()
  const [special_request, setSpecial_request] = useState('')

  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [email, setEmail] = useState('abs@gmail.com')
  const [country, setCountry] = useState('LK')
  const [number, setNumber] = useState(0)
  const [arrival_time, setArrivalTime] = useState('')
  const [isUpdate, setUpdate] = useState(false)
  const [rules, setRules] = useState(null)
  const navigate = useNavigate()
  const inputform = useRef()

  useEffect(() => {
    setUpdate(searchedParams.get('edit') || '')
    if (searchedParams.get('edit') || '') {
      getBookingDetails()
    }
    getAllRules()
    toast.configure()
  }, [])

  const notifyError = (message) => {
    toast.error(message)
  }
  const notifySuccess = (message) => {
    toast.success(message)
  }
  const getBookingDetails = async () => {
    const dataModel = {
      id: searchedParams.get('booking') || '',
    }
    await getBookingDetailsById(dataModel)
      .then((res) => {
        setFirst_name(res.data.guestName.split(' ')[0])
        setLast_name(res.data.guestName.split(' ')[1])
        setCountry('Sri Lanka')
        setNumber(res.data.contactNo)
        setSpecial_request(res.data.specialRequest)
        setArrivalTime(res.data.arrivalTime)
        setEmail(res.data.email)
        var dates = new Date(res.data.arrivalTime)
        var currentTime = dates.toISOString().substring(11, 16)
        document.getElementById('arrivalTime').value = currentTime
        if (res.data.rentCar) {
          document.getElementById('rent_car').checked = true
        } else {
          document.getElementById('rent_car').checked = false
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    function getDateFromHours(time) {
      time = time.split(':')
      let now = new Date()
      return new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...time)
    }
    const bookingId = searchedParams.get('booking') || ''
    const dataModel = {
      specialRequest: special_request,
      arrivalTime: document.getElementById('arrivalTime').value,
      guestName: first_name + ' ' + last_name,
      rentCar: event.target.rent_car.checked,
      customerId: localStorage.getItem('user'), //user id
      contactNo: number,
      email: email,
    }
    if (validate()) {
      updateBooking(bookingId, dataModel, event)
    } else {
      notifyError('Invalid first name or last name')
    }
  }
  const validate = () => {
    var letters = /^[A-Za-z]+$/
    return first_name.match(letters) && last_name.match(letters)
  }
  const updateBooking = async (bookingId, dataModel, event) => {
    event.preventDefault()
    await updateBookingById(bookingId, dataModel)
      .then((res) => {
        if (!isUpdate) {
          if (res.status === 200) {
            notifySuccess('Your booking is placed !')
            setTimeout(() => {
              SendEmail(event.target)
              navigate(
                `/payment?booking=${searchedParams.get('booking') || ''}`
              )
            }, 2000)
          }
        } else {
          if (res.status === 200) {
            notifySuccess('Your booking is updated !')
            window.location.href = `/payment?booking=${
              searchedParams.get('booking') || ''
            }&edit=true`
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getAllRules = async () => {
    const dataModel = {
      id: searchedParams.get('hotelId') || '',
    }
    await getHotelRules(dataModel)
      .then((res) => {
        setRules(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className='container'>
      <div className='row user-details'>
        {/* <div className='col-md-4 col-lg-3 '>
          <SideSummary />
        </div> */}
        <div className='col-md-12 col-lg-12  '>
          <div className='border'>
            <div>
              <h4> Good to know:</h4>
            </div>
            <div>
              <ul class='fa-ul mt-1 mb-3'>
                <li>
                  <span class='fa-li'>
                    <i class='fa-solid fa-check-circle'></i>
                  </span>
                  No credit card needed!
                </li>
                <li>
                  <span class='fa-li'>
                    <i class='fa-solid fa-check-circle'></i>
                  </span>
                  No credit card needed!
                </li>
                <li>
                  <span class='fa-li'>
                    <i class='fa-solid fa-check-circle'></i>
                  </span>
                  No credit card needed!
                </li>
              </ul>
            </div>
          </div>
          <form onSubmit={handleSubmit} ref={inputform}>
            <div className='border mt-3'>
              <h3>Enter your details</h3>
              <div className='personal-details-form'>
                <div className='row'>
                  <div class='form-group col-lg-6 '>
                    <label for='First Name'>First Name *</label>
                    <input
                      type='text'
                      class='form-control first_name'
                      placeholder='Enter first name'
                      name='first_name'
                      required
                      value={first_name}
                      onChange={(value) => {
                        setFirst_name(value.target.value)
                      }}
                    />
                  </div>
                  <div class='form-group col-lg-6'>
                    <label for='last Name'>Last Name *</label>
                    <input
                      type='text'
                      class='form-control last_name'
                      placeholder='Enter last name'
                      name='last_name'
                      required
                      value={last_name}
                      onChange={(value) => setLast_name(value.target.value)}
                    />
                  </div>
                </div>
                <div className='row'>
                  <div class='form-group col-lg-12 '>
                    <label for='exampleInputEmail1'>Email address *</label>
                    <input
                      type='email'
                      class='form-control email'
                      id='exampleInputEmail1'
                      aria-describedby='emailHelp'
                      placeholder='Enter email'
                      name='email'
                      required
                      value={email}
                      onChange={(value) => setEmail(value.target.value)}
                    />
                    <small id='emailHelp' class='form-text text-muted'>
                      Confirmation email sent to this address
                    </small>
                  </div>
                </div>
                <div className='row'>
                  <div>
                    <label for='country'>Country/Region * </label>
                    <br />
                    <CountryDropdown
                      className='border country-selector country'
                      value={country}
                      onChange={setCountry}
                      required
                    />
                  </div>
                </div>
                <div className='row'>
                  <div>
                    <label for='phone Number'>Telephone *</label>
                    <PhoneInput
                      placeholder='Enter phone number'
                      class='form-control border telephone_number'
                      value={number}
                      defaultCountry='LK'
                      onChange={setNumber}
                      required
                      error={
                        number
                          ? isValidPhoneNumber(number)
                            ? undefined
                            : 'Invalid phone number'
                          : 'Phone number required'
                      }
                    />
                    <small class='form-text text-muted'>
                      We will send confirmation SMS and communicate with you via
                      this number in the future.
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className='border mt-3 add-transport'>
              <h4>Add to your stay</h4>
              <div class='form-check'>
                <input
                  class='form-check-input rent_car'
                  type='checkbox'
                  name='rent_car'
                  id='rent_car'
                />
                <label for='flexCheckDefault'>
                  I'm interested in renting a car
                </label>
              </div>

              <div>
                <p>
                  If you do not select specific time below selector,we will
                  identify, your arrival time is{' '}
                  <i style={{ color: 'blue' }}> 10.00 AM</i>
                </p>
                <div class='md-form mx-5 my-5'>
                  <input
                    type='time'
                    id='arrivalTime'
                    class='form-control arrival_time'
                    name='arrival_time'
                    value={arrival_time}
                    onChange={(value) => setArrivalTime(value.target.value)}
                  />
                  <label for='inputMDEx1'>Choose your arrival time</label>
                </div>
              </div>
            </div>
            <div className='border  mt-3'>
              <h4>Special requests</h4>
              <div className='row'>
                <p>
                  Special requests can't be guaranteed, but the property will do
                  its best to meet your needs. You can always make a special
                  request after your booking is complete.
                </p>
                <p>Please write your requests in English. (optional)</p>
              </div>
              <div class='form-group'>
                <textarea
                  class='form-control rounded-0 special_request'
                  id='exampleFormControlTextarea1'
                  rows='5'
                  name='special_request'
                  value={special_request}
                  onChange={(value) => setSpecial_request(value.target.value)}
                ></textarea>
              </div>
            </div>
            <div className='border  mt-3'>
              <h4>Review House Rules</h4>

              <div className='p-2'>
                <p>
                  Your host would like you to agree to the following house
                  rules:
                </p>
                <ul class='fa-ul mt-3 mb-3'>
                  {rules != null ? (
                    rules.map((item) => {
                      return (
                        <>
                          <li>
                            <span class='fa-li'>
                              <i class='fa-solid fa-check-circle'></i>
                            </span>
                            {item.rule}
                          </li>
                        </>
                      )
                    })
                  ) : (
                    <></>
                  )}
                </ul>
                <p>
                  By continuing to the next step, you agree to these house rules
                </p>
              </div>
            </div>
            <div className='next-container'>
              <button
                className='previous-button btn btn-primary'
                onClick={() => {
                  navigate(-1)
                }}
              >
                {'<'} Previous!
              </button>

              <button type='submit' className='next-button btn btn-primary'>
                {isUpdate ? <> Update ! {'>'}</> : <> Almost done! {'>'}</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BookingCusDetails
