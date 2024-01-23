import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import '../../Assets/styles/css/Seller/Components/cardMyHotel.css'
import { deleteHotelById } from '../../Services/Api/Utilities/Index.js'
const CardMyHotel = ({ hotel, getHotels }) => {
  const [show, setShow] = useState(false)
  const [confirm, setConfirm] = useState(false)
  useEffect(() => {
    toast.configure()
  }, [])
  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => {
    setShow(true)
  }
  const handleCloseConfirm = () => {
    setConfirm(false)
  }
  const handleShowConfirm = () => {
    setConfirm(true)
  }
  const notifyError = (message) => {
    toast.error(message)
  }
  const notifySuccess = (message) => {
    toast.success(message)
  }
  const deleteHotel = async () => {
    await deleteHotelById(hotel.hotelId)
      .then((res) => {
        getHotels()
        notifySuccess('You deleted a hotel sucessfully')
      })
      .catch((err) => {
        console.log(err)
        notifyError('Some thing went wrong')
      })
  }
  return (
    <div className='my-hotel-card'>
      <figure class='image-block'>
        <i
          class='far fa-trash-alt delete-icon'
          onClick={() => {
            handleShowConfirm()
          }}
        ></i>
        <h1>{hotel.name}</h1>
        <img src={hotel.image} alt='' />
        <figcaption>
          {/* <h3>More Info</h3> */}
          <div className='row'>
            <Link to={`/seller/hotel/register?id=${hotel.hotelId}&edit=true`}>
              <button>Manage Hotel info</button>
            </Link>
          </div>
          <div className='row'>
            <button
              onClick={() => {
                handleShow()
              }}
            >
              Manage Room types & rooms
            </button>
          </div>
        </figcaption>
      </figure>
      <Modal
        show={show}
        onHide={() => {
          handleClose()
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Manage rooms & room types</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <Link to={`/seller/hotel/${hotel.hotelId}/roomtype`}>
              <button>Add room type</button>
            </Link>
          </div>
          <div className='row'>
            <Link to={`/seller/hotel/${hotel.hotelId}/create-room`}>
              <button>Add room</button>
            </Link>
          </div>
          <div className='row'>
            <Link to={`/seller/hotel/${hotel.hotelId}/rooms`}>
              <button>Available Rooms</button>
            </Link>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <Modal
        show={confirm}
        onHide={() => {
          handleCloseConfirm()
        }}
      >
        <Modal.Header closeButton>
          {/* <Modal.Title>Pickup your date</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          Do you want to remove this hotel from your listing ?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={() => {
              handleCloseConfirm()
            }}
          >
            Close
          </Button>
          <Button
            variant='primary'
            onClick={() => {
              deleteHotel()
              handleCloseConfirm()
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CardMyHotel
