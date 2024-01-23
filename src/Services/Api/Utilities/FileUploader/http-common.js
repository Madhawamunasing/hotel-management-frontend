import axios from 'axios'

export default axios.create({
  baseURL: 'https://hotelreservationapiv1.herokuapp.com/',
  headers: {
    'Content-type': 'application/json',
  },
})
