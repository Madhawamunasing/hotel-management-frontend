import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ListedHotels from '../Pages/Seller/Hotels/ListedHotels.js'
import RegisterHotel from '../Layouts/ListingHotel/RegisterHotel.js'
import UploadImage from '../Layouts/ListingHotel/UploadImage.js'
import UploadSouvenirImage from '../Layouts/ListingHotel/UploadSouvenirImage.js'
import AddValueAddedServices from '../Layouts/ListingHotel/AddValueAddedServices.js'
import RegisterRoom from '../Layouts/ListingRoom/RegisterRoom.js'
import ListingRoomType from '../Layouts/ListingRoomType/ListingRoomType.js'
import ListedRooms from '../Layouts/ListingRoom/ListedRooms.js'
import AddRoomImage from '../Layouts/ListingRoom/AddRoomImage.js'
import SellerDashboard from '../Pages/Seller/Dashboard/Dashboard'
import Bookings from '../Pages/Seller/Bookings/Bookings.js'
import BookingDetails from '../Pages/Seller/Bookings/BookingDetails.js'
import Revenue from '../Pages/Seller/Revenue/Revenue.js'
import Facilities from '../Layouts/ListingHotel/Facilities.js'
import ViewCoupons from '../Pages/Coupon/ViewCoupons'
import CreateCoupon from '../Pages/Coupon/CreateCoupon'
import Review from '../Pages/Seller/Review/Review'

const SellerRoutes = (
  <>
    <Route exact path='/seller/hotels' element={<ListedHotels />}></Route>
    <Route exact path='/seller/Review' element={<Review/>}></Route>
    <Route path='/seller/hotel/register' element={<RegisterHotel />}></Route>
    <Route exact path='/seller/hotel/image' element={<UploadImage />}></Route>
    <Route
      exact
      path='/seller/hotel/souvenir'
      element={<UploadSouvenirImage />}
    ></Route>
    <Route
      exact
      path='/seller/hotel/value-added-services'
      element={<AddValueAddedServices />}
    ></Route>
    <Route
      exact
      path='/seller/hotel/:hotelId/create-room'
      element={<RegisterRoom />}
    ></Route>
    <Route
      exact
      path='/seller/hotel/:hotelId/roomtype'
      element={<ListingRoomType />}
    ></Route>
    <Route
      exact
      path='/seller/hotel/:hotelId/rooms'
      element={<ListedRooms />}
    ></Route>
    <Route path='/seller/hotel/facilities' element={<Facilities />}></Route>
    <Route
      exact
      path='/seller/:hotelId/room/upload-image'
      element={<AddRoomImage />}
    ></Route>

    <Route exact path='/seller/dashboard' element={<SellerDashboard />}></Route>
    <Route exact path='/seller/bookings' element={<Bookings />}></Route>
    <Route
      exact
      path='/seller/booking/:id'
      element={<BookingDetails />}
    ></Route>
    <Route exact path='/seller/revenue' element={<Revenue />}></Route>
    <Route exact path='/seller/viewCoupons' element={<ViewCoupons />}></Route>
    <Route exact path='/seller/createCoupon' element={<CreateCoupon />}></Route>
  </>
)

export default SellerRoutes
