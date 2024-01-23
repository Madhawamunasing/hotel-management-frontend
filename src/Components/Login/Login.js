import React, { Component, useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage'
import { useNavigate } from 'react-router-dom'
import { userLogin, updateUserById } from '../../Services/Api/Utilities/Index'
import { toast } from 'react-toastify'
import DarkOverlaybackGround from '../DarkOverlaybackGround/DarkOverlaybackGround'
import '../../Assets/styles/css/Components/login.css'

const Login = ({ setLogin, setLoggedin }) => {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
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
  const updateRefreshToken = async () => {
    const uId = localStorage.getItem('user')
    const dataModal = {
      refreshToken: localStorage.getItem('rtoken'),
    }
    await updateUserById(uId, dataModal)
      .then((res) => {})
      .catch((err) => {
        console.log(err)
      })
  }

  const loginHandle = async (event) => {
    event.preventDefault()
    setContent('sign in to your account')
    setLoading(true)
    const dataModel = {
      email: document.getElementById('loginEmail2').value,
      password: document.getElementById('loginPassword2').value,
    }
    await userLogin(dataModel)
      .then((res) => {
        if (res.data.status) {
          localStorage.setItem('accessToken', res.data.accessToken)
          localStorage.setItem('refreshToken', res.data.refreshToken)
          localStorage.setItem('user', res.data.userId)
          localStorage.setItem('currency', res.data.currency)
          localStorage.setItem('session', true)
          secureLocalStorage.setItem('admin', res.data.admin)
          secureLocalStorage.setItem('hotelAdmin', res.data.hotelAdmin)
          secureLocalStorage.setItem('customer', res.data.customer)
          setLoggedin(true)
          notifySuccess('You have loggedin successfully')
        } else {
          notifyError('User name or password is incorrect')
        }
      })
      .catch((err) => {
        console.log(err)
      })

    setLoading(false)
    setLogin(false)
    navigate('/')
  }
  return (
    <div className='modal-body login-container'>
      <form className='contact-form form-validate4'>
        <div className='form-group'>
          <form class='login'>
            <h2>Login</h2>
            <input
              type='text'
              placeholder='Username'
              id='loginEmail2'
              required
            />
            <input
              type='password'
              placeholder='Password'
              id='loginPassword2'
              required
            />
            <button type='submit' onClick={loginHandle}>
              Login
            </button>
          </form>
        </div>
      </form>
      <DarkOverlaybackGround loading={loading} content={content} />
    </div>
  )
}

export default Login
