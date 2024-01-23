import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'
import PropagateLoader from 'react-spinners/PropagateLoader'
import React, { useState, useEffect } from 'react'
import History from './Components/History/History'
import UserRoutes from './Routes/UserRouter'
import SellerRoutes from './Routes/SellerRouter'
import exceptionsRouters from './Routes/ExceptionsRouters'
import ChatBot from './Services/ChatBot/ChatBot.js'
import ShareButton from './Components/ShareButton/ShareButton'
import Dashboard from './Pages/Home/Dashboard'
import RegisterHotel from './Layouts/ListingHotel/RegisterHotel'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './App.css'

function App() {
  const [loading, setLoading] = useState(false)
  let [color, setColor] = useState('#ffffff')
  const [share, setShare] = useState(false)
  const [session, setSession] = useState(true)
  const [roles, setRoles] = useState({
    admin: false,
    hotelAdmin: false,
    customer: true,
  })

  useEffect(() => {
    setLoading(false)
    if (localStorage.getItem('session') == 'true') {
      setSession(true)
    } else {
      setSession(false)
    }
    setRoles({
      admin: secureLocalStorage.getItem('admin'),
      hotelAdmin: secureLocalStorage.getItem('hotelAdmin'),
      customer: true,
    })
    if (localStorage.getItem('session') == 'false' || session == null) {
      setShare(false)
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
    if (session == true) {
      setTimeout(() => {
        setShare(true)
      }, 0)
    } else {
      setShare(false)
    }
    if (session == false || session == null) {
      setShare(false)
    }
  }, [session])

  return (
    <Router history={History}>
      <div className='App'>
        {/* <ChatBot /> */}
        {loading ? (
          <div className='Loader'>
            <PropagateLoader
              loading={loading}
              size={25}
              margin={2}
              color='#00AD5F'
            />
          </div>
        ) : (
          <>
            <Routes>{UserRoutes}</Routes>
            <Routes>{SellerRoutes}</Routes>

            {session ? (
              <>
                {' '}
                <ShareButton />
              </>
            ) : (
              <></>
            )}
          </>
        )}
        <ChatBot />
      </div>
    </Router>
  )
}

export default App
