import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import HashLoader from 'react-spinners/HashLoader'

import ReviewModel from '../../Components/ReviewModel/ReviewModel.js'

import '../../Assets/styles/css/Pages/reviewPage.css'

import { getReviewByCustomerId } from '../../Services/Api/Utilities/Index.js'

const Review = () => {
  let limit = 3
  const [items, setItems] = useState([])
  const [pageCount, setpageCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [pageNumber, setPageNumber] = useState(0)
  useEffect(() => {
    getReviewDetails(0)
    setLoading(true)
  }, [])

  const handlePageClick = async (data) => {
    setPageNumber(data.selected);
    let currentPage = data.selected
    getReviewDetails(currentPage)
  }

  const getReviewDetails = async (currentPage) => {
    const data = {
      id: localStorage.getItem('user'),
      page: currentPage,
    }
    await getReviewByCustomerId(data)
      .then((response) => {
        const data = response.data
        setItems(data.rows)
        setLoading(false)
        setpageCount(Math.ceil(response.data.count / limit))
      })
      .catch((e) => {
        console.log(e)
      })
  }
  return (
    <div className='container'>
      <div className='row g-3'>
        <div className='col-12 shadow-lg rounded-3 border border-secondary ml-2'>
          <div className='pl-5 pr-5 pb-2'>
            {loading ? (
              <div className='d-flex justify-content-center mx-4 my-4 '>
                <HashLoader
                  loading={loading}
                  size={25}
                  margin={2}
                  color='#00AD5F'
                />
              </div>
            ) : (
              items.map((item) => {
                return (
                  <ReviewModel
                    rating={item.stars}
                    id={item.reviewId}
                    description={item.review}
                    hotelId={item.hotelHotelId}
                    onFresh={
                      () =>{
                        getReviewDetails(pageNumber)
                      }
                      }
                  />
                )
              })
            )}
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
        </div>
      </div>
    </div>
  )
}

export default Review
