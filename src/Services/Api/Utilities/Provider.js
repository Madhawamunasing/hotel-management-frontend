import axios from 'axios'
import { handleResponse, handleError } from './Response'

//get methods
const getAll = async (url, type, task) => {
  return axios
    .get(`${url}/${type}/${task}`)
    .then(handleResponse)
    .catch(handleError)
}
const getOneById = (url, type, task) => {
  return axios
    .get(`${url}/${type}/${task}`)
    .then(handleResponse)
    .catch(handleError)
}
const getWithOneParams = (url, type, task, params) => {
  return axios
    .get(
      `${url}/${type}/${task}?${Object.keys(params)[0]}=${
        params[Object.keys(params)[0]]
      }`
    )
    .then(handleResponse)
    .catch(handleError)
}
//post methods
const getAllPOST = async (url, type, task, data) => {
  return axios
    .post(`${url}/${type}/${task}`, data)
    .then(handleResponse)
    .catch(handleError)
}

const getAllById = async (url, type, task, data) => {
  return axios
    .post(`${url}/${type}/${task}`, data)
    .then(handleResponse)
    .catch(handleError)
}
const getOneByIdPost = async (url, type, task, data) => {
  return axios
    .post(`${url}/${type}/${task}`, data)
    .then(handleResponse)
    .catch(handleError)
}
const insertData = async (url, type, task, data) => {
  return axios
    .post(`${url}/${type}/${task}`, data)
    .then(handleResponse)
    .catch(handleError)
}

const updateByIdPost = async (url, type, task, data) => {
  return axios
    .post(`${url}/${type}/${task}`, data)
    .then(handleResponse)
    .catch(handleError)
}
//delete methods
const deleteData = async (url, type, task, data) => {
  return axios
    .delete(`${url}/${type}/${task}/${data[0]}/${data[1]}`)
    .then(handleResponse)
    .catch(handleError)
}
const deleteDataById = async (url, type, task, id) => {
  return axios
    .delete(`${url}/${type}/${task}/${id}`)
    .then(handleResponse)
    .catch(handleError)
}
//put methods
const updateById = async (url, type, task, id, data) => {
  return axios
    .put(`${url}/${type}/${task}/${id}`, data)
    .then(handleResponse)
    .catch(handleError)
}
export default {
  getAll,
  getOneById,
  getAllPOST,
  getAllById,
  getOneByIdPost,
  insertData,
  deleteData,
  deleteDataById,
  updateById,
  getWithOneParams,
  updateByIdPost,
}
