import React, { Component, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  getFacilityTypesByHotelId,
  getAllFacilitiesByHotelId,
} from '../../Services/Api/Utilities/Index'
import '../../Assets/styles/css/Layouts/facilities.css'

const Facilities = () => {
  const [searchedParams, setSearchedparams] = useSearchParams()
  const [facilities, setFacilities] = useState(null)
  const [facilityTypes, setFacilityTypes] = useState(null)

  useEffect(() => {
    let hotelId = searchedParams.get('hotel') || ''
    if (hotelId != null) {
      getFacilites()
      getFacilityTypes()
    }
  }, [])

  const getFacilites = async () => {
    const dataModel = {
      hotelId: searchedParams.get('hotel') || '',
    }
    await getFacilityTypesByHotelId(dataModel)
      .then((res) => {
        setFacilityTypes(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getFacilityTypes = async () => {
    const dataModel = {
      id: searchedParams.get('hotel') || '',
    }
    await getAllFacilitiesByHotelId(dataModel)
      .then((res) => {
        setFacilities(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className='mt-4 pt-4' id='hotel-facilities'>
      {facilities != null ? (
        <>
          <h3>Facilities of Furnished apartment at Nawala</h3>
          <div className='container mt-3'>
            <div className='row mb-3 '>
              {facilityTypes.map((facilityType, index) => {
                return (
                  <>
                    <div className='col-md-4  '>
                      <div className='facility-header'>
                        <i class='fas fa-parking'></i>
                        <p>{facilityType.name}</p>
                      </div>
                      <div className='mt-2 '>
                        <p>{facilityType.description}</p>
                        {facilities != null ? (
                          <div className='mt-2'>
                            {facilities.map((facility, index) => {
                              if (
                                facility.facilitytypeFacilityTypeId ==
                                facilityType.facilityTypeId
                              ) {
                                return (
                                  <div className='m-1'>
                                    <i class='fa-solid fa-check'></i>
                                    <span className='ml-2'>
                                      {facility.name}
                                    </span>
                                  </div>
                                )
                              }
                            })}
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </>
                )
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          {' '}
          <div class='alert alert-primary' role='alert'>
            Nothing to display.
          </div>
        </>
      )}
    </div>
  )
}

export default Facilities
