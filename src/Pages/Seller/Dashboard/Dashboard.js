import React from 'react'
import '../../../Assets/styles/css/Seller/Pages/dashboard.css'
import CardBookings from '../../../Components/Cards/CardBookings.js'
import CardExtra from '../../../Components/Cards/CardExtra.js'
import CardBarChart from '../../../Components/Charts/CardBarChart.js'
import CardLineChart from '../../../Components/Charts/CardLineChart.js'
import Navbar from '../../../Components/Navbar/Navbar.js'
import Footer from '../../../Layouts/Footer/Footer.js'
import HeaderStats from '../../../Layouts/SellerDashboard/HeaderStats.js'
const Dashboard = () => {
  return (
    <div className='relative'>
      <Navbar />
      <div className='seller-dashboard'>
        <HeaderStats />
        <div className='px-4 md:px-10 mx-auto w-full -m-24 chart-container  bg-blueGray-100'>
          <div className='flex flex-wrap'>
            <div className='w-full xl:w-8/12 mb-12 xl:mb-0 px-4'>
              {/* <CardLineChart /> */}
            </div>
            <div className='w-full xl:w-4/12 px-4'>
              {/* <CardBarChart /> */}
            </div>
          </div>
          <div className='flex flex-wrap mt-4'>
            <div className='w-full xl:w-8/12 mb-12 xl:mb-0 px-4'>
              <CardBookings />
            </div>
            <div className='w-full xl:w-4/12 px-4'>
              <CardExtra />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard
