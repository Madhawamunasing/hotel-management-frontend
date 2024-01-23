import React, { Component, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'
import { Dropdown, Nav, Container, Button } from 'react-bootstrap'
import Modal from 'react-responsive-modal'
import { toast } from 'react-toastify'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import SignupAndLogin from '../SignupAndLogin/SignupAndLogin'
import LoginSignup from '../../Layouts/LoginSignup/LoginSignup'
import Notifications from '../NotificationDropDown/Notifications'
import {
  updateUserById,
  getUnreadCountByRecieverId,
} from '../../Services/Api/Utilities/Index'

import '../../Assets/styles/css/Components/navbar.css'
import 'react-responsive-modal/styles.css'

const Navbars = () => {
  const [sideBox, setSideBox] = useState(false)
  const [currency, setCurrency] = useState('LKR')
  const [login, setLogin] = useState(false)
  const [sign, setSign] = useState(false)
  const [loggedin, setLoggedin] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const [roles, setRoles] = useState({
    admin: secureLocalStorage.getItem('admin'),
    hotelAdmin: secureLocalStorage.getItem('hotelAdmin'),
    customer: secureLocalStorage.getItem('customer'),
  })
  const navigate = useNavigate()
  let session = localStorage.getItem('session')

  useEffect(() => {
    window.scrollTo(0, 0)
    toast.configure()
    session = localStorage.getItem('session')
    let localCurrency = localStorage.getItem('currency')
    if (localStorage.getItem('session') == 'true') {
      setLoggedin(true)
    } else {
      setLoggedin(false)
    }
    if (localCurrency != null || localCurrency != undefined) {
      setCurrency(localCurrency)
    }
    unreadMessageCount()
  }, [])

  // useEffect(() => {
  //   document.getElementById('currency-selector').hidden = !loggedin
  // }, [loggedin])

  const onOpenModal = () => {
    setSign(true)
  }
  const onOpenModalLogin = () => {
    setLogin(true)
  }
  const onCloseModal = () => {
    setSign(false)
  }
  const onCloseModalclose = () => {
    setLogin(false)
  }

  const notifyError = (message) => {
    toast.error(message)
  }
  const notifySuccess = (message) => {
    toast.success(message)
  }

  const homepage = () => {
    navigate('/')
  }
  var prevScrollpos = window.pageYOffset

  window.onscroll = () => {
    var currentScrollPos = window.pageYOffset
    if (prevScrollpos > currentScrollPos) {
      document.getElementById('navbar').style.top = '0'
    } else {
      document.getElementById('navbar').style.top = '-100px'
    }

    prevScrollpos = currentScrollPos
  }
  const logOut = async () => {
    const id = localStorage.getItem('user')
    const dataModal = {
      refreshToken: null,
    }
    await updateUserById(id, dataModal)
      .then((res) => {
        if (res.status == 200) {
          localStorage.clear()
        }
      })
      .catch((err) => {
        console.log(err)
      })
    navigate('/')
  }

  const changeCurrency = async (data) => {
    const id = localStorage.getItem('user')
    const dataModel = {
      currency: data,
    }
    await updateUserById(id, dataModel)
      .then((res) => {
        if (res.status == 200) {
          localStorage.setItem('currency', data)
          notifySuccess('You changed currency to ' + data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const unreadMessageCount = async () => {
    const dataModel = {
      id: localStorage.getItem('user'),
    }
    await getUnreadCountByRecieverId(dataModel)
      .then((res) => {
        setMessageCount(res.data.length)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <>
      <div className='nav-bar-container' id='navbar'>
        <img
          src={'/images/LOGO/short-logo.png'}
          className='short-logo'
          alt='short logo'
          onClick={homepage}
        />
        <div className='right-align'>
          {/* <div className='nav-items'>
            <i class='fa-solid fa-comment'></i>
          </div> */}

          {/* <div id='sideDropMenu'>
              <div>Bookings</div>
              <div>Saved Hotels</div>
              <div>Loyalty</div>
            </div> */}
          {loggedin ? (
            <>
              <div className='nav-items'>
                {!roles.admin && roles.customer ? (
                  <>
                    <button
                      class='button-18 listing-button'
                      role='button'
                      onClick={() => {
                        navigate('/seller/hotel/register')
                      }}
                    >
                      List Your Property
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </div>

              <div className='nav-items'>
                <select
                  className='currency-selector'
                  id='currency-selector'
                  onChange={(e) => {
                    setCurrency(e.target.value)
                    changeCurrency(e.target.value)
                  }}
                >
                  <option selected value={currency}>
                    {currency}
                  </option>
                  <option value={'LKR'}>LKR</option>
                  <option value={'EUR'}>EUR</option>

                  <option value={'GBP'}>GBP</option>
                  <option value={'JPY'}>JPY</option>
                  <option value={'CAD'}>CAD</option>
                  <option value={'AUD'}>AUD</option>
                </select>
              </div>
              <div className='nav-items'>
                <div class='icons'>
                  <div class='notification'>
                    <a href='#'>
                      <div class='notBtn' href='#'>
                        <div class='number'>
                          {messageCount != 0 ? messageCount : <></>}
                        </div>
                        <i class='fas fa-bell '></i>

                        <div class='box'>
                          <div class='display'>
                            <div class='nothing'>
                              <i class='fas fa-child stick'></i>
                              <div class='cent'>
                                Looks Like your all caught up!
                              </div>
                            </div>
                            <div class='cont'>
                              <div class='view-all-container'>
                                <div class=';'>
                                  <button className='view-all'>View All</button>
                                </div>
                              </div>
                              <Notifications />
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className='nav-items menu-dropdown'>
                <Dropdown>
                  <Dropdown.Toggle
                    className='wrapper right-dropdown'
                    id='dropdown-basic'
                  ></Dropdown.Toggle>

                  <Dropdown.Menu>
                    {/* <Dropdown.Item as={Link} to={'/request-manage'}>
                      Request
                    </Dropdown.Item> */}
                    <Dropdown.Item as={Link} to={'/booking-history'}>
                      Bookings
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to={'/saved-hotel'}>
                      Saved
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to={'/loyalty-program'}>
                      Loyalty
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to={'/messages'}>
                      Messeges
                    </Dropdown.Item>
                    {/* {roles.admin ? (
                      <>
                        <Dropdown.Item as={Link} to={'/admin/dashboard'}>
                          Admin Account
                        </Dropdown.Item>
                      </>
                    ) : (
                      <></>
                    )} */}
                    {roles.admin ? (
                      <>
                        <Dropdown.Item as={Link} to={'/request-manage'}>
                          Request
                        </Dropdown.Item>
                      </>
                    ) : (
                      <></>
                    )}
                    {roles.hotelAdmin ? (
                      <>
                        <Dropdown.Item as={Link} to={'/seller/dashboard'}>
                          Seller Account
                        </Dropdown.Item>
                      </>
                    ) : (
                      <></>
                    )}
                    {roles.customer ? (
                      <>
                        <Dropdown.Item as={Link} to={'/account-settings'}>
                          Profile
                        </Dropdown.Item>
                      </>
                    ) : (
                      <></>
                    )}

                    <Dropdown.Item
                      onClick={() => {
                        setLoggedin(false)
                        logOut()
                        homepage()
                      }}
                    >
                      Sign Out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </>
          ) : (
            <>
              {' '}
              <div className='nav-items '>
                {/* <span className='login-btn ' onClick={onOpenModal}>
                  Signup{' '}
                </span> */}

                <button class='button-18' role='button' onClick={onOpenModal}>
                  Register
                </button>
              </div>
              <div className='nav-items mr-3'>
                {/* <span className='login-btn' onClick={onOpenModalLogin}>
                  login{' '}
                </span> */}
                <button
                  class='button-18'
                  role='button'
                  onClick={onOpenModalLogin}
                >
                  Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div>
        <Modal open={sign} onClose={onCloseModal}>
          <SignupAndLogin setSign={setSign} setLoggedin={setLoggedin} />
          <Signup setSign={setSign} setLoggedin={setLoggedin} />
        </Modal>
        <Modal open={login} onClose={onCloseModalclose}>
          <SignupAndLogin setLogin={setLogin} setLoggedin={setLoggedin} />
          <Login setLogin={setLogin} setLoggedin={setLoggedin} />
        </Modal>
      </div>
    </>
  )
}

export default Navbars
