import React, { Component, useState } from 'react'
import { Modal } from 'react-bootstrap'
import SearchDatePicker from '../../Components/SearchDatePicker/SearchDatePicker'
import '../../Assets/styles/css/Layouts/topdestination.css'

const TopDestination = () => {
  const [show, setShow] = useState(false)
  const [hotelName, setHotelName] = useState('')
  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => {
    setShow(true)
  }

  return (
    <div className='topDestination-outer-container'>
      <div className='container topDestination-container mt-5  rounded p-3'>
        <div>
          <h2>Top Destinations</h2>
        </div>
        <div className='row'>
          <div className='col-md-4 test mb-5 '>
            <div
              className='circle'
              onClick={() => {
                handleShow()
                setHotelName('Anuradhapura')
              }}
            >
              <div className='circle_inner'>
                <div className='circle_inner__layer'>
                  <img
                    src='/images/shortcutPlaces/anuradapra.jpg'
                    alt='image'
                  />
                </div>
              </div>
            </div>
            <div className='title-logo text-center'>
              <h2>Anuradhapura</h2>
              {/* <h3>Get some fresh air</h3> */}
            </div>
          </div>
          <div className='col-md-4 test mb-5'>
            <div
              className='circle'
              onClick={() => {
                handleShow()
                setHotelName('Galle')
              }}
            >
              <div className='circle_inner'>
                <div className='circle_inner__layer'>
                  <img src='/images/shortcutPlaces/galle.jpg' alt='image' />
                </div>
              </div>
            </div>
            <div className='title-logo text-center'>
              <h2>Galle</h2>
              {/* <h3>Get some fresh air</h3> */}
            </div>
          </div>
          <div className='col-md-4 test mb-5'>
            <div
              className='circle '
              onClick={() => {
                handleShow()
                setHotelName('Ella')
              }}
            >
              <div className='circle_inner'>
                <div className='circle_inner__layer'>
                  <img src='/images/shortcutPlaces/ella.jpg' alt='image' />
                </div>
              </div>
            </div>
            <div className='title-logo text-center '>
              <h2>Ella</h2>
              {/* <h3>Get some fresh air</h3> */}
            </div>
          </div>
        </div>
        <Modal
          show={show}
          onHide={() => {
            handleClose()
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Pickup your date</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SearchDatePicker hotelName={hotelName} />
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}

export default TopDestination
