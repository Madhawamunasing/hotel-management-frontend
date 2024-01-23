import React, { Component, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Souvenir from '../../Carousel/Souvenir'
import SplideSlider from '../../Carousel/Splide'
import '../../../Assets/styles/css/Components/roomImageModal.css'
import Browsetype from '../../Carousel/Browsetype'

const RoomImageModal = ({ roomId }) => {
  const [show, setShow] = useState(false)

  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => {
    setShow(true)
  }
  return (
    <div className='room-image-modal'>
      <a
        data-toggle='modal'
        data-target='#exampleModalCenter'
        className='mt-3 text-primary'
        onClick={handleShow}
      >
        {' '}
        Click here to view all images
      </a>
      <Modal
        show={show}
        onHide={() => {
          handleClose()
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Room Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SplideSlider roomId={roomId} />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  )
}

export default RoomImageModal
