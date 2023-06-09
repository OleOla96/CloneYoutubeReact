import axios from 'axios'
import authHeader from './auth-header'
import { http } from '../common/http'

const getPublicContents = () => {
  return axios.get(http + 'showall')
}

const getUserContents = (userId) => {
  return axios.get(http + `roles/${userId}`, { headers: authHeader() })
}

const createContent = (data) => {
  return axios.post(http + 'crud/create', data, { headers: authHeader() })
}

const getUpdateContent = (id) => {
  return axios.get(http + `crud/update/${id}`, { headers: authHeader() })
}

const updateContent = (id, data) => {
  return axios.put(http + `crud/update/${id}`, data, { headers: authHeader() })
}

const deleteContent = (id) => {
  return axios.delete(http + `crud/delete/${id}`, { headers: authHeader() })
}

const CrudSevice = {
  getPublicContents,
  getUserContents,
  createContent,
  getUpdateContent,
  updateContent,
  deleteContent,
}

export default CrudSevice