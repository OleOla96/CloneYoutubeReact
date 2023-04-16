import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:8080/'

const getPublicContent = () => {
  return axios.get(API_URL + 'all')
}

const getUserContent = (userId) => {
  return axios.get(API_URL + `roles/${userId}`, { headers: authHeader() })
}

const createContent = (data) => {
  return axios.post(API_URL + 'crud/create', data, { headers: authHeader() })
}

const updateContent = (id, data) => {
  return axios.put(API_URL + `crud/update/${id}`, data, { headers: authHeader() })
}

const deleteContent = (id) => {
  return axios.delete(API_URL + `crud/delete/${id}`, { headers: authHeader() })
}

const CrudSevice = {
  getPublicContent,
  getUserContent,
  createContent,
  updateContent,
  deleteContent,
}

export default CrudSevice