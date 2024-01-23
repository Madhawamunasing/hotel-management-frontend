import { MDBDataTable, MDBIcon } from 'mdbreact'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  getVASByBookingId,
  subscribeVAS,
  unSubscribeVAS,
} from '../../Services/Api/Utilities/Index.js'
const NewTable = ({ vas, getTotPaymet }) => {
  const [searchedParams, setSearchedparams] = useSearchParams()
  const [subscribedVAS, setSubscribedVAS] = useState([])
  useEffect(() => {
    getAllVAS()
    toast.configure()
  }, [])
  const data = {
    columns: [
      {
        label: 'No',
        field: 'index',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Description',
        field: 'name',
        sort: 'asc',
        width: 270,
      },
      {
        label: 'Rate',
        field: 'rate',
        sort: 'asc',
        width: 200,
      },
      {
        label: 'Add',
        field: 'add',
        sort: 'asc',
        width: 100,
      },
    ],
    rows: vas,
  }
  function notify(message) {
    toast.success(message)
  }
  const getAllVAS = async () => {
    const datModel = {
      id: searchedParams.get('booking') || '',
    }

    await getVASByBookingId(datModel)
      .then((response) => {
        setSubscribedVAS(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const addVAS = async (vasid) => {
    const datModel = {
      bookingId: searchedParams.get('booking') || '',
      vasId: vasid,
    }

    await subscribeVAS(datModel)
      .then((response) => {
        getTotPaymet()
        getAllVAS()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const removeVAS = async (vasid) => {
    const params = [searchedParams.get('booking') || '', vasid]

    await unSubscribeVAS(params)
      .then((response) => {
        getAllVAS()
        getTotPaymet()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const ifExcitingVAS = (vasId) => {
    for (let i = 0; i < subscribedVAS.length; i++) {
      if (vasId == subscribedVAS[i].vasId) {
        return false
      }
    }
    return true
  }
  data.rows = data.rows.map((obj, i) => {
    if (ifExcitingVAS(obj.vasId)) {
      return {
        ...obj,
        index: i + 1,
        add: (
          <button
          // type='button'
          // class='btn btn-primary'
          // style={{
          //   fontSize: 'xx-small',
          //   height: '2rem',
          // }}
          // onclick={subscribeVAS(1)}
          >
            <a
              onClick={() => {
                addVAS(obj.vasId)
                notify('You have subscribed value added service successfully.')
              }}
            >
              {' '}
              <MDBIcon icon='cart-arrow-down' /> Subscribe
            </a>
          </button>
        ),
      }
    } else {
      return {
        ...obj,
        index: i + 1,
        add: (
          <button
          // type='button'
          // class='btn btn-primary'
          // style={{
          //   fontSize: 'xx-small',
          //   height: '2rem',
          // }}
          // onclick={subscribeVAS(1)}
          >
            <a
              onClick={() => {
                removeVAS(obj.vasId)
                notify(
                  'You have unsubscribed value added service successfully.'
                )
              }}
            >
              {' '}
              <MDBIcon icon='trash-alt' /> Unsubscribe
            </a>
          </button>
        ),
      }
    }
  })

  return <MDBDataTable striped bordered small data={data} />
}

export default NewTable
