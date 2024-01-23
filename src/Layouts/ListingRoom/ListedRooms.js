import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import HashLoader from 'react-spinners/HashLoader'
import { toast } from 'react-toastify'
import DarkOverlaybackGround from '../../Components/DarkOverlaybackGround/DarkOverlaybackGround'
import Navbars from '../../Components/Navbar/Navbar'
import {
  deleteRoomById,
  getRoomByHotelId,
} from '../../Services/Api/Utilities/Index.js'
import Footer from '../Footer/Footer.js'
const ListedRooms = () => {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const params = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    getRooms()
    toast.configure()
  }, [])
  useEffect(() => {
    getRooms()
  }, [deleted])
  const notifyError = (message) => {
    toast.error(message)
  }
  const notifySuccess = (message) => {
    toast.success(message)
  }
  const getRooms = async () => {
    setLoading(true)
    const dataModel = {
      id: params.hotelId,
    }
    await getRoomByHotelId(dataModel)
      .then((res) => {
        if (res.status == 200) {
          setRooms(res.data)
        }
      })
      .catch((err) => {
        setLoading.log(err)
        notifyError('Some thing went wrong')
      })
    setLoading(false)
  }
  const removeRoom = async (id) => {
    setDeleted(true)
    await deleteRoomById(id)
      .then((res) => {
        if (res.status == 200) {
          // getRooms()
          notifySuccess('You have successfully removed room ')
        }
      })
      .catch((err) => {
        console.log(err)
        notifyError('Some thing went wrong')
      })
    setDeleted(false)
  }
  const calculateTime = (createdAt) => {
    const timeElapsed = new Date(createdAt)
    const today = new Date()
    var difference = Math.abs(today - timeElapsed)
    const days = difference / (1000 * 3600 * 24)
    if (days / 365 > 1) {
      return Math.floor(days / 365) + ' years ago'
    } else if (days / 365 < 1 && days >= 31) {
      return Math.floor(days / 12) + ' months ago'
    } else if (days / 365 < 1 && days <= 31 && days > 1) {
      return Math.floor(days) + ' days ago'
    } else if (
      days / 365 < 1 &&
      days <= 31 &&
      days < 1 &&
      difference / 1000 >= 3600
    ) {
      const milliSec = Math.abs(today - timeElapsed)
      return Math.floor(milliSec / (1000 * 3600)) + ' hours ago'
    } else if (
      days / 365 < 1 &&
      days <= 31 &&
      days < 1 &&
      difference / 1000 < 3600 &&
      difference / 1000 >= 60
    ) {
      const milliSec = Math.abs(today - timeElapsed)
      return Math.floor(milliSec / (1000 * 60)) + ' minutes ago'
    } else {
      const milliSec = Math.abs(today - timeElapsed)
      return Math.floor(milliSec / 1000) + ' seconds ago' + 1
    }
  }

  return (
    <div>
      <Navbars />
      <div className='room-adding-container container  p-2'>
        Listed Rooms
        <div class=' row'>
          {loading ? (
            <>
              <div className='booking-history-loader'>
                <HashLoader
                  loading={loading}
                  size={25}
                  margin={2}
                  color='#00AD5F'
                />
              </div>
            </>
          ) : (
            <>
              {rooms.length != 0 ? (
                rooms.map((room) => {
                  return (
                    <div className='col-md-3 border m-2 shadow p-3  bg-white rounded roomtype-card listed-room'>
                      <div class='card-body'>
                        <h4 class='card-title'>{room.roomType}</h4>
                        <p class='card-text text-justify'>{room.description}</p>
                        <div className='savedAt'>
                          <small>{calculateTime(room.createdAt)} </small>
                        </div>
                        <div className='action-container'>
                          <div>
                            <i
                              class='fa fa-pencil'
                              aria-hidden='true'
                              onClick={() => {
                                navigate(
                                  `/seller/hotel/${params.hotelId}/create-room?room=${room.roomId}&edit=true`
                                )
                              }}
                            ></i>
                            <i
                              class='far fa-trash-alt'
                              onClick={() => {
                                removeRoom(room.roomId)
                              }}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <>
                  <div class='alert alert-primary' role='alert'>
                    <h4> Nothing to display.</h4>
                    <br />
                    <Link to={`/seller/hotel/${params.hotelId}/create-room`}>
                      <p>Do you want to add rooms your property?</p>
                    </Link>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className='room-type-footer'>
        <Footer />
      </div>
      <DarkOverlaybackGround loading={deleted} content={'Deleting room .'} />
    </div>
  )
}

export default ListedRooms
