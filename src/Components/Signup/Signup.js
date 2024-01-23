import React, { Component, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { addUser } from '../../Services/Api/Utilities/Index'
import DarkOverlaybackGround from '../DarkOverlaybackGround/DarkOverlaybackGround'
import '../../Assets/styles/css/Components/login.css'

const Signup = ({ setSign, setLoggedin, setLogin }) => {
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const notifyError = (message) => {
    toast.error(message)
  }
  const notifySuccess = (message) => {
    toast.success(message)
  }
  const signUpHandle = async (event) => {
    event.preventDefault()
    setContent('Creating your account')
    setLoading(true)
    let password = document.getElementById('signupPassword').value
    let repassword = document.getElementById('reEnterPassword').value
    if (password === repassword) {
      const dataModel = {
        email: document.getElementById('signupEmail').value,
        password: document.getElementById('signupPassword').value,
      }
      await addUser(dataModel)
        .then((res) => {
          if (res.data) {
            notifySuccess(
              'Successfully created your account and please check you email to verify the account'
            )
          } else {
            notifyError('This email is aleady taken')
          }
        })
        .catch((err) => {
          console.log('err')
        })
    } else {
      notifyError('password comfirmation is incorrect')
    }
    setLoading(false)
    setSign(false)
    navigate('/')
  }
  return (
    <div className='modal-body signup-container'>
      <form className='contact-form form-validate4' novalidate='novalidate'>
        <div className='form-group'>
          <form class='login'>
            <h2>Signup</h2>
            <input type='text' placeholder='Email' id='signupEmail' required />
            <input
              type='password'
              placeholder='signup'
              id='signupPassword'
              required
            />
            <input
              type='password'
              placeholder='Re enter Password'
              id='reEnterPassword'
              required
            />
            <button type='submit' onClick={signUpHandle}>
              Signup
            </button>
          </form>
        </div>
      </form>
      <DarkOverlaybackGround loading={loading} content={content} />
    </div>
  )
}

export default Signup
