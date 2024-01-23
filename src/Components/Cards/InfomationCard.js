import React from 'react'
import { Link } from 'react-router-dom'
const InfomationCard = () => {
  return (
    <div>
      <div class='w-full '>
        <div class='max-w-screen-md mx-auto px-10 pt-10'>
          <div class='bg-emerald-200 md:h-48 rounded-lg shadow-md flex flex-wrap flex-col-reverse md:flex-col'>
            <div class='w-full md:w-1/2 p-4'>
              <h3 class='text-3xl font-bold'>
                List more hotels & get more benifits!
              </h3>
              <p>
                <Link to='/seller/hotel/register'>
                  <a class='button'>Get started !</a>
                </Link>
              </p>
            </div>
            <div class='w-full md:w-1/2 p-4 md:p-0 bg-blue'>
              <img
                src='https://res.cloudinary.com/uom/image/upload/v1650399711/hotel-svgrepo-com_nw5jdh.svg'
                alt=''
                class='w-32 mx-auto'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfomationCard
