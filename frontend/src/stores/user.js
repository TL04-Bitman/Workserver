import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../api/auth'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref(JSON.parse(localStorage.getItem('userInfo') || 'null'))

  const login = async (phone, password) => {
    const res = await api.login(phone, password)
    token.value = res.data.token
    userInfo.value = res.data.user
    localStorage.setItem('token', token.value)
    localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
    return res
  }

  const loginBySms = async (phone, smsCode) => {
    const res = await api.loginBySms(phone, smsCode)
    token.value = res.data.token
    userInfo.value = res.data.user
    localStorage.setItem('token', token.value)
    localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
    return res
  }

  const register = async (data) => {
    const res = await api.register(data)
    return res
  }

  const logout = () => {
    token.value = ''
    userInfo.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
  }

  const isLoggedIn = () => {
    return !!token.value
  }

  const isStudent = () => {
    return userInfo.value?.role === 'student'
  }

  const isCompany = () => {
    return userInfo.value?.role === 'company'
  }

  const isAdmin = () => {
    return userInfo.value?.role === 'admin'
  }

  return {
    token,
    userInfo,
    login,
    loginBySms,
    register,
    logout,
    isLoggedIn,
    isStudent,
    isCompany,
    isAdmin
  }
})