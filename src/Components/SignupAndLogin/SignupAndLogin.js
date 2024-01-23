import React, { Component, useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage'
import { userLogin, addUser } from '../../Services/Api/Utilities/Index'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { SendSignUpEmail } from '../../Services/Gmail/EmailJs'
import DarkOverlaybackGround from '../DarkOverlaybackGround/DarkOverlaybackGround'
import '../../Assets/styles/css/Components/signupAndLogin.css'

const SignupAndLogin = ({ setSign, setLoggedin, setLogin }) => {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    toast.configure()
    const signUpButton = document.getElementById('signUp')
    const signInButton = document.getElementById('signIn')
    const container = document.getElementById('container')

    signUpButton.addEventListener('click', () => {
      container.classList.add('right-panel-active')
    })

    signInButton.addEventListener('click', () => {
      container.classList.remove('right-panel-active')
    })
  }, [])
  const notifyError = (message) => {
    toast.error(message)
  }
  const notifySuccess = (message) => {
    toast.success(message)
  }
  const loginHandle = async (event) => {
    event.preventDefault()
    setContent('sign in to you account')
    setLoading(true)
    const dataModel = {
      email: document.getElementById('loginEmail').value,
      password: document.getElementById('loginPassword').value,
    }
    await userLogin(dataModel)
      .then((res) => {
        if (res.data.status) {
          localStorage.setItem('accessToken', res.data.accessToken)
          localStorage.setItem('refreshToken', res.data.refreshToken)
          localStorage.setItem('user', res.data.userId)
          localStorage.setItem('currency', res.data.currency)
          localStorage.setItem('session', true)
          // secureLocalStorage.setItem('user', res.data.userId)
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
        navigate('/')
      })
    setLoading(false)
    setLogin(false)
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
            console.log(res)
            notifySuccess('Successfully created your account.')
            setTimeout(() => {
              SendSignUpEmail(event.target)
            }, 2000)
            setLoading(false)
            setSign(false)
            navigate('/')
          } else {
            notifyError('This email is aleady taken')
            document.getElementById('signupEmail').value = null
            document.getElementById('signupPassword').value = null
            document.getElementById('reEnterPassword').value = null
            setLoading(false)
          }
        })
        .catch((err) => {
          console.log('err')
          setLoading(false)
          setSign(false)
          navigate('/')
        })
    } else {
      document.getElementById('signupPassword').value = null
      document.getElementById('reEnterPassword').value = null
      notifyError('password comfirmation is incorrect')
      setLoading(false)
    }
  }
  return (
    <div className='login-model'>
      <div class='container' id='container'>
        <div class='form-container sign-up-container'>
          <form onSubmit={signUpHandle}>
            <h1>Create Account</h1>
            <div class='social-container'>
              {/* <a href='#' class='social'>
                <i class='fab fa-facebook-f'></i>
              </a>
              <a href='#' class='social'>
                <i class='fab fa-google-plus-g'></i>
              </a>

              <a href='#' class='social'>
                <i class='fab fa-linkedin-in'></i>
              </a> */}
            </div>
            {/* <span>or use your email for registration</span> */}

            <input
              type='text'
              placeholder='Email'
              id='signupEmail'
              name='email'
              required
            />
            <input
              type='password'
              placeholder='password'
              id='signupPassword'
              required
            />
            <input
              type='password'
              placeholder='Re enter Password'
              id='reEnterPassword'
              required
            />
            <button type='submit'>Sign Up</button>
          </form>
        </div>
        <div class='form-container sign-in-container'>
          <form onSubmit={loginHandle}>
            <h1>Sign in</h1>
            <div class='social-container'>
              {/* <a href='#' class='social'>
                <i class='fab fa-facebook-f'></i>
              </a>
              <a href='#' class='social'>
                <i class='fab fa-google-plus-g'></i>
              </a>
              <a href='#' class='social'>
                <i class='fab fa-linkedin-in'></i>
              </a> */}
            </div>
            {/* <span>or use your account</span> */}
            <input type='email' placeholder='Email' id='loginEmail' required />
            <input
              type='password'
              placeholder='Password'
              id='loginPassword'
              required
            />
            {/* <a href='#'>Forgot your password?</a> */}
            <button type='submit'>Sign In</button>
          </form>
        </div>
        <div class='overlay-container'>
          <div class='overlay'>
            <div class='overlay-panel overlay-left'>
              <h1>Welcome !</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button class='ghost' id='signIn'>
                Sign In
              </button>
            </div>
            <div class='overlay-panel overlay-right'>
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button class='ghost' id='signUp'>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <DarkOverlaybackGround loading={loading} content={content} />
    </div>
  )
}

export default SignupAndLogin
