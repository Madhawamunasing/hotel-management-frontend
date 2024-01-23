import React, { useEffect, useState } from 'react'
import NumericInput from 'react-numeric-input'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import DarkOverlaybackGround from '../../Components/DarkOverlaybackGround/DarkOverlaybackGround'
import {
  createRoom,
  getRoomById,
  updateRoomById,
} from '../../Services/Api/Utilities/Index.js'
const RoomDetials = ({ roomType, setRoomType }) => {
  const navigate = useNavigate()
  const params = useParams()
  const [searchedParams, setSearchedparams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [roomDetails, setRoomDetails] = useState([])

  const [description, setDescription] = useState('')
  const [room_rate, setRoom_rate] = useState(0)
  const [no_guest, setNo_guest] = useState(0)
  const [no_rooms, setNo_rooms] = useState(0)
  const [room_area, setRoom_area] = useState(0)
  const mode = searchedParams.get('edit') || ''
  useEffect(() => {
    toast.configure()
    getRoomDetails()
  }, [])

  const notifyError = (message) => {
    toast.error(message)
  }
  const notifySuccess = (message) => {
    toast.success(message)
  }
  const getRoomDetails = async () => {
    const dataModel = {
      id: searchedParams.get('room') || '',
    }
    await getRoomById(dataModel)
      .then((res) => {
        setRoomDetails(res.data)
        setDescription(res.data[0].description)
        setRoom_rate(res.data[0].rate)
        setNo_guest(res.data[0].persons)
        setNo_rooms(res.data[0].qty)
        setRoomType(res.data[0].roomtypeRoomTypeId)
        setRoom_area(res.data[0].area)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleSubmit = async (event) => {
    event.preventDefault()

    setLoading(true)

    if (!mode) {
      const dataModel = {
        description: description,
        rate: room_rate,
        hotelId: params.hotelId,
        persons: no_guest,
        roomTypeId: roomType,
        qty: no_rooms,
        area: room_area,
      }

      await createRoom(dataModel)
        .then((res) => {
          if (res.status == 200) {
            notifySuccess('You have successfully created room')
            navigate(
              `/seller/${params.hotelId}/room/upload-image?id=${res.data.roomId}`
            )
          }
        })
        .catch((err) => {
          console.log(err)
          notifyError('Some thing went wrong')
        })
    } else {
      const dataModel = {
        description: description,
        rate: room_rate,
        hotelId: params.hotelId,
        persons: no_guest,
        roomtypeRoomTypeId: roomType,
        qty: no_rooms,
        area: room_area,
      }

      const id = searchedParams.get('room') || ''
      await updateRoomById(id, dataModel)
        .then((res) => {
          if (res.status == 200) {
            notifySuccess('You have successfully created room')
            navigate(
              `/seller/${params.hotelId}/room/upload-image?id=${
                searchedParams.get('room') || ''
              }`
            )
          }
        })
        .catch((err) => {
          console.log(err)
          notifyError('Some thing went wrong')
        })
    }

    setLoading(false)
  }
  return (
    <div className='ml-1'>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div class='form-group col-lg-3 '>
            <label for='First Name'>Available room qty *</label>
            <NumericInput
              type='number'
              className='form-control'
              name='no_rooms'
              min={0}
              required
              value={no_rooms}
              onChange={(value) => setNo_rooms(value)}
            />
          </div>
        </div>
        <h3>Room details</h3>
        <div className='row'>
          <div class='form-group col-lg-3 '>
            <label for='First Name'>
              How many guests can stay in this room ? *
            </label>
            <NumericInput
              type='number'
              className='form-control'
              min={0}
              name='no_guest'
              required
              value={no_guest}
              onChange={(value) => setNo_guest(value)}
            />
          </div>
        </div>
        Area
        <div className='row'>
          <div class='form-group col-lg-3 '>
            <NumericInput
              className='form-control'
              min={0}
              required
              value={room_area}
              name='room_area'
              onChange={(value) => setRoom_area(value)}
            />
          </div>
          <div className='col-sm-3'>
            <select class='form-select' aria-label='Default select example'>
              <option selected>Squere meters</option>
            </select>
          </div>
        </div>
        Rates
        <div className='row'>
          <div class='form-group col-lg-3 '>
            <NumericInput
              type='number'
              className='form-control'
              name='room_area'
              min={0}
              required
              value={room_rate}
              onChange={(value) => setRoom_rate(value)}
            />
          </div>
        </div>
        <div className='row'>
          <label for='floatingTextarea2'>Description </label>
          <div class='form-floating col-lg-6'>
            <textarea
              class='form-control'
              placeholder='Leave a comment here'
              id='floatingTextarea2'
              style={{ height: '100px' }}
              name='description'
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
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
            {!mode ? <>Next! </> : <>Update</>} {'>'}
          </button>
        </div>
      </form>
      <DarkOverlaybackGround loading={loading} content={'Creating your room'} />
    </div>
  )
}

export default RoomDetials
