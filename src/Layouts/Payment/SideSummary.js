import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Link, useSearchParams } from 'react-router-dom'
import SearchDatePicker from '../../Components/SearchDatePicker/SearchDatePicker'

const SideSummary = ({ totalPay }) => {
  const [searchedParams, setSearchedparams] = useSearchParams()
  const [checkingDate, setCheckingDate] = useState(null)
  const [checkoutgDate, setCheckoutgDate] = useState(null)
  const [nights, setNights] = useState(0)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const date1 = new Date(searchedParams.get('checkin-date'))
    const date2 = new Date(searchedParams.get('checkout-date'))

    setNights((date2 - date1) / (1000 * 60 * 60 * 24))
    setCheckingDate(date1.toString())
    setCheckoutgDate(date2.toString())
  }, [])
  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => {
    setShow(true)
  }

  return (
    <div>
      <div className='border'>
        <h4 className='mb-3'>Booking Details</h4>
        <div className='time-container'>
          <div className='border-end '>
            <h5>
              <i class='fa fa-sign-in mr-1' aria-hidden='true'></i>
              Check-in date
            </h5>
            {checkingDate != null ? (
              <>
                <p>
                  {checkingDate.split(' ')[0] +
                    ' , ' +
                    checkingDate.split(' ')[1] +
                    ' ' +
                    checkingDate.split(' ')[2] +
                    ' ' +
                    checkingDate.split(' ')[3]}
                </p>
              </>
            ) : (
              <></>
            )}
          </div>
          <div>
            <h5>
              <i class='fa fa-sign-out  mr-1' aria-hidden='true'></i>
              Check-out date
            </h5>
            {checkoutgDate != null ? (
              <>
                <p>
                  {checkoutgDate.split(' ')[0] +
                    ' , ' +
                    checkoutgDate.split(' ')[1] +
                    ' ' +
                    checkoutgDate.split(' ')[2] +
                    ' ' +
                    checkoutgDate.split(' ')[3]}
                </p>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div>
          <p>Total length of stay: {nights} nights</p>
        </div>
        <div>
          {/* <a
            style={{ color: 'blue' }}
            onClick={() => {
              handleShow()
            }}
          >
            Do you want to change the dates?
          </a> */}
        </div>
        <hr />
        <div>
          <Link
            to={`/hotel/page?location=${searchedParams.get(
              'location'
            )}&checkin-date=${searchedParams.get(
              'checkin-date'
            )}&checkout-date=${searchedParams.get(
              'checkout-date'
            )}&adults=${searchedParams.get(
              'adults'
            )}&children=${searchedParams.get(
              'children'
            )}&rooms=${searchedParams.get('rooms')}&hotel=${searchedParams.get(
              'hotel'
            )}&rooms=${searchedParams.get(
              'rooms'
            )}&booking=${searchedParams.get('booking')}`}
          >
            Do you want to change the room type?
          </Link>
        </div>
      </div>
      <div className='border mt-3'>
        <h4>Total Payment</h4>
        <div className='payment-summary'>
          <div>
            <b>LKR {' ' + totalPay + '.00'}</b>
          </div>
        </div>
      </div>
      <div className='border mt-3'>
        <div>
          <h4>How much will it cost to cancel?</h4>
          <p>
            Free cancellation until 11:59 PM on Mar 12 From 12:00 AM on Mar 13
            LKR 10,934
          </p>
        </div>
      </div>
      <div className='border mt-3'>
        <div>
          <h4>Your loyalty benefits included in the price:</h4>
          <p>14% discount</p>
          <p>Applied to the price before taxes and fees</p>
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
          <SearchDatePicker update={true} />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  )
}

export default SideSummary
