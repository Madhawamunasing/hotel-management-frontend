import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Dashboard from '../Pages/Home/Dashboard'
import Hotels from '../Pages/Hotels/Hotels'
import HotelPage from '../Pages/Booking/HotelPage'
import AddingVAS from '../Pages/Booking/AddingVAS'
import CustomerDetails from '../Pages/Booking/CustomerDetails'
import Payment from '../Pages/Booking/Payment.js'
import SavedHotel from '../Pages/Saved/SavedHotel'
import BookingHistory from '../Pages/BookingHistory/BookingHistory.js'
import BookingDetails from '../Layouts/BookingHistroy/BookingDetails'
import LoyaltyDescription from '../Pages/Loyalty/LoyaltyDescription'
import SharedSignUp from '../Pages/SharedSignUp/SharedSignUp'
import AccountSettings from '../Pages/Account/MyAccountSettings'
import PersonalSettings from '../Pages/PersonalSettings/PersonalSettings'
import SecuritySettings from '../Pages/SecuritySettings/SecuritySettings'
import Review from '../Pages/Account/Review'
import Requestmanage from '../Pages/RequestManage/RequestManage'
import Message from '../Pages/Messages/Message'
import WriteMessage from '../Pages/Messages/WriteMessage'
const UserRoutes = (
  <>
    <Route exact path='/' element={<Dashboard />}></Route>
    <Route path='/hotels' element={<Hotels />}></Route>
    <Route path='/hotel/page' element={<HotelPage />}></Route>
    <Route path='/booking/vas' element={<AddingVAS />}></Route>
    <Route path='/booking/details' element={<CustomerDetails />}></Route>
    <Route exact path='/payment' element={<Payment />}></Route>
    <Route exact path='/saved-hotel' element={<SavedHotel />}></Route>
    <Route exact path='/booking-history' element={<BookingHistory />}></Route>
    <Route path='/booking-history/details' element={<BookingDetails />}></Route>
    <Route
      exact
      path='/loyalty-program'
      element={<LoyaltyDescription />}
    ></Route>
    <Route path='/share' element={<SharedSignUp />}></Route>
    <Route exact path='/account-settings' element={<AccountSettings />}></Route>
    <Route
      exact
      path='/personal-settings'
      element={<PersonalSettings />}
    ></Route>
    <Route
      exact
      path='/security-settings'
      element={<SecuritySettings />}
    ></Route>
    <Route exact path='/my-account/review' element={<Review />}></Route>
    <Route exact path='/request-manage' element={<Requestmanage />}></Route>
    <Route exact path='/messages' element={<Message />}></Route>
    <Route exact path='/writeMessages' element={<WriteMessage />}></Route>
  </>
)

export default UserRoutes
