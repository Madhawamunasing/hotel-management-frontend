import React, { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import {
  getRoomById,
  getRoomTypesByHotelId,
} from '../../Services/Api/Utilities/Index.js'
const RoomTypeSelector = ({ setRoomType, roomType }) => {
  const params = useParams()
  const [searchedParams, setSearchedparams] = useSearchParams()
  const [roomTypes, setRoomTypes] = useState([])
  const [selectedroomType, setSelectedRoomType] = useState(null)
  const [roomDetails, setRoomDetails] = useState([])
  useEffect(() => {
    getRoomTypes()
    getRoomDetails()
  }, [])
  useEffect(() => {
    getRoomTypes()
    getRoomDetails()
  }, [roomType])

  const getRoomTypes = async () => {
    const dataModel = {
      id: params.hotelId,
    }
    await getRoomTypesByHotelId(dataModel)
      .then((res) => {
        setRoomTypes(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const getRoomDetails = async () => {
    const dataModel = {
      id: searchedParams.get('room') || '',
    }
    await getRoomById(dataModel)
      .then((res) => {
        setRoomDetails(res.data)
        setSelectedRoomType(res.data[0].roomtypeRoomTypeId)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div>
      <div class=' step-indicator '>
        <ul class='list-unstyled multi-steps'>
          <li class='is-active'>Basic Information</li>
          <li>Upload Room Image</li>
        </ul>
      </div>
      Select room type
      <div className='row ml-1'>
        {roomTypes.map((roomType) => {
          return (
            <div
              className='col-md-3 border m-2 shadow p-3  bg-white rounded roomtype-card'
              onClick={() => {
                setSelectedRoomType(roomType.roomTypeId)
                setRoomType(roomType.roomTypeId)
              }}
            >
              {selectedroomType == roomType.roomTypeId ? (
                <i
                  class='fa fa-plus-circle current-room-type'
                  aria-hidden='true'
                ></i>
              ) : (
                <></>
              )}
              {roomType.type}
            </div>
          )
        })}
      </div>
      <Link to={`/seller/hotel/${params.hotelId}/roomtype`}>
        <small id='emailHelp' class='form-text text-muted text-primary'>
          Do you want to add new room type ?
        </small>
      </Link>
    </div>
  )
}

export default RoomTypeSelector
