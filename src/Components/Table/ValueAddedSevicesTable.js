import { MDBDataTable } from 'mdbreact'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import DarkOverlaybackGround from '../../Components/DarkOverlaybackGround/DarkOverlaybackGround'
import {
  deleteVASById,
  getVasByHotelId,
} from '../../Services/Api/Utilities/Index.js'
const ValueAddedSevicesTable = ({ loading, setFinished }) => {
  const [searchedParams, setSearchedparams] = useSearchParams()
  const [load, setLoad] = useState(false)
  const [services, setServices] = useState([])
  useEffect(() => {
    toast.configure()
    getServices()
  }, [])
  useEffect(() => {
    getServices()
  }, [loading])

  const getServices = async () => {
    const dataModel = {
      id: searchedParams.get('id') || '',
    }
    await getVasByHotelId(dataModel)
      .then((res) => {
        setServices(res.data)
        if (res.data.length != 0) {
          setFinished(true)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const removeService = async (id) => {
    setLoad(true)
    await deleteVASById(id)
      .then((res) => {
        notifySuccess('You have successfully removed service')
        getServices()
      })
      .catch((err) => {
        console.log(err)
        notifyError('Some thing went wrong')
      })
    setLoad(false)
  }
  const notifyError = (message) => {
    toast.error(message)
  }
  const notifySuccess = (message) => {
    toast.success(message)
  }
  const data = {
    columns: [
      {
        label: 'Service ID',
        field: 'ServiceID',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Service Name',
        field: 'name',
        sort: 'asc',
        width: 270,
      },
      {
        label: 'Rate',
        field: 'rate',
        sort: 'asc',
        width: 270,
      },
      {
        label: 'Action',
        field: 'action',
        sort: 'asc',
        width: 200,
      },
    ],
    rows: services,
  }
  data.rows = data.rows.map((obj, index) => {
    return {
      ...obj,
      ServiceID: index + 1,
      action: (
        <button>
          <a
            onClick={() => {
              removeService(obj.vasId)
            }}
          >
            {' '}
            <i class='far fa-trash-alt'></i>
          </a>
        </button>
      ),
    }
  })

  return (
    <>
      <MDBDataTable striped bordered small data={data} />
      <DarkOverlaybackGround
        loading={load}
        content={'Deleting value added service'}
      />
    </>
  )
}

export default ValueAddedSevicesTable
