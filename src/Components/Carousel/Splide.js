import React, { useState, useRef, useEffect } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import { getAllImagesByRoomId } from '../../Services/Api/Utilities/Index.js'
import '../../Assets/styles/css/Components/souvenir.css'

const SplideSlider = ({ roomId }) => {
  const [images, setRoomImages] = useState(null)
  useEffect(() => {
    getImages()
  }, [])

  const getImages = async () => {
    const dataModel = {
      id: roomId,
    }
    await getAllImagesByRoomId(dataModel)
      .then((res) => {
        try {
          if (res.data.length == 0) {
            setRoomImages(null)
          } else {
            setRoomImages(res.data)
          }
        } catch (e) {
          setRoomImages(null)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <>
      <>
        {images != null ? (
          <>
            <Splide
              options={{
                rewind: true,
                perPage: 1,
                perMove: 1,
                gap: 10,
                padding: '10px',
                pagination: true,
                breakpoints: {
                  623: {
                    perPage: 1,
                    perMove: 1,
                  },
                  935: {
                    perPage: 1,
                    perMove: 1,
                  },
                  1247: {
                    perPage: 1,
                    perMove: 1,
                  },
                },
              }}
            >
              {images.map((item) => {
                return (
                  <SplideSlide className='slide souvenir-images'>
                    <img src={item.image} />
                  </SplideSlide>
                )
              })}
            </Splide>
          </>
        ) : (
          <>
            <div class='alert alert-primary' role='alert'>
              Nothing to display.
            </div>
          </>
        )}
      </>
    </>
  )
}

export default SplideSlider
