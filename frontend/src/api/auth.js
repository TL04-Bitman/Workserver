import axios from '../utils/axios'

export const login = (phone, password) => {
  return axios.post('/auth/login', { phone, password })
}

export const register = (data) => {
  return axios.post('/auth/register', data)
}

export const sendLoginCode = (phone) => {
  return axios.post('/auth/login/code', { phone })
}

export const sendRegisterCode = (phone) => {
  return axios.post('/auth/register/code', { phone })
}

export const loginBySms = (phone, smsCode) => {
  return axios.post('/auth/login/sms', { phone, smsCode })
}

export const checkPhone = (phone) => {
  return axios.post('/auth/check-phone', { phone })
}

export default {
  login,
  register,
  sendLoginCode,
  sendRegisterCode,
  loginBySms,
  checkPhone
}