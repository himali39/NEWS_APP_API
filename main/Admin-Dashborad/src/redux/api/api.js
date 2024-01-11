import axios from 'axios'
import {
  ADMIN_FORGOT_PASSWORD_API,
  ADMIN_LOGIN_API,
  ADMIN_RESET_PASSWORD_API,
  MAIN_URL,
} from 'src/constant'
// export const MAIN_URL = 'http://localhost:8002'

export const adminLogin = (data) => axios.post(MAIN_URL + ADMIN_LOGIN_API, data)

export const forgotPassword = (data) => axios.post(MAIN_URL + ADMIN_FORGOT_PASSWORD_API, data)

export const resetPassword = (data) => axios.post(MAIN_URL + ADMIN_RESET_PASSWORD_API, data)
