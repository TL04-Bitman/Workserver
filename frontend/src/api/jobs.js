import axios from '../utils/axios'

export const getJobs = (params) => {
  return axios.get('/jobs', { params })
}

export const getJobDetail = (id) => {
  return axios.get(`/jobs/${id}`)
}

export const createJob = (data) => {
  return axios.post('/jobs', data)
}

export const updateJob = (id, data) => {
  return axios.put(`/jobs/${id}`, data)
}

export const deleteJob = (id) => {
  return axios.delete(`/jobs/${id}`)
}