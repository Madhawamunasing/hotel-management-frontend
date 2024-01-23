import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import DarkOverlaybackGround from '../../Components/DarkOverlaybackGround/DarkOverlaybackGround'
import Navbars from '../../Components/Navbar/Navbar'
import ValueAddedSevicesTable from '../../Components/Table/ValueAddedSevicesTable'
import { addValueAddedServices } from '../../Services/Api/Utilities/Index.js'
import Footer from '../Footer/Footer.js'
const AddValueAddedServices = () => {
  const [loading, setLoading] = useState(false)
  const [searchedParams, setSearchedparams] = useSearchParams()
  const [finished, setFinished] = useState(false)

  const navigate = useNavigate()
  useEffect(() => {
    toast.configure()
  }, [])

  const notifyError = (message) => {
    toast.error(message)
  }
  const notifySuccess = (message) => {
    toast.success(message)
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    const dataModel = {
      name: document.getElementsByName('service_name')[0].value,
      rate: document.getElementsByName('service_rate')[0].value,
      hotelId: searchedParams.get('id') || '',
    }

    await addValueAddedServices(dataModel)
      .then((res) => {
        document.getElementsByName('service_name')[0].value = ''
        document.getElementsByName('service_rate')[0].value = ''
        notifySuccess('successfully added services')
      })
      .catch((err) => {
        console.log(err)
        notifyError('Some thing went wrong')
      })
    setLoading(false)
  }

  return (
    <div>
      <Navbars />
      <div className='upload-container'>
        <div class=' step-indicator '>
          <ul class='list-unstyled multi-steps'>
            <li>Basic Information</li>
            <li>Upload hotel Image</li>
            <li>Upload souvenir Images</li>
            <li class='is-active'>Add value added servces</li>
            <li>Facilities</li>
          </ul>
        </div>
        <div className='container mt-5'>
          <div>
            <small id='emailHelp' class='form-text text-muted'>
              Important !
            </small>
            You have to add 3 minimum value added services and fill other
            required fields.Then you can finish your propoerty.
          </div>
          <form onSubmit={handleSubmit}>
            <div className='row mt-3'>
              <div class='form-group col-lg-3 '>
                <input
                  type='text'
                  class='form-control first_name'
                  placeholder='Enter service name'
                  name='service_name'
                  required
                />
              </div>
              <div class='form-group col-lg-3'>
                <input
                  type='number'
                  class='form-control last_name'
                  placeholder='Enter service rate'
                  name='service_rate'
                  required
                />
              </div>
              <div class='col-lg-2'>
                <button
                  type='submit'
                  class='btn btn-primary'
                  style={{ margin: '0px', width: '100%' }}
                >
                  <i class='fas fa-plus-circle'></i> Add new
                </button>
              </div>
            </div>
          </form>
          <ValueAddedSevicesTable loading={loading} setFinished={setFinished} />
          <div className='next-container'>
            <button
              className='previous-button btn btn-primary'
              // onClick={() => {
              //   navigate(-1)
              // }}
            >
              {'<'} Previous!
            </button>
            {finished ? (
              <button
                type='submit'
                className='next-button btn btn-primary'
                onClick={() => {
                  const hotelId = searchedParams.get('id') || ''
                  navigate(`/seller/hotel/facilities?id=${hotelId}`)
                }}
              >
                Next ! {'>'}
              </button>
            ) : (
              <>
                <button
                  type='submit'
                  className='next-button btn btn-primary'
                  disabled
                >
                  Next ! {'>'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <DarkOverlaybackGround
        loading={loading}
        content={'Adding value added service'}
      />

      <Footer />
    </div>
  )
}

export default AddValueAddedServices
