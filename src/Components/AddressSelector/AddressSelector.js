import React, { useEffect, useState } from 'react'

const AddressSelector = ({ dis, prov }) => {
  const [province, setProvince] = useState(null)
  const [districts, setDistricts] = useState([])

  useEffect(() => {
    setDistricts(getDistrinct(province || prov))
  }, [province])

  const getDistrinct = (province) => {
    if (province != null) {
      // province = province.trim().toUpperCase()

      if (!ProvinceDistrict[province]) {
        return null
      } else {
        return ProvinceDistrict[province].district
      }
    }
  }
  return (
    <div className='row mt-2'>
      <div className='col-lg-6 mb-2'>
        <select
          class='form-select'
          aria-label='Default select example'
          id='province'
          onChange={() => {
            setProvince(document.getElementById('province').value)
          }}
        >
          {prov != null ? (
            <>
              <option selected>{prov}</option>
            </>
          ) : (
            <>
              <option selected>Select Province</option>
            </>
          )}

          {Object.keys(ProvinceDistrict).map((province) => {
            if (province != prov) {
              return <option value={province}>{province}</option>
            }
          })}
        </select>
      </div>
      <div className='col-lg-6'>
        <select
          class='form-select'
          aria-label='Default select example'
          id='district'
        >
          {dis != null ? (
            <>
              <option selected>{dis}</option>
            </>
          ) : (
            <>
              <option selected>Select District</option>
            </>
          )}
          {districts != null ? (
            districts.map((district) => {
              if (district != dis) {
                return <option value={district}>{district}</option>
              }
            })
          ) : (
            <></>
          )}
        </select>
      </div>
    </div>
  )
}

export default AddressSelector

const ProvinceDistrict = {
  Eastern: {
    district: ['Ampara', 'Batticaloa', 'Trincomalee'],
  },
  'North Central': {
    district: ['Anuradhapura', 'Polonnaruwa'],
  },
  Uva: {
    district: ['Badulla', 'Moneragala'],
  },
  Western: {
    district: ['Colombo', 'Gampaha', 'Kalutara'],
  },
  Southern: {
    district: ['Galle', 'Hambantota', 'Matara'],
  },
  Northern: {
    district: ['Jaffna', 'Kilinochchi', 'Mannar', 'Mullativu', 'Vavuniya'],
  },
  Central: {
    district: ['Kandy', 'Matale', 'Nuwara Eliya'],
  },
  Sabaragamuwa: {
    district: ['Kegalle', 'Rathnapura'],
  },
  'North Western': {
    district: ['Kurunegala', 'Puttalam'],
  },
}
