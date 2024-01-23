import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../Assets/styles/css/Seller/Components/sellerDashboard.css'
import CardStats from '../../Components/Cards/CardStats'

const HeaderStats = () => {
  let navigate = useNavigate()
  return (
    <div>
      <div
        className='relative md:pt-32 pb-32 pt-12'
        style={{
          backgroundImage:
            'url(https://res.cloudinary.com/uom/image/upload/v1655696873/rnlmtivdfqdtds5yrmsx.jpg)',
        }}
      >
        <div className='px-4 md:px-10 mx-auto w-full'>
          <div>
            {/* Card stats */}
            <div className='flex flex-wrap'>
              <div
                className='w-full lg:w-6/12 xl:w-3/12 px-4'
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  navigate('../seller/bookings')
                }}
              >
                <CardStats
                  statSubtitle='Bookings'
                  statTitle='350,897'
                  statPercentColor='text-emerald-500'
                  statIconName='far fa-chart-bar'
                  statIconColor='bg-red-500'
                />
              </div>
              <div
                className='w-full lg:w-6/12 xl:w-3/12 px-4'
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  // navigate('../seller/revenue')
                }}
              >
                <CardStats
                  statSubtitle='REVENUE'
                  statPercent='3.48'
                  statPercentColor='text-red-500'
                  statIconName='fas fa-chart-pie'
                  statIconColor='bg-orange-500'
                />
              </div>
              <div
                className='w-full lg:w-6/12 xl:w-3/12 px-4'
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  navigate('../seller/hotels')
                }}
              >
                <CardStats
                  statSubtitle='LISTINGS'
                  statTitle='924'
                  statArrow='down'
                  statPercent='1.10'
                  statPercentColor='text-orange-500'
                  statDescripiron='Since yesterday'
                  statIconName='fas fa-users'
                  statIconColor='bg-pink-500'
                />
              </div>
              <div
                className='w-full lg:w-6/12 xl:w-3/12 px-4'
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  navigate('../seller/Review')
                }}
              >
                <CardStats
                  statSubtitle='Feedback'
                  statTitle='49,65%'
                  statArrow='up'
                  statPercent='12'
                  statPercentColor='text-emerald-500'
                  statDescripiron='Since last month'
                  statIconName='fas fa-percent'
                  statIconColor='bg-lightBlue-500'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderStats
