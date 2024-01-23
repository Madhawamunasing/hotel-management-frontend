import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import '../../Assets/styles/css/Components/signupAndLogin.css'
import DarkOverlaybackGround from '../../Components/DarkOverlaybackGround/DarkOverlaybackGround'
import Footer from '../../Layouts/Footer/Footer'
import { addUser, refferalValidate } from '../../Services/Api/Utilities/Index'
import { SendSignUpEmail } from '../../Services/Gmail/EmailJs'
const SharedSignUp = () => {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchedParams, setSearchedparams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    toast.configure()
    const signUpButton = document.getElementById('signUp')
    const container = document.getElementById('container')
    signUpButton.addEventListener('click', () => {
      container.classList.add('right-panel-active')
    })
    // console.log(searchedParams.get('token') || '')
  }, [])
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
            validateRefferal()
            setLoading(false)
            localStorage.clear()
            setTimeout(() => {
              SendSignUpEmail(event.target)
            }, 2000)
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
          navigate('/')
        })
    } else {
      document.getElementById('signupPassword').value = null
      document.getElementById('reEnterPassword').value = null
      notifyError('password comfirmation is incorrect')
      setLoading(false)
    }
  }
  const validateRefferal = async () => {
    const dataModel = {
      token: searchedParams.get('token') || '',
    }
    await refferalValidate(dataModel)
      .then((data) => {})
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div>
      <div className='login-model shared-model'>
        <div class='container' id='container'>
          <div class='form-container '>
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
              <span>or use your email for registration</span>

              <input
                type='text'
                placeholder='Email'
                id='signupEmail'
                required
                name='email'
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

          <div class='overlay-container'>
            <div class='overlay'>
              <div class='overlay-panel overlay-right'>
                <h1>Welcome !</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
              </div>
              <div class='overlay-panel overlay-left'>
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
      <div className='footer-div'>
        <Footer />
      </div>
    </div>
  )
}

export default SharedSignUp
