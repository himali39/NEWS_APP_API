import axios from 'axios'
import Cookies from 'js-cookie'
import {
  ADMIN_EDIT_PROFILE_PASSWORD_API,
  ADMIN_FORGOT_PASSWORD_API,
  ADMIN_LOGIN_API,
  ADMIN_RESET_PASSWORD_API,
  All_LANGUAGE_LIST_API,
  MAIN_URL,
} from 'src/constant'
export const MAIN_url = 'http://localhost:8002'

export const adminLogin = (data) => axios.post(MAIN_URL + ADMIN_LOGIN_API, data)

export const forgotPassword = (data) => axios.post(MAIN_URL + ADMIN_FORGOT_PASSWORD_API, data)

export const resetPassword = (data) => axios.post(MAIN_URL + ADMIN_RESET_PASSWORD_API, data)

/* ----------------------------  Admin profile change password --------------------------- */
export const changePassword = (data) =>
  axios.post(MAIN_URL + ADMIN_EDIT_PROFILE_PASSWORD_API, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* -------------------------- update Admin Profile -------------------------- */
export const UpdateProfile = (data) =>
  axios.post(MAIN_URL + ADMIN_EDIT_PROFILE_PASSWORD_API, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* -------------------------- update Admin Profile -------------------------- */
export const getAllLanguage = (data) =>
  axios
    .get(MAIN_url + All_LANGUAGE_LIST_API, data, {
      headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
    })
    .then((response) => console.log(response))
