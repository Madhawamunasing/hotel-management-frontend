import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import '../../Assets/styles/css/Layouts/payment.css'
import PaymentOptions from '../../Layouts/Payment/PaymentOptions.js'
import { getAllPaymentsBybookingId } from '../../Services/Api/Utilities/Index.js'
const SelectPayment = ({ amount }) => {
  const [searchedParams, setSearchedparams] = useSearchParams()
  useEffect(() => {
    if (searchedParams.get('edit') || '') {
      getpaymentdetails()
    }
  }, [])
  const [paymentMethod, setPaymentMethod] = useState('')
  const getpaymentdetails = async () => {
    const dataModel = {
      id: searchedParams.get('booking') || '',
    }
    await getAllPaymentsBybookingId(dataModel)
      .then((res) => {
        if (res.status == 200) {
          let method = res.data[0].paymenttype
          document.getElementById(method).checked = true
          setPaymentMethod(method)
        }
      })
      .catch((err) => {
        //console.log(err)
      })
  }
  return (
    <div className='payment-gateway-interface'>
      <div className='select-payment-method ml-5 pl-5'>
        <div class='form-check'>
          <div className='payment-methods'>
            <input
              class='form-check-input'
              type='radio'
              name='flexRadioDefault'
              id='default'
              onClick={() => {
                setPaymentMethod('default')
              }}
            />

            <label class='form-check-label' for='flexRadioDefault2'>
              At the property
            </label>
          </div>
        </div>
        <div class='form-check'>
          <div className='payment-methods'>
            <input
              class='form-check-input'
              type='radio'
              name='flexRadioDefault'
              id='flexRadioDefault2'
              onClick={() => {
                setPaymentMethod('paypal')
              }}
            />
            <img src={'/images/PaymentGateway/paypal.jpg'} alt='paypal' />
            <label class='form-check-label' for='flexRadioDefault2'>
              PayPal
            </label>
          </div>
        </div>
        {/* <div class='form-check'>
          <div className='payment-methods'>
            <input
              class='form-check-input'
              type='radio'
              name='flexRadioDefault'
              id='flexRadioDefault2'
              onClick={() => {
                setPaymentMethod('payhere')
              }}
            />
            <img src={'/images/PaymentGateway/payHere.png'} alt='payHere' />
            <label class='form-check-label' for='flexRadioDefault2'>
              PayHere
            </label>
          </div>
        </div> */}
        <div class='form-check'>
          <div className='payment-methods'>
            <input
              class='form-check-input'
              type='radio'
              name='flexRadioDefault'
              id='flexRadioDefault2'
              onClick={() => {
                setPaymentMethod('gpay')
              }}
            />
            <img src={'/images/PaymentGateway/gPay.png'} alt='payHere' />
            <label class='form-check-label' for='flexRadioDefault2'>
              G Pay
            </label>
          </div>
        </div>
      </div>
      <PaymentOptions method={paymentMethod} payment={amount} />
    </div>
  )
}

export default SelectPayment
