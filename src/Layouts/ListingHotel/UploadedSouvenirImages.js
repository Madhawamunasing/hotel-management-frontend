import { MDBDataTable } from 'mdbreact'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  deleteSouvenirById,
  getAllsouvenirByHotelId,
} from '../../Services/Api/Utilities/Index.js'
const UploadedSouvenirImages = ({ trigger }) => {
  const [searchedParams, setSearchedparams] = useSearchParams()
  const [souvenirs, setSouvenirs] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    toast.configure()
    getSouvenirImages()
  }, [trigger])

  const getSouvenirImages = async () => {
    const dataModel = {
      id: searchedParams.get('id') || '',
    }
    await getAllsouvenirByHotelId(dataModel)
      .then((res) => {
        setSouvenirs(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const notifySuccess = (message) => {
    toast.success(message)
  }
  const notifyError = (message) => {
    toast.error(message)
  }
  const deleteSouvenir = async (params) => {
    const dataModel = [params]
    await deleteSouvenirById(dataModel)
      .then((res) => {
        notifySuccess('Deleted souvenir successfully')
        getSouvenirImages()
      })
      .catch((err) => {
        notifyError('spme thing went wrong !')
        console.log(err)
      })
  }
  const data = {
    columns: [
      {
        label: 'Souvenir Id',
        field: 'index',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Title',
        field: 'title',
        sort: 'asc',
        width: 270,
      },

      {
        label: 'SubTitle',
        field: 'subTitle',
        sort: 'asc',
        width: 150,
      },
      {
        label: '',
        field: 'action',
        sort: 'asc',
        width: 100,
      },
    ],
    rows: souvenirs,
  }
  data.rows = data.rows.map((obj, i) => {
    return {
      ...obj,
      index: i + 1,
      action: (
        <button>
          <a
            onClick={() => {
              deleteSouvenir(obj.souvenirId)
              // alert(obj.roomTypeId)
            }}
          >
            {' '}
            <i class='fas fa-plus-circle '></i>
          </a>
        </button>
      ),
    }
  })
  return (
    <div>
      <div className='mt-2 mb-2'>
        {souvenirs.length != 0 ? (
          <h4
            style={{
              fontWeight: 'bold',
              marginBottom: '2rem',
              marginTop: '2rem',
              textAlign: 'center',
            }}
          >
            Uploaded Images
          </h4>
        ) : (
          <></>
        )}

        {souvenirs.length != 0 ? (
          <MDBDataTable striped bordered small data={data} />
        ) : (
          <></>
        )}
      </div>
      <div className='next-container'>
        <button
          className='previous-button btn btn-primary'
          // onClick={() => {
          //   navigate(-1)
          // }}
        >
          {'<'} Previous!
        </button>
        {souvenirs.length >= 0 ? (
          <button
            type='submit'
            className='next-button btn btn-primary'
            onClick={() => {
              window.location.href = `/seller/hotel/value-added-services?id=${
                searchedParams.get('id') || ''
              }`
            }}
          >
            Next ! {'>'}
          </button>
        ) : (
          <>
            <button
              type='submit'
              className='next-button btn btn-primary'
              disabled
            >
              Next ! {'>'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default UploadedSouvenirImages
