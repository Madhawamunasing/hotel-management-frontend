import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getReviewByHotelId } from '../../Services/Api/Utilities/Index'
import '../../Assets/styles/css/Layouts/review.css'

const Review = () => {
  const [reviews, setReview] = useState(null)
  const [searchedParams, setSearchedparams] = useSearchParams()
  useEffect(() => {
    getReviews()
  }, [])
  const getReviews = async () => {
    const dataModel = {
      id: searchedParams.get('hotel') || '',
    }
    await getReviewByHotelId(dataModel)
      .then((res) => {
        setReview(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const getStars = (params) => {
    let content = []
    for (let i = 0; i < params; i++) {
      content.push(<i class='fa fa-star' aria-hidden='true'></i>)
    }
    return content
  }
  return (
    <div className='mt-4 pt-4 review-container' id='hotel-review'>
      {/* <h3>Guest reviews</h3>
        <div className='container review-details'>
          <span className='review-rate'>9.6</span>
          <span className='review-count'>79 Reviews</span>
        </div>
        <div className='container'>
          <div className='row '>
            <div className='col-md-4'>
              <div className='container'>Staff</div>
              <div class='progress'>
                <div class='bar' style={{ width: '87%' }}>
                  <p class='percent'>87%</p>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='container'>Cleanliness</div>
              <div class='progress'>
                <div class='bar' style={{ width: '78%' }}>
                  <p class='percent'>78%</p>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='container'>Location</div>
              <div class='progress'>
                <div class='bar' style={{ width: '95%' }}>
                  <p class='percent'>95%</p>
                </div>
              </div>
            </div>
          </div>
          <div className='row '>
            <div className='col-md-4'>
              <div className='container'>Value for money</div>
              <div class='progress'>
                <div class='bar' style={{ width: '75%' }}>
                  <p class='percent'>75%</p>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='container'>Comfort</div>
              <div class='progress'>
                <div class='bar' style={{ width: '85%' }}>
                  <p class='percent'>85%</p>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='container'>Facilities</div>
              <div class='progress'>
                <div class='bar' style={{ width: '98%' }}>
                  <p class='percent'>98%</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      <div>
        <div>
          {' '}
          <section class='review '>
            <h3>What people say about us</h3>

            <div class='cards row '>
              {reviews != null ? (
                reviews.slice(0, 3).map((review, index) => {
                  return (
                    <div class='card col-lg-3 '>
                      <div class='card__shap'>
                        <img
                          src={'/images/defaults/default-profile.png'}
                          alt='person 1'
                          class='card__img'
                        />
                        <figcaption class='card__caption'>Jhon Doe</figcaption>
                      </div>

                      <div class='card__text'>
                        <div class='flex'>
                          {() => {
                            getStars(2)
                          }}
                        </div>
                        <p>{review.review}</p>
                      </div>
                    </div>
                  )
                })
              ) : (
                <>
                  <div class='alert alert-primary' role='alert'>
                    Nothing to display.
                  </div>
                </>
              )}
            </div>
          </section>
          <div>
            {/* <button className='button-23 mt-5 mb-2' role='button'>
              View More
            </button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Review
