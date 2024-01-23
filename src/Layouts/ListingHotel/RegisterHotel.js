import React, { useEffect, useState } from 'react'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { useNavigate, useSearchParams } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'
import { toast } from 'react-toastify'
import '../../Assets/styles/css/Seller/Layouts/registerHotel.css'
import AddressSelector from '../../Components/AddressSelector/AddressSelector.js'
import DarkOverlaybackGround from '../../Components/DarkOverlaybackGround/DarkOverlaybackGround.js'
import Navbars from '../../Components/Navbar/Navbar'
import {
  getHotelById,
  registerHotel,
  updateHotelById,
  updateRole,
} from '../../Services/Api/Utilities/Index.js'
import Footer from '../Footer/Footer.js'

const RegisterHotel = () => {
  const [searchedParams, setSearchedparams] = useSearchParams()
  const [country, setCountry] = useState('LK')
  const [number, setNumber] = useState(0)
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('Creating your property')
  const [isUpdate, setUpdate] = useState(false)
  const navigate = useNavigate()

  const [name, setName] = useState(null)
  const [description, setDescription] = useState(null)
  const [province, setProvince] = useState(null)
  const [district, setDistrict] = useState(null)
  const [town, setTown] = useState(null)
  const [street1, setStreet1] = useState(null)
  const [street2, setStreet2] = useState(null)
  const [email, setEmail] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    toast.configure()
    let id = searchedParams.get('id') || ''
    let edit = searchedParams.get('edit') || ''
    if (id != '' && edit) {
      setUpdate(true)
      getHotelInfo()
      setContent('Updating your property')
    }
  }, [])
  const notifyError = (message) => {
    toast.error(message)
  }
  const getHotelInfo = async () => {
    const dataModel = {
      id: searchedParams.get('id') || '',
    }
    await getHotelById(dataModel)
      .then((res) => {
        setName(res.data[0].name)
        setDescription(res.data[0].description)
        setProvince(res.data[0].province)
        setDistrict(res.data[0].district)
        setTown(res.data[0].town)
        setStreet1(res.data[0].Street1)
        setStreet2(res.data[0].Street2)
        setNumber(res.data[0].phoneNumber)
        setEmail(res.data[0].email)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    const dataModel = {
      name: event.target.hotel_name.value,
      phoneNumber: number,
      email: event.target.email.value,
      description: event.target.description.value,
      province: document.getElementById('province').value,
      district: document.getElementById('district').value,
      town: event.target.town.value,
      Street1: event.target.street_01.value,
      Street2: event.target.street_02.value,
      userId: localStorage.getItem('user'), //user id
    }
    let id = searchedParams.get('id') || ''
    if (isUpdate) {
      await updateHotelById(id, dataModel)
        .then((res) => {
          if (res.status == 200) {
            setLoading(true)
            setTimeout(() => {
              setLoading(false)
              navigate(`/seller/hotel/image?id=${id}`)
            }, 2000)
          } else {
            notifyError('Something went wrong!')
          }
        })
        .catch((err) => {
          notifyError('Something went wrong!')
          console.log(err)
        })
    } else {
      await registerHotel(dataModel)
        .then(async (res) => {
          if (res.status == 200) {
            setLoading(true)
            let userId = localStorage.getItem('user')
            const dataModel = {
              admin: false,
              hotelAdmin: true,
              customer: true,
            }
            await updateRole(userId, dataModel).then((res) => {
              console.log(res)
              secureLocalStorage.setItem('hotelAdmin', res.data.hotelAdmin)
            })
            setTimeout(() => {
              setLoading(false)
              navigate(`/seller/hotel/image?id=${res.data.hotelId}`)
            }, 2000)
          } else {
            notifyError('Something went wrong!')
          }
        })
        .catch((err) => {
          notifyError('Something went wrong!')
          console.log(err)
        })
    }
  }

  return (
    <div>
      <Navbars />
      <div className='hotel-register-container'>
        <div class=' step-indicator'>
          <ul class='list-unstyled multi-steps'>
            <li class='is-active'>Basic Information</li>
            <li>Upload hotel Image</li>
            <li>Upload souvenir Images</li>
            <li>Add value added servces</li>
            <li>Facilities</li>
          </ul>
          <div className='container'>
            <form onSubmit={handleSubmit}>
              <div className='border mt-3 p-3'>
                <h3>Enter your property details</h3>
                <div className='personal-details-form'>
                  <div className='row'>
                    <div class='form-group col-lg-6 '>
                      <label for='Hotel Name'>Hotel Name *</label>
                      <input
                        type='text'
                        class='form-control hotel_name'
                        placeholder='Enter Hotel Name'
                        name='hotel_name'
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div class='form-group col-lg-6 '>
                      <label for='exampleInputEmail1'>Email address *</label>
                      <input
                        type='email'
                        class='form-control email'
                        id='exampleInputEmail1'
                        aria-describedby='emailHelp'
                        placeholder='Enter email'
                        name='email'
                        value={email}
                        required
                      />
                      <small id='emailHelp' class='form-text text-muted'>
                        Confirmation email sent to this address
                      </small>
                    </div>
                  </div>

                  <div className='row '>
                    <div className='col-lg-6'>
                      <label for='country'>Country/Region * </label>
                      <select
                        class='form-select'
                        aria-label='Default select example'
                        id='country-location'
                        disabled
                      >
                        <option selected>Sri Lanaka</option>
                      </select>
                    </div>
                    <small class='form-text text-muted'>
                      Your property should be located in Sri Lanaka.
                    </small>
                  </div>
                  <div>
                    <AddressSelector dis={district} prov={province} />
                  </div>

                  <div className='row'>
                    <div class='form-group col-lg-4 '>
                      <label for='First Name'>Town *</label>
                      <input
                        type='text'
                        class='form-control first_name'
                        placeholder='Enter Town'
                        name='town'
                        value={town}
                        onChange={(event) => setTown(event.target.value)}
                        required
                      />
                    </div>
                    <div class='form-group col-lg-4 '>
                      <label for='First Name'>Street 01 *</label>
                      <input
                        type='text'
                        class='form-control street_01'
                        placeholder='Enter Street 01'
                        name='street_01'
                        value={street1}
                        onChange={(event) => setStreet1(event.target.value)}
                        required
                      />
                    </div>
                    <div class='form-group col-lg-4 '>
                      <label for='First Name'>Street 02 *</label>
                      <input
                        type='text'
                        class='form-control street_02'
                        placeholder='Enter Street 02'
                        name='street_02'
                        value={street2}
                        onChange={(event) => setStreet2(event.target.value)}
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
                        We will send confirmation SMS and communicate with you
                        via this number in the future.
                      </small>
                    </div>
                  </div>
                  <div className='row'>
                    <label for='floatingTextarea2'>Description </label>
                    <div class='form-floating'>
                      <textarea
                        class='form-control'
                        placeholder='Leave a comment here'
                        id='floatingTextarea2'
                        style={{ height: '100px' }}
                        name='description'
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className='next-container'>
                <button type='submit' className='next-button btn btn-primary'>
                  {isUpdate ? <> Update! {'>'}</> : <> Next! {'>'}</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <DarkOverlaybackGround loading={loading} content={content} />
      <Footer />
    </div>
  )
}

export default RegisterHotel
