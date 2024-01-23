import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import '../../Assets/styles/css/Layouts/bookingVAS.css'
import NewTable from '../../Components/Table/SearchPaginationTable'
import DialogModal from '../../Components/VasModal/VasModal.js'
import { getVasByHotelId } from '../../Services/Api/Utilities/Index.js'
import SideSummary from '../Payment/SideSummary'
import { getTotalAmountByBookingId } from '../../Services/Api/Utilities/Index'
const BookingVAS = () => {
  const [searchedParams, setSearchedparams] = useSearchParams()
  const [vas, setVAS] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [isUpdate, setUpdate] = useState(false)
  const [totalPay, setTotalPay] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    let hotelId = searchedParams.get('hotel') || ''
    if (hotelId != 0) {
      getAllVAS(hotelId)
    }
    setUpdate(searchedParams.get('edit') || '')
  }, [vas.length])

  const getTotPaymet = async () => {
    const dataModel = {
      id: searchedParams.get('booking'),
    }
    await getTotalAmountByBookingId(dataModel)
      .then((res) => {
        console.log(res)
        setTotalPay(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const getAllVAS = async (hotelId) => {
    const dataModel = {
      id: hotelId,
    }
    await getVasByHotelId(dataModel)
      .then((res) => {
        setVAS(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <div className='container'>
        <div className='row user-details '>
          <div className='col-md-4 col-lg-3 '>
            <SideSummary getTotPaymet={getTotPaymet} totalPay={totalPay} />
          </div>
          <div className='col-md-7 col-lg-8  '>
            {/* <h4>Do you expect other services from us?</h4>  */}
            <DialogModal />
            <h4>
              We offer many value added services for you convenience.If you need
              , you can select one or more sevices.{' '}
              <small>Charges can be vary.</small>
            </h4>
            <NewTable vas={vas} getTotPaymet={getTotPaymet} />
            <div className='next-container'>
              <button
                className='previous-button btn btn-primary'
                onClick={() => {
                  navigate(-1)
                }}
              >
                {'<'} Previous!
              </button>
              {isUpdate ? (
                <>
                  <Link
                    to={`/booking/details?booking=${
                      searchedParams.get('booking') || ''
                    }&edit=true`}
                    className='next-link'
                  >
                    <button className='next-button btn btn-primary'>
                      <> Update my booking! {'>'}</>
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={`/booking/details?hotelId=${
                      searchedParams.get('hotel') || ''
                    }&booking=${searchedParams.get('booking') || ''}`}
                    className='next-link'
                  >
                    <button className='next-button btn btn-primary'>
                      <> Complete the booking! {'>'}</>
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingVAS
