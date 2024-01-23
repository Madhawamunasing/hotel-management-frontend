import React, { useRef, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { pay } from '../Api/Utilities/Index.js'
export default function Paypal({ amount }) {
  const paypal = useRef()
  let navigate = useNavigate()
  const [searchedParams, setSearchedparams] = useSearchParams()

  useEffect(() => {
    toast.configure()
  }, [])

  function notify(message) {
    toast.success(message)
    navigate('../booking-history')
  }
  const payBooking = async () => {
    console.log('called')
    const dataModel = {
      paymenttypeId: 16,
      bookingId: searchedParams.get('booking') || '',
      payment: amount,
    }
    await pay(dataModel)
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                description: 'BookNow.lk payment',
                amount: {
                  currency_code: 'USD',
                  value: amount.toFixed(2),
                },
              },
            ],
          })
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture()
          if ((order.status = 'COMPLETED')) {
            console.log('COMPLETED')
            payBooking()
            notify('Payment was successfully finished!')
          }
        },
        onError: (err) => {
          console.log(err)
          notify('Payment was not successfull')
        },
      })
      .render(paypal.current)
  }, [])

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  )
}
