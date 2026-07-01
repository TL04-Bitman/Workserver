import axios from '../utils/axios'

export const getApplications = (params) => {
  return axios.get('/applications', { params })
}

export const getApplicationDetail = (id) => {
  return axios.get(`/applications/${id}`)
}

export const createApplication = (data) => {
  return axios.post('/applications', data)
}

export const updateApplication = (id, data) => {
  return axios.put(`/applications/${id}`, data)
}