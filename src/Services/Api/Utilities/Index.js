import provider from './Provider'
const BASE_URL = 'https://hotelreservationapiv1.herokuapp.com/api/v1'
//const BASE_URL = 'localhost:8000/api/v1'

// *****************************************************************************
//                          users end points
// *****************************************************************************
const userLogin = async (bodyData) => {
  return await provider.getAllPOST(BASE_URL, 'user', 'login', bodyData)
}

const updateUserById = async (id, bodyData) => {
  return await provider.updateById(
    BASE_URL,
    'user',
    'updateUserById',
    id,
    bodyData
  )
}

const updatePassword = async (bodyData) => {
  return await provider.updateByIdPost(
    BASE_URL,
    'user',
    'changePassword',
    bodyData
  )
}

const getUserbyId = async (bodyData) => {
  return await provider.getOneByIdPost(
    BASE_URL,
    'user',
    'getUserbyId',
    bodyData
  )
}
const addUser = async (bodyData) => {
  return await provider.getAllPOST(BASE_URL, 'user', 'addUser', bodyData)
}

const addProfilePicture = async (bodyData) => {
  return await provider.getOneByIdPost(
    BASE_URL,
    'uploads',
    'profile-picture',
    bodyData
  )
}
// *****************************************************************************
//                          users roles pointsend points
// *****************************************************************************
const updateRole = async (id, bodyData) => {
  return await provider.updateById(
    BASE_URL,
    'user',
    'role/updateRole',
    id,
    bodyData
  )
}

// *****************************************************************************
//                          hotels end points
// *****************************************************************************
const registerHotel = async (bodyData) => {
  return await provider.getAllPOST(BASE_URL, 'hotel', 'registerHotel', bodyData)
}
const addHotelImage = async (bodyData) => {
  return await provider.getAllPOST(BASE_URL, 'uploads', 'hotel', bodyData)
}

const getAllHotels = async () => {
  return await provider.getAll(BASE_URL, 'hotel', 'getAllHotels')
}
const getHotelById = async (bodyData) => {
  return await provider.getAllPOST(BASE_URL, 'hotel', 'getHotelById', bodyData)
}

const searchHotels = async (bodyData) => {
  return await provider.getAllPOST(BASE_URL, 'hotel', 'search', bodyData)
}
const searchHotelsByRate = async (bodyData) => {
  return await provider.getAllPOST(
    BASE_URL,
    'hotel',
    'searchSotByRate',
    bodyData
  )
}

const getAvailbleRooms = async (bodyData) => {
  return await provider.getAllPOST(
    BASE_URL,
    'room',
    'getAvailbleRooms',
    bodyData
  )
}

const getHotelByUserId = async (bodyData) => {
  return await provider.getAllPOST(
    BASE_URL,
    'hotel',
    'getHotelByUserId',
    bodyData
  )
}
const saveHotelById = async (bodyData) => {
  return await provider.getAllPOST(BASE_URL, 'hotel', 'saveHotel', bodyData)
}
const getSavedhotelByCustomerId = async (bodyData) => {
  return await provider.getAllPOST(
    BASE_URL,
    'hotel',
    'getSavedhotelByCustomerId',
    bodyData
  )
}

const getHotelByStatus = async (bodyData) => {
  return await provider.getAllPOST(
    BASE_URL,
    'hotel',
    'getHotelsByStatus',
    bodyData
  )
}

const sortHotelsByBookingCount = async (bodyData) => {
  return await provider.getAllPOST(
    BASE_URL,
    'hotel',
    'sortHotelsByBookingCount',
    bodyData
  )
}
const deleteSaveHotelById = async (bodyData) => {
  return await provider.deleteData(
    BASE_URL,
    'hotel',
    'deleteSavedHotel',
    bodyData
  )
}
const updateHotelById = async (id, bodyData) => {
  return await provider.updateById(
    BASE_URL,
    'hotel',
    'updateHotelById',
    id,
    bodyData
  )
}
const deleteHotelById = async (params) => {
  return await provider.deleteDataById(
    BASE_URL,
    'hotel',
    'deleteHotelById',
    params
  )
}

// *****************************************************************************
//                          rooms  end points
// *****************************************************************************
const createRoom = async (bodyData) => {
  return await provider.getAllPOST(BASE_URL, 'room', 'createRoom', bodyData)
}
const updateRoomById = async (id, bodyData) => {
  return await provider.updateById(
    BASE_URL,
    'room',
    'updateRoomById',
    id,
    bodyData
  )
}
const getRoomByHotelId = async (bodyData) => {
  return await provider.getAllPOST(
    BASE_URL,
    'room',
    'getRoomByHotelId',
    bodyData
  )
}
const getRoomsByHotelIdAndRoomType = async (bodyData) => {
  return await provider.getAllPOST(
    BASE_URL,
    'room',
    'getRoomsByHotelIdAndRoomType',
    bodyData
  )
}
const getAllImagesByRoomId = async (bodyData) => {
  return await provider.getAllPOST(
    BASE_URL,
    'uploads/room',
    'getAllImagesByRoomId',
    bodyData
  )
}

const deleteRoomImageById = async (params) => {
  return await provider.deleteDataById(
    BASE_URL,
    'uploads/room',
    'delete',
    params
  )
}
const getRoomDetailsById = async (bodyData) => {
  return await provider.getAllPOST(BASE_URL, 'room', 'getRoomById', bodyData)
}
const getAvailableRoomQtyByRoomId = async (bodyData) => {
  return await provider.getOneByIdPost(
    BASE_URL,
    'room',
    'getAvailableRoomQtyByRoomId',
    bodyData
  )
}
const getRoomById = async (bodyData) => {
  return await provider.getOneByIdPost(
    BASE_URL,
    'room',
    'getRoomById',
    bodyData
  )
}
const deleteRoomById = async (params) => {
  return await provider.deleteDataById(
    BASE_URL,
    'room',
    'deleteRoomById',
    params
  )
}

// *****************************************************************************
//                          room types  end points
// ****************************************************************************
const createRoomtype = async (bodyData) => {
  return await provider.getAllPOST(
    BASE_URL,
    'roomtype',
    'createRoomtype',
    bodyData
  )
}
const getRoomTypesByHotelId = async (bodyData) => {
  return await provider.getAllPOST(
    BASE_URL,
    'roomtype',
    'getRoomTypesByHotelId',
    bodyData
  )
}
const removeRoomType = async (params) => {
  return await provider.deleteDataById(
    BASE_URL,
    'roomtype',
    'deleteRoomTypeById',
    params
  )
}
// *****************************************************************************
//                          discount  end points
// *****************************************************************************
const getDiscountByHotelId = async (bodyData) => {
  return await provider.getAllPOST(
    BASE_URL,
    'discount',
    'getDiscountByHotelId',
    bodyData
  )
}

// *****************************************************************************
//                          booking  end points
// *****************************************************************************

const placeBooking = async (bodyData) => {
  return await provider.insertData(BASE_URL, 'booking', '', bodyData)
}
const updateBookingById = async (id, bodyData) => {
  return await provider.updateById(
    BASE_URL,
    'booking',
    'updateBookingById',
    id,
    bodyData
  )
}
const getBookingDetailsById = async (bodyData) => {
  return await provider.getOneByIdPost(
    BASE_URL,
    'booking',
    'getBookingById',
    bodyData
  )
}
const getCurrentBookingByUserId = async (bodyData) => {
  return await provider.getAllPOST(
    BASE_URL,
    'booking',
    'getCurrentBookingByUserId',
    bodyData
  )
}
const getPastBookingByUserId = async (bodyData) => {
  return await provider.getAllPOST(
    BASE_URL,
    'booking',
    'getPastBookingByUserId',
    bodyData
  )
}
const getBookingByUserId = async (bodyData) => {
  return await provider.getAllPOST(
    BASE_URL,
    'booking',
    'getBookingByUserId',
    bodyData
  )
}
const getAllBookigsByHotelAdminId = async (bodyData) => {
  return await provider.getAllPOST(
    BASE_URL,
    'booking',
    'getAllBookigsByHotelAdminId',
    bodyData
  )
}
const getCurrentBookigsByHotelAdminId = async (bodyData) => {
  return await provider.getAllPOST(
    BASE_URL,
    'booking',
    'getCurrentBookigsByHotelAdminId',
    bodyData
  )
}

const getPastBookigsByHotelAdminId = async (bodyData) => {
  return await provider.getAllPOST(
    BASE_URL,
    'booking',
    'getPastBookigsByHotelAdminId',
    bodyData
  )
}

const getBookingCountByHotelAdminUserId = async (bodyData) => {
  return await provider.getAllPOST(
    BASE_URL,
    'booking',
    'getBookingCountByHotelAdminUserId',
    bodyData
  )
}

// *****************************************************************************
//                          vas  end points
// *****************************************************************************

const addValueAddedServices = async (bodyData) => {
  return await provider.getAllPOST(BASE_URL, 'vas', 'createVAS', bodyData)
}
const getVasByHotelId = async (bodyData) => {
  return await provider.getAllPOST(BASE_URL, 'vas', 'getVASByHotelId', bodyData)
}
const subscribeVAS = async (bodyData) => {
  return await provider.getAllPOST(
    BASE_URL,
    'booking',
    'addVASToBooking',
    bodyData
  )
}
const unSubscribeVAS = async (params) => {
  return await provider.deleteData(
    BASE_URL,
    'vas',
    'deleteVASByBookingAndVASId',
    params
  )
}
const getVASByBookingId = async (bodyData) => {
  return await provider.getAllPOST(
    BASE_URL,
    'vas',
    'getVASByBookingId',
    bodyData
  )
}
const deleteVASById = async (params) => {
  return await provider.deleteDataById(BASE_URL, 'vas', 'deleteVASById', params)
}

// *****************************************************************************
//                          payment  end points
// *****************************************************************************

const pay = async (bodyData) => {
  return await provider.insertData(BASE_URL, 'payment', 'pay', bodyData)
}
const getAllPaymentsBybookingId = async (bodyData) => {
  return await provider.getOneByIdPost(
    BASE_URL,
    'payment',
    'getAllPaymentsBybookingId',
    bodyData
  )
}
const getTotalAmountByBookingId = async (bodyData) => {
  return await provider.getOneByIdPost(
    BASE_URL,
    'payment',
    'totalAmountByBookingId',
    bodyData
  )
}
const paymentStatusByBookingId = async (bodyData) => {
  return await provider.getOneByIdPost(
    BASE_URL,
    'payment',
    'paymentStatusByBookingId',
    bodyData
  )
}
// *****************************************************************************
//                          voucher  end points
// *****************************************************************************
const validateCoupon = async (bodyData) => {
  return await provider.getOneByIdPost(
    BASE_URL,
    'coupon',
    'validateCoupon',
    bodyData
  )
}

// *****************************************************************************
//                          customer grade  end points
// *****************************************************************************

const getCustomerDiscount = async (bodyData) => {
  return await provider.getOneByIdPost(
    BASE_URL,
    'loyalty',
    'getCustomerDiscount',
    bodyData
  )
}
const getCustomerGrade = async (bodyData) => {
  return await provider.getOneByIdPost(
    BASE_URL,
    'loyalty',
    'getCustomerGrade',
    bodyData
  )
}

// *****************************************************************************
//                          souvenir   end points
// *****************************************************************************

const getAllsouvenirByHotelId = async (bodyData) => {
  return await provider.getAllPOST(
    BASE_URL,
    'souvenir',
    'getSouvenirByHotelId',
    bodyData
  )
}
const deleteSouvenirById = async (params) => {
  return await provider.deleteDataById(
    BASE_URL,
    'souvenir',
    'deleteSouvenirById',
    params
  )
}

// *****************************************************************************
//                          refferal   end points
// *****************************************************************************

const createRefferal = async (bodyData) => {
  return await provider.insertData(
    BASE_URL,
    'refferal',
    'createRefferal',
    bodyData
  )
}
const refferalValidate = async (params) => {
  return await provider.getWithOneParams(
    BASE_URL,
    'refferal',
    'refferalValidate',
    params
  )
}

// *****************************************************************************
//                          message   end points
// *****************************************************************************
const sendMessage = async (bodyData) => {
  return await provider.insertData(BASE_URL, 'message', 'sendMessage', bodyData)
}
const getUnreadCountByRecieverId = async (bodyData) => {
  return await provider.getAllPOST(
    BASE_URL,
    'message',
    'getUnreadCountByRecieverId',
    bodyData
  )
}

const getMessagesByRecieverId = async (bodyData) => {
  return await provider.getAllPOST(
    BASE_URL,
    'message',
    'getMessagesByRecieverId',
    bodyData
  )
}

const getMessagesBySenderId = async (bodyData) => {
  return await provider.getAllPOST(
    BASE_URL,
    'message',
    'getMessagesBySenderId',
    bodyData
  )
}

const markAsRead = async (bodyData) => {
  return await provider.getAllPOST(BASE_URL, 'message', 'markAsRead', bodyData)
}

// *****************************************************************************
//                          facility type   end points
// *****************************************************************************
const createFacilityType = async (bodyData) => {
  return await provider.insertData(
    BASE_URL,
    'facilitytype',
    'createFacilityType',
    bodyData
  )
}

const getFacilityTypesByHotelId = async (bodyData) => {
  return await provider.getAllPOST(
    BASE_URL,
    'facilitytype',
    'getFacilityTypesByHotelId',
    bodyData
  )
}
const deleteFacilityTypeById = async (bodyData) => {
  return await provider.deleteDataById(
    BASE_URL,
    'facilitytype',
    'deleteFacilityTypeById',
    bodyData
  )
}

// *****************************************************************************
//                          facility   end points
// *****************************************************************************

const createFacility = async (bodyData) => {
  return await provider.insertData(
    BASE_URL,
    'facility',
    'createFacility',
    bodyData
  )
}
const deleteFacilityById = async (bodyData) => {
  return await provider.deleteDataById(
    BASE_URL,
    'facility',
    'deleteFacilityById',
    bodyData
  )
}

const getAllFacilitiesByHotelId = async (bodyData) => {
  return await provider.getAllPOST(
    BASE_URL,
    'facility',
    'getAllFacilitiesByHotelId',
    bodyData
  )
}
// *****************************************************************************
//                          Review end points
// *****************************************************************************

const getReviewByHotelId = async (bodyData) => {
  return await provider.getAllPOST(
    BASE_URL,
    'review',
    'getReviewByHotelId',
    bodyData
  )
}

const getReviewByCustomerId = async (bodyData) => {
  return await provider.getAllPOST(
    BASE_URL,
    'review',
    'getReviewByCustomerId',
    bodyData
  )
}

const createReview = async (bodyData) => {
  return await provider.insertData(BASE_URL, 'review', 'createReview', bodyData)
}

// *****************************************************************************
//                          Hotel rules end points
// *****************************************************************************
const getHotelRules = async (bodyData) => {
  return await provider.getAllPOST(
    BASE_URL,
    'rules',
    'getAllRulesByHotelId',
    bodyData
  )
}
const deleteReviewByReviewId = async (bodyData) => {
  return await provider.deleteDataById(
    BASE_URL,
    'review',
    'deleteReviewById',
    bodyData
  )
}

const updateReviewById = async (id, bodyData) => {
  return await provider.updateById(
    BASE_URL,
    'review',
    'updateReviewById',
    id,
    bodyData
  )
}

export {
  getAllHotels,
  searchHotels,
  getRoomTypesByHotelId,
  getAvailbleRooms,
  getRoomByHotelId,
  getRoomsByHotelIdAndRoomType,
  getAllImagesByRoomId,
  getDiscountByHotelId,
  placeBooking,
  getVasByHotelId,
  subscribeVAS,
  unSubscribeVAS,
  getVASByBookingId,
  updateBookingById,
  getBookingDetailsById,
  getRoomDetailsById,
  getTotalAmountByBookingId,
  validateCoupon,
  getCustomerDiscount,
  getAvailableRoomQtyByRoomId,
  pay,
  paymentStatusByBookingId,
  getBookingByUserId,
  getCurrentBookingByUserId,
  getPastBookingByUserId,
  saveHotelById,
  deleteSaveHotelById,
  getSavedhotelByCustomerId,
  getHotelById,
  registerHotel,
  addHotelImage,
  getAllsouvenirByHotelId,
  deleteSouvenirById,
  addValueAddedServices,
  deleteVASById,
  getHotelByUserId,
  createRoomtype,
  removeRoomType,
  createRoom,
  deleteRoomById,
  getRoomById,
  updateRoomById,
  getAllBookigsByHotelAdminId,
  getCurrentBookigsByHotelAdminId,
  getPastBookigsByHotelAdminId,
  getAllPaymentsBybookingId,
  sortHotelsByBookingCount,
  userLogin,
  updateUserById,
  addUser,
  createRefferal,
  refferalValidate,
  sendMessage,
  getUnreadCountByRecieverId,
  deleteRoomImageById,
  createFacilityType,
  getFacilityTypesByHotelId,
  getAllFacilitiesByHotelId,
  createFacility,
  deleteFacilityById,
  deleteFacilityTypeById,
  updateHotelById,
  getBookingCountByHotelAdminUserId,
  getReviewByHotelId,
  getUserbyId,
  getMessagesByRecieverId,
  getMessagesBySenderId,
  getCustomerGrade,
  deleteHotelById,
  createReview,
  markAsRead,
  searchHotelsByRate,
  getHotelRules,
  getReviewByCustomerId,
  deleteReviewByReviewId,
  updateReviewById,
  getHotelByStatus,
  addProfilePicture,
  updatePassword,
  updateRole,
}
