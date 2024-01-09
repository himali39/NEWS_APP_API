import axios from 'axios'

const MAIN_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8002' : ''

export const adminLogin = (data) => axios.post(`${MAIN_URL}/admin/login`, data)

export const forgotPassword = (data) => axios.post(`${MAIN_URL}/admin/forgot-password`, data)

export const resetPassword = (data) => axios.post(`${MAIN_URL}/admin/reset-password`, data)
