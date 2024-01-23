import { MDBDataTable } from 'mdbreact'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import DarkOverlaybackGround from '../../Components/DarkOverlaybackGround/DarkOverlaybackGround'
import Navbars from '../../Components/Navbar/Navbar'
import {
  createFacility,
  createFacilityType,
  deleteFacilityById,
  deleteFacilityTypeById,
  getAllFacilitiesByHotelId,
  getFacilityTypesByHotelId,
} from '../../Services/Api/Utilities/Index.js'
import Footer from '../Footer/Footer'

const Facilities = () => {
  const [loading, setLoading] = useState(false)
  let [facilityTypes, setFacilityTypes] = useState([])
  let [facilities, setFacilities] = useState([])
  let [facilityType, setFacilityType] = useState(null)
  const [finishedLoarding, setFinishedLoarding] = useState(false)
  const [searchedParams, setSearchedparams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    getfacilityTypes()
    getFacilities()
    toast.configure()
  }, [])

  const notifyError = (message) => {
    toast.error(message)
  }
  const notifySuccess = (message) => {
    toast.success(message)
  }
  const getfacilityTypes = async () => {
    const dataModal = {
      hotelId: searchedParams.get('id') || '',
    }
    await getFacilityTypesByHotelId(dataModal)
      .then((res) => {
        setFacilityTypes(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const getFacilities = async () => {
    const dataModal = {
      id: searchedParams.get('id') || '',
    }
    await getAllFacilitiesByHotelId(dataModal)
      .then((res) => {
        setFacilities(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleSubmitCreateFacilityType = async (event) => {
    event.preventDefault()
    const dataModal = {
      name: document.getElementById('facility_type').value,
      description: 'test description',
      hotelId: searchedParams.get('id') || '',
    }
    await createFacilityType(dataModal)
      .then((res) => {
        if (res.status === 200) {
          getfacilityTypes()
          getFacilities()
          notifySuccess('New facility type added')
        } else {
          notifyError('Some thing went wrong')
        }
      })
      .catch((err) => {
        console.log(err)
        notifyError('Some thing went wrong')
      })
    document.getElementById('facility_type').value = null
  }

  const handleSubmitCreateFacility = async (event) => {
    event.preventDefault()
    const dataModal = {
      name: document.getElementById('facility').value,
      facilityTypeId: facilityType,
      hotelId: searchedParams.get('id') || '',
    }
    await createFacility(dataModal)
      .then((res) => {
        if (res.status === 200) {
          getfacilityTypes()
          getFacilities()
          notifySuccess('New facility added')
        } else {
          notifyError('Some thing went wrong')
        }
      })
      .catch((err) => {
        console.log(err)
        notifyError('Some thing went wrong')
      })
    document.getElementById('facility').value = null
  }
  const removeFacility = async (facilityId) => {
    await deleteFacilityById(facilityId)
      .then((res) => {
        if (res.status === 200) {
          getfacilityTypes()
          getFacilities()
          notifySuccess('Deleted facility')
        } else {
          notifyError('Some thing went wrong')
        }
      })
      .catch((err) => {
        console.log(err)
        notifyError('Some thing went wrong')
      })
  }
  const removeFacilityType = async (facilityTypeId) => {
    await deleteFacilityTypeById(facilityTypeId)
      .then((res) => {
        if (res.status === 200) {
          getfacilityTypes()
          getFacilities()
          notifySuccess('Deleted facility type')
        } else {
          notifyError('Some thing went wrong')
        }
      })
      .catch((err) => {
        console.log(err)
        notifyError('Some thing went wrong')
      })
  }

  const data = {
    columns: [
      {
        label: 'Facility ID',
        field: 'ServiceID',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Service Name',
        field: 'name',
        sort: 'asc',
        width: 270,
      },
      {
        label: 'Description',
        field: 'description',
        sort: 'asc',
        width: 270,
      },
    ],
    rows: facilityTypes,
  }
  data.rows = data.rows.map((obj, i) => {
    return {
      ...obj,
      ServiceID: i + 1,
      name: (
        <>
          <div className='row'>
            <div className='col-8'>{obj.name}</div>
            <div className='col-4'>
              <button>
                <a
                  onClick={() => {
                    removeFacilityType(obj.facilityTypeId)
                  }}
                >
                  {' '}
                  <i class='far fa-trash-alt'></i>
                </a>
              </button>
            </div>
          </div>
        </>
      ),
      description: (
        <>
          <ul>
            {facilities.map((item, i) => {
              if (obj.facilityTypeId == item.facilitytypeFacilityTypeId) {
                return (
                  <>
                    <li>
                      <div className='row ml-1'>
                        <div className='col-8'>{item.name}</div>
                        <div className='col-4'>
                          <button>
                            <a
                              onClick={() => {
                                removeFacility(item.facilityId)
                              }}
                            >
                              {' '}
                              <i class='far fa-trash-alt mt-1'></i>
                            </a>
                          </button>
                        </div>
                      </div>{' '}
                    </li>
                  </>
                )
              }
            })}
          </ul>
          <form onSubmit={handleSubmitCreateFacility}>
            <div className='row mt-3  ml-1'>
              <div class='form-group col-sm-8 '>
                <input
                  type='text'
                  class='form-control first_name'
                  placeholder='Enter new facility '
                  name='facility'
                  id='facility'
                  required
                />
              </div>
              <div class='col-sm-4 mt-2'>
                <button
                  type='submit'
                  className=' '
                  onClick={() => {
                    setFacilityType(obj.facilityTypeId)
                  }}
                >
                  <i class='fa fa-plus-circle ' aria-hidden='true'></i>
                </button>
              </div>
            </div>
          </form>
        </>
      ),
    }
  })
  return (
    <div>
      <Navbars />
      <div className='upload-container'>
        <div class=' step-indicator '>
          <ul class='list-unstyled multi-steps'>
            <li>Basic Information</li>
            <li>Upload hotel Image</li>
            <li>Upload souvenir Images</li>
            <li>Add value added servces</li>
            <li class='is-active'>Facilities</li>
          </ul>
        </div>
        <div className='container mt-5'>
          <div>
            <small id='emailHelp' class='form-text text-muted'>
              Important !
            </small>
            You have to add facility and fill other required fields.Then you can
            finish your propoerty.
          </div>

          <form onSubmit={handleSubmitCreateFacilityType}>
            <div className='row mt-3'>
              <div class='form-group col-lg-3 '>
                <input
                  type='text'
                  class='form-control first_name'
                  placeholder='Enter faciliity type'
                  name='facility_type'
                  id='facility_type'
                  required
                />
              </div>
              <div class='col-lg-2'>
                <button
                  type='submit'
                  class='btn btn-primary'
                  style={{ margin: '0px', width: '100%' }}
                >
                  <i class='fas fa-plus-circle '></i> Add new
                </button>
              </div>
            </div>
          </form>
          <MDBDataTable striped bordered small data={data} />
          <div className='next-container'>
            <button
              className='previous-button btn btn-primary'
              onClick={() => {
                navigate(-1)
              }}
            >
              {'<'} Previous!
            </button>
            {true ? (
              <button
                type='submit'
                className='next-button btn btn-primary'
                onClick={() => {
                  setFinishedLoarding(true)
                  setTimeout(() => {
                    setFinishedLoarding(false)
                    const hotelId = searchedParams.get('id') || ''
                    navigate(`/seller/hotels`)
                  }, 3000)
                }}
              >
                Finish listing! {'>'}
              </button>
            ) : (
              <>
                <button
                  type='submit'
                  className='next-button btn btn-primary'
                  disabled
                >
                  Finish listing! ! {'>'}
                </button>
              </>
            )}
          </div>
        </div>
        <div className='footer-div'>
          <Footer />
        </div>
      </div>
      <DarkOverlaybackGround
        loading={finishedLoarding}
        content={'Finalize your listing.'}
      />
    </div>
  )
}

export default Facilities
