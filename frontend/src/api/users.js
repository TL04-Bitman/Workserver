import axios from '../utils/axios'

export const getProfile = () => {
  return axios.get('/users/profile')
}

export const updateProfile = (data) => {
  return axios.put('/users/profile', data)
}