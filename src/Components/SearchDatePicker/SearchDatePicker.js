import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import '../../Assets/styles/css/Components/datePickerModal.css'
import DatepickerModal from '../DatePicker/DatepickerModal'
import {
  getAvailableRoomQtyByRoomId,
  updateBookingById,
} from '../../Services/Api/Utilities/Index'
const SearchDatePicker = ({ hotelName, update, handleClose }) => {
  let [rooms, setRooms] = useState(1)
  let [adults, setAdults] = useState(1)
  let [children, setChildren] = useState(0)
  let [checkinDate, setCheckinDate] = useState(null)
  let [checkoutDate, setCheckoutDate] = useState(null)
  const [searchedParams, setSearchedparams] = useSearchParams()

  const navigate = useNavigate()
  var today = new Date().toISOString().slice(0, 10)

  const [dateRange, setDateRange] = useState([null, null])

  useEffect(() => {
    toast.configure()
    if (update) {
      // setCheckinDate(searchedParams.get('checkin-date'))
      // setCheckoutDate(searchedParams.get('checkout-date'))
      setDateRange([
        searchedParams.get('checkin-date'),
        searchedParams.get('checkout-date'),
      ])
    }
  }, [])
  const increase = (status) => {
    if (status == 1) {
      setAdults((adults += 1))
    } else if (status == 2) {
      setRooms((rooms += 1))
    } else {
      setChildren((children += 1))
    }
  }
  const decrease = (status) => {
    if (status == 1) {
      if (adults >= 0) {
        setAdults(adults--)
      }
    } else if (status == 2) {
      if (rooms >= 0) {
        setRooms(rooms--)
      }
    } else {
      if (rooms >= 0) {
        setChildren(children--)
      }
    }
  }

  const submitHandle = (event) => {
    event.preventDefault()
    if (!update) {
      if (dateRange[0] != null && dateRange[1] != null) {
        let data = {
          location: hotelName,
          checkInDate: new Date(dateRange[0]).toLocaleDateString('en-ca'),
          checkOutDate: new Date(dateRange[1]).toLocaleDateString('en-ca'),
          adult: adults,
          children: children,
          rooms: rooms,
        }
        let URL = `/hotels?location=${hotelName}&checkin-date=${data.checkInDate}&checkout-date=${data.checkOutDate}&adults=${data.adult}&children=${data.children}&rooms=${data.rooms}`

        navigate(URL)
      } else {
        notifyError('Plase fill required feilds.')
      }
    } else {
      changeRoom()

      handleClose()
    }
  }

  const changeRoom = async () => {
    const dataModel = {
      roomId: searchedParams.get('roomno'),
      checkInDate: new Date(dateRange[0]).toLocaleDateString('en-ca'),
      checkOutDate: new Date(dateRange[0]).toLocaleDateString('en-ca'),
    }
    await getAvailableRoomQtyByRoomId(dataModel).then(async () => {
      if (dateRange[0] != null && dateRange[1] != null) {
        let data = {
          location: searchedParams.get('location'),
          checkInDate: new Date(dateRange[0]).toLocaleDateString('en-ca'),
          checkOutDate: new Date(dateRange[1]).toLocaleDateString('en-ca'),
          adult: adults,
          children: children,
          rooms: rooms,
        }
        const bookingId = searchedParams.get('booking')
        await updateBookingById(bookingId, {
          checkInDate: data.checkInDate,
          checkOutDate: data.checkOutDate,
          noRooms: data.rooms,
        })
          .then((res) => {
            notifySuccess('Booking is updated')
          })
          .catch(() => {
            notifyError('Some thing went wrong.')
          })
      } else {
        notifyError('Plase fill required feilds.')
      }
    })
  }
  const notifyError = (message) => {
    toast.error(message)
  }
  const notifySuccess = (message) => {
    toast.success(message)
  }

  return (
    <form onSubmit={submitHandle}>
      <div className='row'>
        <div className='search-modal-container'>
          <DatepickerModal setDateRange={setDateRange} dateRange={dateRange} />
          <input
            type='text'
            class='form-control mt-2 text-center'
            value={
              adults +
              ' adults and ' +
              (children > 0 ? children + 'childres ' : '') +
              rooms +
              ' rooms'
            }
            disabled
          />

          <div className='modal-input-container mt-2'>
            <button
              type='button'
              class='btn btn-primary'
              onClick={() => {
                decrease(1)
              }}
            >
              -
            </button>
            <input
              type='text'
              class='form-control  search-room-details'
              placeholder='No adults'
              name='Adults'
              required
              value={adults > 0 ? adults + ' adults' : 'No adults'}
            />
            <button
              type='button'
              class='btn btn-primary'
              onClick={() => {
                increase(1)
              }}
            >
              +
            </button>
          </div>
          <div className='modal-input-container '>
            <button
              type='button'
              class='btn btn-primary'
              onClick={() => {
                decrease(3)
              }}
            >
              -
            </button>
            <input
              type='text'
              class='form-control search-room-details'
              placeholder='No children'
              name='Children'
              required
              value={children > 0 ? children + ' children' : 'No children'}
            />
            <button
              type='button'
              class='btn btn-primary'
              onClick={() => {
                increase(3)
              }}
            >
              +
            </button>
          </div>
          <div className='modal-input-container '>
            <button
              type='button'
              class='btn btn-primary'
              onClick={() => {
                decrease(2)
              }}
            >
              -
            </button>
            <input
              type='text'
              class='form-control search-room-details'
              placeholder='No rooms'
              name='Rooms'
              required
              value={rooms > 0 ? rooms + ' rooms' : 'No rooms'}
            />
            <button
              type='button'
              class='btn btn-primary'
              onClick={() => {
                increase(2)
              }}
            >
              +
            </button>
          </div>

          <button class='btn btn-primary search-modal-btn' type='submit'>
            <p>Check availability</p>
          </button>
        </div>
      </div>
    </form>
  )
}

export default SearchDatePicker
