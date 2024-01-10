import axios from 'axios'
import { ADMIN_LOGIN_API, MAIN_URL } from 'src/constant'
// export const MAIN_URL = 'http://localhost:8002'

export const adminLogin = (data) => axios.post(MAIN_URL + ADMIN_LOGIN_API, data)

// export const forgotPassword = (data) => axios.post(`${MAIN_URL}/admin/forgot-password`, data)

// export const resetPassword = (data) => axios.post(`${MAIN_URL}/admin/reset-password`, data)
