import BookingVAS from '../../Layouts/AddingVAS/BookingVAS.js'
import Footer from '../../Layouts/Footer/Footer.js'
import HotelHeader from '../../Layouts/HotelHeader/HotelHeader.js'
const AddingVAS = () => {
  return (
    <div>
      <HotelHeader />
      <div class='container-fluid step-indicator'>
        <br />
        <br />
        <ul class='list-unstyled multi-steps'>
          <li>Select your room</li>
          <li class='is-active'>Add services</li>
          <li>Enter your details</li>
          <li>Finalize your pay </li>
        </ul>
      </div>
      <div className='person-details-container mt-3'>
        <BookingVAS />
      </div>
      <Footer />
    </div>
  )
}
export default AddingVAS
