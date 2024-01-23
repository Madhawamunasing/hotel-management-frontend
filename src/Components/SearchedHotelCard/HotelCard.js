import React, { Component } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import {
  saveHotelById,
  deleteSaveHotelById,
} from '../../Services/Api/Utilities/Index'

import 'react-toastify/dist/ReactToastify.css'
import Hotel_1 from '../../Assets/images/hotels/hotel1.jpg'
import '../../Assets/styles/css/Components/searchedHotelCard.css'
class HotelCard extends Component {
  constructor(props) {
    super(props)
    toast.configure()
    this.state = {
      isSaved: false,
    }
  }

  notify(message) {
    toast.success(message)
  }
  saveHotel() {
    this.setState((state) => ({
      isSaved: !state.isSaved,
    }))
    if (this.state.isSaved) {
      this.removehotelSave()
    } else {
      this.hotelSave()
    }
  }
  async hotelSave() {
    const dataModel = {
      customerId: localStorage.getItem('user'), //user id
      hotelId: this.props.hotelData.hotelHotelId,
    }
    await saveHotelById(dataModel)
      .then((res) => {
        if (res.status == 200 && res.data == 'saved') {
          this.notify('You have already saved this hotel!')
        } else if (res.status == 200) {
          this.notify('You Saved a hotel successfully !')
        } else {
          this.notify('Something went wrong. !')
        }
      })
      .catch((err) => {
        this.notify('Something went wrong. !')
      })
  }
  async removehotelSave() {
    const dataModel = [this.props.hotelData.hotelHotelId, 1]

    await deleteSaveHotelById(dataModel)
      .then((res) => {
        if (res.status == 200) {
          this.notify('You removed a hotel successfully !')
        } else {
          this.notify('Something went wrong. !')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  getStars(params) {
    let content = []
    for (let i = 0; i < params; i++) {
      content.push(<i class='fa fa-star' aria-hidden='true'></i>)
    }
    return content
  }

  render() {
    return (
      <div>
        <div
          id='hotel-card'
          class='flex items-center justify-center h-full p-3 '
        >
          <div class='w-full shadow-lg max-w-6xl bg-white sm:flex'>
            <div
              class='w-full sm:w-2/4 hotel-cover bg-center bg-cover border relative h-g sm:h-auto shadow-inner'
              style={{
                backgroundImage: `url(${this.props.hotelData.hotel.image})`,
              }}
            >
              <div className='save-hotel m-2'>
                {this.state.isSaved ? (
                  <i
                    class='fas fa-heart fa-2x saved-heart'
                    id='savel-hotel'
                    onClick={() => {
                      this.saveHotel()
                    }}
                  ></i>
                ) : (
                  <i
                    class='fas fa-heart fa-2x notSaved-heart'
                    id='savel-hotel'
                    onClick={() => {
                      this.saveHotel()
                    }}
                  ></i>
                )}
              </div>
              <div class='w-full  bottom-0 flex justify-center service-icon'>
                <ul class='text-xs sm:font-semibold my-2 flex sm:block justify-around w-full sm:w-auto text-white '>
                  <li class='my-1 flex items-center'>
                    <svg
                      aria-hidden='true'
                      focusable='false'
                      data-prefix='fas'
                      data-icon='wifi'
                      class='mr-1 h-3 w-3 fill-current'
                      role='img'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 512 512'
                    >
                      <path
                        fill='currentColor'
                        d='M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z'
                      ></path>
                    </svg>
                    Free cancelation
                  </li>
                  <li class='my-1 flex items-center'>
                    <svg
                      aria-hidden='true'
                      focusable='false'
                      data-prefix='fas'
                      data-icon='wifi'
                      class='mr-1 h-3 w-3 fill-current'
                      role='img'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 512 512'
                    >
                      <path
                        fill='currentColor'
                        d='M127.1 146.5c1.3 7.7 8 13.5 16 13.5h16.5c9.8 0 17.6-8.5 16.3-18-3.8-28.2-16.4-54.2-36.6-74.7-14.4-14.7-23.6-33.3-26.4-53.5C111.8 5.9 105 0 96.8 0H80.4C70.6 0 63 8.5 64.1 18c3.9 31.9 18 61.3 40.6 84.4 12 12.2 19.7 27.5 22.4 44.1zm112 0c1.3 7.7 8 13.5 16 13.5h16.5c9.8 0 17.6-8.5 16.3-18-3.8-28.2-16.4-54.2-36.6-74.7-14.4-14.7-23.6-33.3-26.4-53.5C223.8 5.9 217 0 208.8 0h-16.4c-9.8 0-17.5 8.5-16.3 18 3.9 31.9 18 61.3 40.6 84.4 12 12.2 19.7 27.5 22.4 44.1zM400 192H32c-17.7 0-32 14.3-32 32v192c0 53 43 96 96 96h192c53 0 96-43 96-96h16c61.8 0 112-50.2 112-112s-50.2-112-112-112zm0 160h-16v-96h16c26.5 0 48 21.5 48 48s-21.5 48-48 48z'
                      ></path>
                    </svg>
                    Breakfast included
                  </li>
                  <li class='my-1 flex items-center'>
                    <svg
                      aria-hidden='true'
                      focusable='false'
                      data-prefix='fas'
                      data-icon='wifi'
                      class='mr-1 h-3 w-3 fill-current'
                      role='img'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 640 512'
                    >
                      <path
                        fill='currentColor'
                        d='M634.91 154.88C457.74-8.99 182.19-8.93 5.09 154.88c-6.66 6.16-6.79 16.59-.35 22.98l34.24 33.97c6.14 6.1 16.02 6.23 22.4.38 145.92-133.68 371.3-133.71 517.25 0 6.38 5.85 16.26 5.71 22.4-.38l34.24-33.97c6.43-6.39 6.3-16.82-.36-22.98zM320 352c-35.35 0-64 28.65-64 64s28.65 64 64 64 64-28.65 64-64-28.65-64-64-64zm202.67-83.59c-115.26-101.93-290.21-101.82-405.34 0-6.9 6.1-7.12 16.69-.57 23.15l34.44 33.99c6 5.92 15.66 6.32 22.05.8 83.95-72.57 209.74-72.41 293.49 0 6.39 5.52 16.05 5.13 22.05-.8l34.44-33.99c6.56-6.46 6.33-17.06-.56-23.15z'
                      ></path>
                    </svg>
                    Wifi included
                  </li>
                </ul>
              </div>
            </div>
            <div class='w-full sm:w-3/4 p-3'>
              <div class='flex justify-between items-center border-b pb-3'>
                <div>
                  <div class='sm:flex items-center mb-1'>
                    <h2 class='text-lg font-semibold text-gray-600'>
                      {this.props.hotelData.hotel.name}
                    </h2>
                    <div class='flex sm:ml-3'>
                      {/* {this.getStars(this.props.hotel.stars)} */}
                    </div>
                  </div>
                  <div class='flex items-center'>
                    <svg
                      aria-hidden='true'
                      focusable='false'
                      data-prefix='fas'
                      data-icon='map-marker-alt'
                      class='h-3 w-3 text-blue-500 fill-current mr-1'
                      role='img'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 384 512'
                    >
                      <path
                        fill='currentColor'
                        d='M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z'
                      ></path>
                    </svg>
                    <p class='text-xs text-gray-600'>
                      {this.props.hotelData.hotel.province}
                      <a class='font-semibold text-gray-700 ml-2' href=''>
                        Show on Map
                      </a>
                    </p>
                  </div>
                </div>
                <div>
                  <div class='text-right text-xl leading-tight text-gray-600 font-semibold'>
                    Rs {this.props.hotelData.rate}
                    <br /> <div className='nights'>{/* <p>2 nights</p> */}</div>
                  </div>
                </div>
              </div>

              <div class='flex mt-3'>
                <div>
                  <svg
                    aria-hidden='true'
                    focusable='false'
                    data-prefix='fas'
                    data-icon='info-circle'
                    class='w-3 h-3 text-blue-500 mt-1'
                    role='img'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 512 512'
                  >
                    <path
                      fill='currentColor'
                      d='M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z'
                    ></path>
                  </svg>
                </div>
                <p class='text-xs ml-1 text-gray-600'>
                  {this.props.hotelData.hotel.description}
                </p>
              </div>

              <div class='flex mt-3 items-center'>
                <div>
                  <svg
                    aria-hidden='true'
                    focusable='false'
                    data-prefix='fas'
                    data-icon='bed'
                    class='w-3 h-3 text-blue-500'
                    role='img'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 640 512'
                  >
                    <path
                      fill='currentColor'
                      d='M176 256c44.11 0 80-35.89 80-80s-35.89-80-80-80-80 35.89-80 80 35.89 80 80 80zm352-128H304c-8.84 0-16 7.16-16 16v144H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v352c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16v-48h512v48c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V240c0-61.86-50.14-112-112-112z'
                    ></path>
                  </svg>
                </div>
                <p class='text-xs ml-1 text-gray-600 font-semibold'>
                  Deluxe room, 1 King Bed
                </p>
              </div>

              <div class='sm:flex mt-3 items-center justify-between'>
                <div>
                  <p class='text-xs text-green-700'>
                    {/* <strong>{this.props.hotel.stars}/5 Avgerage.</strong> See */}
                    431 reviews
                  </p>
                </div>
                {/* const URL = `location=${data.location}&checkin-date=$
                {data.checkInDate}&checkout-date=${data.checkOutDate}&adults=$
                {data.adult}&children=${data.children}&rooms=${data.rooms}&ho` */}
                <Link
                  to={`/hotel/page?location=${this.props.URLparams.location}&checkin-date=${this.props.URLparams.checkInDate}&checkout-date=${this.props.URLparams.checkOutDate}&adults=${this.props.URLparams.adult}&children=${this.props.URLparams.children}&rooms=${this.props.URLparams.rooms}&hotel=${this.props.hotelData.hotelHotelId}`}
                >
                  <div class='mt-3 sm:mt-3 book-now'>
                    <a class='bg-blue-500 shadow text-blue-100 py-3 px-6 font-bold inline-block rounded-md'>
                      <p>Book Now</p>
                    </a>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HotelCard
