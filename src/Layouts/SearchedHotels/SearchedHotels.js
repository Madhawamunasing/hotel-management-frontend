import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useSearchParams } from 'react-router-dom'
import HashLoader from 'react-spinners/HashLoader'
import '../../Assets/styles/css/Layouts/searchedHotels.css'
import HotelCard from '../../Components/SearchedHotelCard/HotelCard'
import { searchHotelsByRate } from '../../Services/Api/Utilities/Index.js'
import PriceRange from '../leftSideBar/PriceRange'
import StartFilter from '../leftSideBar/StartFilter'
import DarkOverlaybackGround from '../../Components/DarkOverlaybackGround/DarkOverlaybackGround'
const SearchedHotels = (props) => {
  const [loading, setLoading] = useState(false)
  let [color, setColor] = useState('#ffffff')
  const [searchedParams, setSearchedparams] = useSearchParams()
  let [hotels, setHotels] = useState(null)
  const [items, setItems] = useState([])
  const [pageCount, setpageCount] = useState(0)
  const [URLparams, setURLparams] = useState({})
  const [lowerPrice, setLowerPrice] = useState(0)
  const [upperPrice, setUpperPrice] = useState(100000)
  let limit = 10

  useEffect(() => {
    window.scrollTo(0, 0)
    setLoading(true)
  }, [])
  useEffect(() => {
    fetchData(0)
  }, [limit])
  useEffect(() => {
    if (hotels != null) {
      setLoading(false)
    }
  }, [hotels])

  useEffect(() => {
    if (loading) {
      document.getElementById('pagination-div').style.display = 'none'
    } else {
      document.getElementById('pagination-div').style.display = 'block'
    }
  }, [loading])
  useEffect(() => {
    fetchData(0)
  }, [lowerPrice])
  const fetchData = async (page) => {
    setLoading(true)
    const dataModel = {
      location: searchedParams.get('location') || '',
      checkInDate: searchedParams.get('checkin-date') || '',
      checkOutDate: searchedParams.get('checkout-date') || '',
      adult: searchedParams.get('adults') || '',
      children: searchedParams.get('children') || '',
      rooms: searchedParams.get('rooms') || '',
      page: page,
      lowerPrice: lowerPrice,
      upperPrice: upperPrice,
    }
    setURLparams(dataModel)
    await searchHotelsByRate(dataModel).then((data) => {
      setHotels(data.data.rows)
      let totalRows = data.data.count.length
      if (data.status == 200) {
        setLoading(false)
        if (totalRows == 0) {
          setHotels(null)
        }
      }
      setpageCount(Math.ceil(totalRows / limit))
    })
  }
  const handlePageClick = async (data) => {
    let currentPage = data.selected
    fetchData(currentPage)
    window.scrollTo(0, 0)
  }

  return (
    <div>
      <div className='searched-hotel-container hotels pt-2 rounded b-1'>
        <div className='row'>
          <div className='col-lg-3 left-side-bar'>
            <div class='card p-3 left-container'>
              <div className='mb-3'>
                <b>Filter By</b>
              </div>
              <div className='mb-3'>
                <PriceRange
                  setLowerPrice={setLowerPrice}
                  setUpperPrice={setUpperPrice}
                />
              </div>
              <div>{/* <StartFilter /> */}</div>
            </div>
          </div>
          <div className=' col-md-9 searched-hotel '>
            {!loading ? (
              hotels != null ? (
                hotels.map((hotel, index) => {
                  return <HotelCard hotelData={hotel} URLparams={URLparams} />
                })
              ) : (
                <>
                  <div class='alert alert-primary' role='alert'>
                    Nothing to display.
                  </div>
                </>
              )
            ) : (
              <></>
            )}
            <div className='mt-3 pagination-container' id='pagination-div'>
              <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
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
      <DarkOverlaybackGround loading={loading} content={''} />
    </div>
  )
}

export default SearchedHotels
