import React, { Component } from 'react'
import Slider from 'react-slick'
import { Carousel } from 'react-bootstrap'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import image_1 from '../../Assets/images/property-types/luxary.jpg'
import image_2 from '../../Assets/images/property-types/kabana.jpg'
import image_3 from '../../Assets/images/property-types/villa.jpg'
import image_4 from '../../Assets/images/property-types/bangalow.jpg'
import image_5 from '../../Assets/images/property-types/guest-houses.jpg'

import '../../Assets/styles/css/Components/browsetype.css'

class Browsetype extends Component {
  render() {
    const settings = {
      className: 'center',
      centerMode: true,
      infinite: true,
      centerPadding: '60px',
      slidesToShow: 3,
      speed: 500,
    }
    return (
      <div className='container mt-5 mb-5'>
        <div className='gallery-full'>
          <Slider {...settings}>
            <div className='gallery-cells luxary text-center rounded'>
              <h3 class='card-header'>Luxury</h3>
            </div>
            <div className='gallery-cells kabana text-center rounded '>
              <h3 class='card-header'>Kabana Hotels</h3>
            </div>
            <div className='gallery-cells villa text-center rounded'>
              <h3 class='card-header'>Villa</h3>
            </div>
            <div className='gallery-cells bangalow text-center rounded'>
              <h3 class='card-header'>Bangalows</h3>
            </div>
            <div className='gallery-cells guest-houses text-center rounded'>
              <h3 class='card-header'>Guest Houses</h3>
            </div>
          </Slider>
        </div>

        <div className='gallery-mobile'>
          <Carousel fade>
            <Carousel.Item>
              <img className='d-block w-100' src={image_1} alt='First slide' />
              <Carousel.Caption>
                <h3>Luxary</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className='d-block w-100' src={image_2} alt='Second slide' />

              <Carousel.Caption>
                <h3>Kabana</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className='d-block w-100' src={image_3} alt='Third slide' />

              <Carousel.Caption>
                <h3>Villa</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className='d-block w-100' src={image_4} alt='Third slide' />

              <Carousel.Caption>
                <h3>Bangalow</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className='d-block w-100' src={image_5} alt='Third slide' />

              <Carousel.Caption>
                <h3>Guest Houses</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    )
  }
}

export default Browsetype
