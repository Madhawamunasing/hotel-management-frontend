import React, { Component } from 'react'
import '../../Assets/styles/css/Layouts/footer.css'

const Footer = () => {
  return (
    <div class='footer-dark mt-5'>
      <footer>
        <div class='container'>
          <div class='row'>
            <div class='col-sm-6 col-md-3 item'>
              <h3>Services</h3>
              <ul>
                <li>
                  <a>Hotel Bookings</a>
                </li>
                <li>
                  <a>Events</a>
                </li>
                <li>
                  <a>Weddings</a>
                </li>
              </ul>
            </div>
            <div class='col-sm-6 col-md-3 item'>
              <h3>About</h3>
              <ul>
                <li>
                  <a>Company</a>
                </li>
                <li>
                  <a>Team</a>
                </li>
                <li>
                  <a>Careers</a>
                </li>
              </ul>
            </div>
            <div class='col-md-6 item text'>
              <h3>BOOKNOW.LK</h3>
              <p>
                We make it easy for everyone to create a beautiful, professional
                web presence. WE save your money and time. So what are you
                waiting for? Book your next trip on Booknow.lk today.
              </p>
            </div>
            <div class='col item social'>
              <a>
                <i class='icon ion-social-facebook'></i>
              </a>
              <a>
                <i class='icon ion-social-twitter'></i>
              </a>
              <a>
                <i class='icon ion-social-snapchat'></i>
              </a>
              <a>
                <i class='icon ion-social-instagram'></i>
              </a>
            </div>
          </div>
          <p class='copyright'>BOOKNOW.LK © 2022</p>
        </div>
      </footer>
    </div>
  )
}
export default Footer
