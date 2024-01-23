import React, { Component } from 'react'
import Navbars from '../../Components/Navbar/Navbar'
import Footer from '../../Layouts/Footer/Footer'
import * as ReactBootstrap from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import trash from '../Messages/utils/trash.svg'
import eye from '../Messages/utils/eye.svg'

class ViewCoupons extends Component {
  state = {
    coupons: [],
  }
  render() {
    return (
      <div>
        <div>
          <Navbars />
        </div>
        <div>{/* <ListGroupMessages /> */}</div>
        <div className='couponsTable'>
          <ReactBootstrap.Table striped bordered hover>
            <thead className='couponTableHead'>
              <tr>
                <th>Hotel</th>
                <th>Title</th>
                <th>Token</th>
                <th>Discount</th>
                <th>Minimum Total</th>
                <th>Expire On</th>
              </tr>
            </thead>
            <tbody className='couponTableBody'>
              {this.state.coupons.map((coupon) => (
                <tr key={coupon.couponId}>
                  <td>{coupon.hotelId}</td>
                  <td>{coupon.title}</td>
                  <td>{coupon.token.slice(0, 20) + '...'}</td>
                  <td>{coupon.discount}</td>
                  <td>{coupon.minimumTotal}</td>
                  <td>{coupon.expireOn.split('T')[0]}</td>
                  <td>
                    <span className='viewButton'>
                      <div
                        onClick={() => {
                          this.handleShowModal()

                          this.setState({ currentCoupon: coupon.title })
                        }}
                        className='viewButton btn btn-outline-success'
                      >
                        <img src={eye} className='coupon-eye' alt='eye' />
                        View
                      </div>
                    </span>
                    <span className='deleteButton'>
                      <button
                        onClick={() => this.handleDelete(coupon)}
                        className='btn btn-outline-danger'
                      >
                        <img src={trash} className='coupon-trash' alt='trash' />
                        Delete
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </ReactBootstrap.Table>
          <span>{/* <MessagePagination /> */}</span>
        </div>
        <Modal
          className='couponViewModal'
          show={this.state.show}
          onHide={() => {
            this.handleCloseModal()
          }}
        >
          <Modal.Header>
            <Modal.Title>Coupon</Modal.Title>
          </Modal.Header>
          <Modal.Body className='couponViewModalBody'>
            {this.state.couponMessage}
          </Modal.Body>
          <Modal.Footer>
            <Button
              className='modalCloseButton'
              variant='secondary'
              onClick={this.handleCloseModal}
            >
              Close
            </Button>
            <Button
              className='modalSaveButton'
              variant='primary'
              onClick={this.handleCloseModal}
            >
              Reply
            </Button>
          </Modal.Footer>
        </Modal>
        <div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default ViewCoupons
