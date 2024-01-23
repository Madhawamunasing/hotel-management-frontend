import React, { useEffect, useState } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'
import HashLoader from 'react-spinners/HashLoader'
import { getPastBookigsByHotelAdminId } from '../../../Services/Api/Utilities/Index.js'
const PastBookings = () => {
  let limit = 5
  const [loading, setLoading] = useState(true)
  const [bookings, setBookings] = useState(null)
  const [pageCount, setpageCount] = useState(0)

  useEffect(() => {
    getBookings(0)
    setLoading(true)
  }, [limit])
  const getBookings = async (currentPage) => {
    const dataModel = {
      id: localStorage.getItem('user'), //user id
      page: currentPage,
    }
    await getPastBookigsByHotelAdminId(dataModel)
      .then((res) => {
        if (res.status == 200) {
          setBookings(res.data.rows)
          setLoading(false)
          setpageCount(Math.ceil(res.data.count / limit))
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handlePageClick = async (data) => {
    let currentPage = data.selected

    getBookings(currentPage)
  }

  const renderTooltip = (props) => (
    <Tooltip id='button-tooltip' {...props}>
      Click here to view more details
    </Tooltip>
  )
  return (
    <div>
      <div>
        {/* {items.map((item) => {
          return (
            <div key={item.id} className='col-sm-6 col-md-12 v my-2'>
              <div className='card shadow-sm w-100' style={{ minHeight: 150 }}>
                <div className='card-body'>
                  <h5 className='card-title text-center h2'>Id :{item.id} </h5>
                  <h6 className='card-subtitle mb-2 text-muted text-center'>
                    {item.email}
                  </h6>
                  <p className='card-text'>{item.body}</p>
                </div>
              </div>
            </div>
          )
        })} */}
        <div className='mt-2'>
          <div className='table-web'>
            <table class='table'>
              <thead class='b-priamry t-light'>
                <tr>
                  <th scope='col'>Booking ID</th>
                  <th scope='col'>Hotel Name</th>
                  <th scope='col'>To be checking</th>
                  {/* <th scope='col'>Status</th> */}
                  <th scope='col'>Info</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <>
                    <tr>
                      <td colspan='4'>
                        <div className='booking-history-loader'>
                          <HashLoader
                            loading={loading}
                            size={25}
                            margin={2}
                            color='#00AD5F'
                          />
                        </div>
                      </td>
                    </tr>
                  </>
                ) : (
                  bookings.map((item, i) => {
                    // paymentStatus(item.bookingId)
                    return (
                      <tr>
                        <th scope='row'>B-{item.bookingId}</th>
                        <td>{item.hotel.name}</td>
                        <td>
                          {item.checkInDate.split('T')[0]} to{' '}
                          {item.checkOutDate.split('T')[0]}{' '}
                        </td>
                        {/* <td>{payStatus}</td> */}
                        <td>
                          {/* <i
                          class='fa fa-info-circle'
                          style={{ fontSize: '1.5rem' }}
                          aria-hidden='true'
                        ></i> */}
                          <OverlayTrigger
                            placement='right'
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip}
                          >
                            <Link to={`/seller/booking/${item.bookingId}`}>
                              <i
                                class='fa fa-info-circle'
                                style={{ fontSize: '1.5rem' }}
                                aria-hidden='true'
                              ></i>
                            </Link>
                          </OverlayTrigger>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className='table-mob'>
            <table class='table'>
              <thead class='b-primary'>
                <tr>
                  <th scope='col'>Booking ID</th>
                  <th scope='col'>Hotel Name</th>

                  <th scope='col'>Info</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colspan='4'>
                      <div className='booking-history-loader'>
                        <HashLoader
                          loading={loading}
                          size={25}
                          margin={2}
                          color='#00AD5F'
                        />
                      </div>
                    </td>
                  </tr>
                ) : (
                  bookings.map((item) => {
                    return (
                      <tr>
                        <th scope='row'>B-{item.bookingId}</th>
                        <td>{item.hotel.name}</td>

                        <td>
                          <OverlayTrigger
                            placement='left'
                            delay={{ show: 250, hide: 250 }}
                            overlay={renderTooltip}
                          >
                            <Link to={`/seller/booking/${item.bookingId}`}>
                              <i
                                class='fa fa-info-circle'
                                style={{ fontSize: '1.5rem' }}
                                aria-hidden='true'
                                href={'/booking-history/details'}
                              ></i>
                            </Link>
                          </OverlayTrigger>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={'pagination justify-content-center'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        activeClassName={'active'}
      />
    </div>
  )
}

export default PastBookings
