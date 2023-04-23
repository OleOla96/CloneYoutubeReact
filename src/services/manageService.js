import axios from 'axios'
import authHeader from './auth-header'
import { http } from '../common/http'

const getAllContent = () => {
  return axios.get(http + 'roles/showallcontent', { headers: authHeader() })
}

const deleteContent = (id) => {
  return axios.delete(http + `roles/delete/${id}`, { headers: authHeader() })
}

const deleteContents = (ids) => {
  return axios.delete(
    http + 'crud/delete/many',
    { ids },
    { headers: authHeader() }
  )
}

const getAllUser = () => {
  return axios.get(http + `roles/admin/showalluser`, { headers: authHeader() })
}

const deleteUser = (userId) => {
  return axios.delete(http + `roles/admin/delete/${userId}`, {
    headers: authHeader(),
  })
}

const CrudSevice = {
  getAllContent,
  getAllUser,
  deleteUser,
  deleteContents,
  deleteContent,
}

export default CrudSevice
