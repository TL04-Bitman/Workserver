import axios from '../utils/axios'

export const getSettlements = (params) => {
  return axios.get('/settlements', { params })
}

export const getSettlementDetail = (id) => {
  return axios.get(`/settlements/${id}`)
}

export const createSettlement = (data) => {
  return axios.post('/settlements', data)
}