import { MDBDataTable, MDBIcon } from 'mdbreact'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  getRoomTypesByHotelId,
  removeRoomType,
} from '../../Services/Api/Utilities/Index.js'
import DarkOverlaybackGround from '../DarkOverlaybackGround/DarkOverlaybackGround'
const RoomTypeTable = ({ loading }) => {
  const params = useParams()
  const [roomTypes, setRoomTypes] = useState([])
  const [deleted, setDeleted] = useState(false)
  useEffect(() => {
    toast.configure()
  }, [])
  useEffect(() => {
    getRoomTypes()
  }, [loading])
  const notifyError = (message) => {
    toast.error(message)
  }
  const notifySuccess = (message) => {
    toast.success(message)
  }
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
  const removeRoomTypes = async (id) => {
    setDeleted(true)
    await removeRoomType(id)
      .then((res) => {
        if (res.status == 200) {
          notifySuccess('You have successfully removed room type')
        }
      })
      .catch((err) => {
        notifyError('Some thing went wrong')
        console.log(err)
      })
    getRoomTypes()
    setDeleted(false)
  }
  const data = {
    columns: [
      {
        label: 'Room Type Id',
        field: 'index',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Type',
        field: 'type',
        sort: 'asc',
        width: 270,
      },

      {
        label: 'Beds',
        field: 'beds',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Remark',
        field: 'description',
        sort: 'asc',
        width: 100,
      },
      {
        label: '',
        field: 'action',
        sort: 'asc',
        width: 100,
      },
    ],
    rows: roomTypes,
  }
  data.rows = data.rows.map((obj, i) => {
    return {
      ...obj,
      index: i + 1,
      action: (
        <button>
          <a
            onClick={() => {
              removeRoomTypes(obj.roomTypeId)
              // alert(obj.roomTypeId)
            }}
          >
            {' '}
            <MDBIcon icon='trash' />
          </a>
        </button>
      ),
    }
  })

  return (
    <>
      <DarkOverlaybackGround
        loading={deleted}
        content={'Deleting room type.'}
      />
      <MDBDataTable striped bordered small data={data} />
    </>
  )
}

export default RoomTypeTable
