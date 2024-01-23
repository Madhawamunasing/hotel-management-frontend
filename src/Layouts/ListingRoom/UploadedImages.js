import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import DarkOverlaybackGround from '../../Components/DarkOverlaybackGround/DarkOverlaybackGround'
import {
  deleteRoomImageById,
  getAllImagesByRoomId,
} from '../../Services/Api/Utilities/Index.js'
const UploadedImages = ({ loading }) => {
  useEffect(() => {
    toast.configure()
    getImages()
  }, [loading])
  const navigate = useNavigate()
  const params = useParams()
  const [searchedParams, setSearchedparams] = useSearchParams()
  const [images, setImages] = useState([])
  const [created, setCreated] = useState(false)
  const getImages = async () => {
    const dataModel = {
      id: searchedParams.get('id') || '',
    }
    await getAllImagesByRoomId(dataModel)
      .then((res) => {
        setImages(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const deleteImage = async (imageId) => {
    await deleteRoomImageById(imageId)
      .then((res) => {
        if (res.status === 200) {
          notifySuccess('Image was deleted')
          getImages()
        } else {
          notifyError('Something went wrong!')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const notifyError = (message) => {
    toast.error(message)
  }
  const notifySuccess = (message) => {
    toast.success(message)
  }
  return (
    <>
      <div className='row '>
        {images.map((image) => {
          return (
            <div className='col-lg-2 m-3 room-image'>
              <img src={image.image} alt='' />
              <i
                class='far fa-trash-alt delete-icon'
                onClick={() => {
                  deleteImage(image.imageId)
                }}
              ></i>
            </div>
          )
        })}
      </div>
      <div className='next-container'>
        <button
          className='previous-button btn btn-primary'
          onClick={() => {
            navigate(-1)
          }}
          disabled
        >
          {'<'} Previous!
        </button>
        {images.length >= 0 ? (
          <button
            type='submit'
            className='next-button btn btn-primary'
            onClick={() => {
              setCreated(true)
              setTimeout(() => {
                setCreated(false)
                navigate(`/seller/hotel/${params.hotelId}/rooms`)
              }, 3000)
            }}
          >
            Finish the listing ! {'>'}
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
      <DarkOverlaybackGround
        loading={created}
        content={'Finishing your room'}
      />
    </>
  )
}

export default UploadedImages
