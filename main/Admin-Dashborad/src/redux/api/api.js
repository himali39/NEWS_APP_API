import axios from 'axios'
import Cookies from 'js-cookie'
import {
  ADD_CATEGORY_API,
  ADD_LANGUAGE_API,
  ADD_SUBCATEGORY_API,
  ADD_TAG_API,
  ADMIN_EDIT_PROFILE_PASSWORD_API,
  ADMIN_FORGOT_PASSWORD_API,
  ADMIN_LOGIN_API,
  ADMIN_RESET_PASSWORD_API,
  All_CATEGORY_LIST_API,
  All_LANGUAGE_LIST_API,
  All_SUBCATEGORY_LIST_API,
  All_TAG_LIST_API,
  DELETE_CATEGORY_API,
  DELETE_LANGUAGE_API,
  DELETE_SUBCATEGORY_API,
  DELETE_TAG_API,
  MAIN_URL,
  UPDATE_CATEGORY_API,
  UPDATE_LANGUAGE_API,
  UPDATE_SUBCATEGORY_API,
  UPDATE_TAG_API,
} from 'src/constant'
// export const MAIN_url = 'http://localhost:8002'

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 402 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = Cookies.get('refreshToken')
        const res = await axios.post(`${MAIN_URL}/admin/refreshToken`, { refreshToken })
        const accessToken = res.data.refreshToken
        // console.log(res.data.refreshToken, 'Api js page')
        Cookies.set('accessToken', accessToken)

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        // console.log(originalRequest)

        return axios(originalRequest)
      } catch (refreshError) {
        // Handle refresh token error or redirect to login
        console.error('Error refreshing token:', refreshError)
        // You might want to redirect to login or handle the error in another way
      }
    }

    if (error.response.status === 405) {
      Cookies.remove('accessToken')
      window.location.reload()
    }

    return Promise.reject(error)
  },
)
/* ------------------------------ ALL ADMIN API ----------------------------- */
/* Admin login api */
export const adminLogin = (data) => axios.post(MAIN_URL + ADMIN_LOGIN_API, data)

/* Admin forgot password api */
export const forgotPassword = (data) => axios.post(MAIN_URL + ADMIN_FORGOT_PASSWORD_API, data)

// Admin reset password
export const resetPassword = (data) => axios.post(MAIN_URL + ADMIN_RESET_PASSWORD_API, data)

/*   Admin profile change password - */
export const changePassword = (data) =>
  axios.post(MAIN_URL + ADMIN_EDIT_PROFILE_PASSWORD_API, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/*  update Admin Profile  */
export const UpdateProfile = (data) =>
  axios.post(MAIN_URL + ADMIN_EDIT_PROFILE_PASSWORD_API, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* ------------------------------ END ADMIN API ----------------------------- */

/* ---------------------------- ALL LANGUAGE API ---------------------------- */
/*  Get All Languages  */
export const getAllLanguage = (data) =>
  axios.get(MAIN_URL + All_LANGUAGE_LIST_API, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/*  add Languages  */
export const addLanguage = (data) =>
  axios.post(MAIN_URL + ADD_LANGUAGE_API, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/*  update Languages  */
export const updateLanguage = (data, id) =>
  axios.put(MAIN_URL + UPDATE_LANGUAGE_API + id, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/*  delete Languages  */
export const deleteLanguage = (id) =>
  axios.delete(MAIN_URL + DELETE_LANGUAGE_API + id, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* ----------------------------------- END LANGUAGE API ---------------------------------- */

/* ---------------------------- ALL CATEGORY API ---------------------------- */
/* add Category  */
export const addCategory = (data) =>
  axios.post(MAIN_URL + ADD_CATEGORY_API, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* Get All Category  */
export const getAllCategory = (data) =>
  axios.get(MAIN_URL + All_CATEGORY_LIST_API, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* delete Category */
export const deleteCategory = (id) =>
  axios.delete(MAIN_URL + DELETE_CATEGORY_API + id, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* update Category  */
export const updateCategory = (data, id) =>
  axios.put(MAIN_URL + UPDATE_CATEGORY_API + id, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })
/* ---------------------------- END CATEGORY API ---------------------------- */

/* ---------------------------- ALL  SUB CATEGORY API ---------------------------- */

/* Get All subCategory  */
export const getAllSubCategory = (data) =>
  axios.get(MAIN_URL + All_SUBCATEGORY_LIST_API, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

export const addSubCategory = (data) =>
  axios.post(MAIN_URL + ADD_SUBCATEGORY_API, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* delete Category */
export const deleteSubCategory = (id) =>
  axios.delete(MAIN_URL + DELETE_SUBCATEGORY_API + id, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* update Category  */
export const updateSubCategory = (data, id) =>
  axios.put(MAIN_URL + UPDATE_SUBCATEGORY_API + id, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* ---------------------------- END SUB CATEGORY API ---------------------------- */

/* ---------------------------- ALL TAG API ---------------------------- */

/* Get All subCategory  */
export const getAllTag = (data) =>
  axios.get(MAIN_URL + All_TAG_LIST_API, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

export const addTag = (data) =>
  axios.post(MAIN_URL + ADD_TAG_API, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* delete Category */
export const deleteTag = (id) =>
  axios.delete(MAIN_URL + DELETE_TAG_API + id, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* update Category  */
export const updateTag = (data, id) =>
  axios.put(MAIN_URL + UPDATE_TAG_API + id, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* ---------------------------- ENDTAG API ---------------------------- */
