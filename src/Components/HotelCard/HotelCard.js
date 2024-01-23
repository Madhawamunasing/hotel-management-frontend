import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import '../../Assets/styles/css/Components/hotelCard.css'
import SearchDatePicker from '../SearchDatePicker/SearchDatePicker'

const HotelCard = ({ hotel }) => {
  const [show, setShow] = useState(false)

  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => {
    setShow(true)
  }

  const getStars = () => {
    let content = []
    for (let i = 0; i < 1; i++) {
      content.push(<i class='fa fa-star' aria-hidden='true'></i>)
    }
    return content
  }
  return (
    <div>
      <div class='card recommonded-hotels'>
        <img
          src={hotel.image}
          class='card-img-top'
          alt='...'
          onClick={() => {
            handleShow()
          }}
        />
        <div
          class='card-body'
          onClick={() => {
            handleShow()
          }}
        >
          <h4 class='card-title'>
            {hotel.name} {getStars(1)}
          </h4>
          <div class='flex items-center'>
            <svg
              aria-hidden='true'
              focusable='false'
              data-prefix='fas'
              data-icon='map-marker-alt'
              class='h-3 w-3 text-blue-500 fill-current mr-1'
              role='img'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 384 512'
            >
              <path
                fill='currentColor'
                d='M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z'
              ></path>
            </svg>
            <p class='text-xs text-gray-600'>
              Galle
              <a class='font-semibold text-gray-700 ml-2'>Show on Map</a>
            </p>
          </div>
        </div>
        <div>
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
              <SearchDatePicker
                hotelName={hotel.name}
                handleClose={handleClose}
              />
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default HotelCard
