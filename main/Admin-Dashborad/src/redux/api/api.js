import axios from 'axios'
import Cookies from 'js-cookie'
import {
  ACTIVE_USER_API,
  ADD_CATEGORY_API,
  ADD_FAQS_API,
  ADD_LANGUAGE_API,
  ADD_LOCATION_API,
  ADD_NEWS_API,
  ADD_NOTIFICATION_API_API,
  ADD_SUBCATEGORY_API,
  ADD_TAG_API,
  ADD_USER_API,
  ADMIN_EDIT_PROFILE_PASSWORD_API,
  ADMIN_FORGOT_PASSWORD_API,
  ADMIN_LOGIN_API,
  ADMIN_RESET_PASSWORD_API,
  All_CATEGORY_LIST_API,
  All_LANGUAGE_LIST_API,
  All_LOCATION_LIST_API,
  All_NEWS_LIST_API,
  All_SUBCATEGORY_LIST_API,
  All_TAG_LIST_API,
  All_USER_LIST_API,
  DELETE_CATEGORY_API,
  DELETE_FAQS_API,
  DELETE_FEEDBACK_API,
  DELETE_LANGUAGE_API,
  DELETE_LOCATION_API,
  DELETE_MULTIPLE_CATEGORY_API,
  DELETE_MULTIPLE_LANGUAGES_API,
  DELETE_MULTIPLE_NEWS_API,
  DELETE_MULTIPLE_SUBCATE_API,
  DELETE_MULTIPLE_TAG_API,
  DELETE_MULTIPLE_USER_API,
  DELETE_NEWS_API,
  DELETE_NOTIFICATION_API,
  DELETE_SUBCATEGORY_API,
  DELETE_TAG_API,
  DELETE_USER_API,
  GET_CATEGORY_BY_LANGUAGE_API,
  GET_CATEGORY_WISE_NEWS_API,
  GET_COUNT_DASHBORD_API,
  GET_FAQS_API,
  GET_FEEDBACK_API,
  GET_LANGAUGES_WISE_NEWS_API,
  GET_NOTIFICATION_API,
  GET_SUBCATE_BY_CATEGORY_API,
  MAIN_URL,
  UPDATE_CATEGORY_API,
  UPDATE_CATEGORY_STATUS_API,
  UPDATE_FAQS_API,
  UPDATE_LANGUAGE_API,
  UPDATE_LOCATION_API,
  UPDATE_NEWS_API,
  UPDATE_NEWS_STATUS_API,
  UPDATE_NOTIFICATION_API,
  UPDATE_SUBCATEGORY_API,
  UPDATE_SUBCATEGORY_STATUS_API,
  UPDATE_TAG_API,
  UPDATE_TAG_STATUS_API,
  UPDATE_USER_API,
} from 'src/constant'
// export const MAIN_url = 'http://localhost:8002'

axios.interceptors.response.use(
  (response) => response,
  async (err) => {
    const originalRequest = err.config

    if (err.response.status === 402 && !originalRequest._retry) {
      originalRequest._retry = true
      Cookies.remove('accessToken')
      Cookies.remove('refreshToken')
      Cookies.remove('admin')
      window.location.reload()
      // try {
      //   const refreshToken = Cookies.get('refreshToken')

      //   const res = await axios.post(`${MAIN_URL}/admin/refreshToken`, { refreshToken })

      //   const accessToken = res.data.refreshToken

      //   Cookies.set('accessToken', accessToken)

      //   // Retry the original request with the new token
      //   originalRequest.headers.Authorization = `Bearer ${accessToken}`

      //   return axios(originalRequest)
      // } catch (refresherr) {
      //   console.err('err refreshing token:', refresherr)
      //   // You might want to redirect to login or handle the err in another way
      // }
    }

    if (err.response.status === 405) {
      Cookies.remove('accessToken')
      window.location.reload()
    }

    return Promise.reject(err)
  },
)
// axios.interceptors.response.use(
//   (response) => response,
//   async (err) => {
//     if (err.response.status === 401 || err.response.status === 403) {
//       // Handle unauthorized or forbidden access (token expired) here
//       // For example, you can redirect the user to the login page or perform other actions
//       console.error('Token expired or unauthorized access')
//     }

//     if (err.response.status === 405) {
//       // Handle other specific errors if needed
//       // For example, you can remove the access token and reload the page
//       Cookies.remove('accessToken')
//       window.location.reload()
//     }

//     return Promise.reject(err)
//   },
// )

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
export const getAllLanguage = () =>
  axios.get(MAIN_URL + All_LANGUAGE_LIST_API, {
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

/* delete MULTIPLE NEWS  */
export const deleteMultipleLanguages = (data) =>
  axios.delete(MAIN_URL + DELETE_MULTIPLE_LANGUAGES_API, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
    data: { ids: data },
  })
/* ----------------------------------- END LANGUAGE API ---------------------------------- */

/* ---------------------------- ALL CATEGORY API ---------------------------- */
/* add Category  */
export const addCategory = (data) =>
  axios.post(MAIN_URL + ADD_CATEGORY_API, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* Get All Category  */
export const getAllCategory = () =>
  axios.get(MAIN_URL + All_CATEGORY_LIST_API, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* delete Category */
export const deleteCategory = (id) =>
  axios.delete(MAIN_URL + DELETE_CATEGORY_API + id, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* delete MULTIPLE category  */
export const deleteMultipleCategory = (data) =>
  axios.delete(MAIN_URL + DELETE_MULTIPLE_CATEGORY_API, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
    data: { ids: data },
  })

/* update Category  */
export const updateCategory = (data, id) =>
  axios.put(MAIN_URL + UPDATE_CATEGORY_API + id, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* update Category STATUS  */
export const updateCategoryStatus = (data, id) =>
  axios.put(MAIN_URL + UPDATE_CATEGORY_STATUS_API + id, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* ---------------------------- END CATEGORY API ---------------------------- */

/* ---------------------------- ALL  SUB CATEGORY API ---------------------------- */
/* Get All subCategory  */
export const getAllSubCategory = () =>
  axios.get(MAIN_URL + All_SUBCATEGORY_LIST_API, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/** add subcategory*/
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

/* delete MULTIPLE SUB-category  */
export const deleteMultipleSubCate = (data) =>
  axios.delete(MAIN_URL + DELETE_MULTIPLE_SUBCATE_API, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
    data: { ids: data },
  })

/* update subCategory STATUS  */
export const updateSubCatStatus = (data, id) =>
  axios.put(MAIN_URL + UPDATE_SUBCATEGORY_STATUS_API + id, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })
/* ---------------------------- END SUB CATEGORY API ---------------------------- */

/* ---------------------------- ALL TAG API ---------------------------- */

/** add Tag */
export const addTag = (data) =>
  axios.post(MAIN_URL + ADD_TAG_API, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* delete tag */
export const deleteTag = (id) =>
  axios.delete(MAIN_URL + DELETE_TAG_API + id, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* update Tag  */
export const updateTag = (data, id) =>
  axios.put(MAIN_URL + UPDATE_TAG_API + id, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })
/* update Tag STATUS  */
export const updateTagStatus = (data, id) =>
  axios.put(MAIN_URL + UPDATE_TAG_STATUS_API + id, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* delete MULTIPLE Tag  */
export const deleteMultipleTag = (data) =>
  axios.delete(MAIN_URL + DELETE_MULTIPLE_TAG_API, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
    data: { ids: data },
  })

/* Get All Tag  */
export const getAllTag = () =>
  axios.get(MAIN_URL + All_TAG_LIST_API, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* ---------------------------- ENDTAG API ---------------------------- */

/* ---------------------------- ALL Location API ---------------------------- */
/* Get All location  */
export const getAllLocation = () =>
  axios.get(MAIN_URL + All_LOCATION_LIST_API, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* add location*/
export const addLocation = (data) =>
  axios.post(MAIN_URL + ADD_LOCATION_API, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* delete location */
export const deleteLocation = (id) =>
  axios.delete(MAIN_URL + DELETE_LOCATION_API + id, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* update location  */
export const updateLocation = (data, id) =>
  axios.put(MAIN_URL + UPDATE_LOCATION_API + id, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* ---------------------------- END Location API ---------------------------- */

/* ---------------------------- ALL News API ---------------------------- */
/* Get All news  */
export const getAllNews = () =>
  axios.get(MAIN_URL + All_NEWS_LIST_API, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* add news*/
export const addNews = (data) =>
  axios.post(MAIN_URL + ADD_NEWS_API, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* delete news */
export const deleteNews = (id) =>
  axios.delete(MAIN_URL + DELETE_NEWS_API + id, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* update news  */
export const updateNews = (data, id) =>
  axios.put(MAIN_URL + UPDATE_NEWS_API + id, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* delete MULTIPLE NEWS  */
export const deleteMultipleNews = (data) =>
  axios.delete(MAIN_URL + DELETE_MULTIPLE_NEWS_API, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
    data: { ids: data },
  })

/* update news status */
export const updateNewsStatus = (data, id) =>
  axios.put(MAIN_URL + UPDATE_NEWS_STATUS_API + id, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* ---------------------------- END News API ---------------------------- */
/* ---------------------------- ALL User API ---------------------------- */
/* Get All user  */
export const getAllUser = () =>
  axios.get(MAIN_URL + All_USER_LIST_API, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* add User*/
export const addUser = (data) =>
  axios.post(MAIN_URL + ADD_USER_API, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* delete User  */
export const deleteUser = (id) =>
  axios.delete(MAIN_URL + DELETE_USER_API + id, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* delete MULTIPLE User  */
export const deleteMultipleUser = (data) =>
  axios.delete(MAIN_URL + DELETE_MULTIPLE_USER_API, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
    data: { ids: data },
  })

/* update User  */
export const updateUser = (data, id) =>
  axios.put(MAIN_URL + UPDATE_USER_API + id, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* ---------------------------- END User API ---------------------------- */

/* --------------------- Get All Category By languageId --------------------- */
export const getCatByLanguage = (languageId) =>
  axios.get(MAIN_URL + GET_CATEGORY_BY_LANGUAGE_API + languageId, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })
/* ------------------- Get All subCategory By category Id ------------------- */
export const getSubCatByCategory = (categoryId) =>
  axios.get(MAIN_URL + GET_SUBCATE_BY_CATEGORY_API + categoryId, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* ---------------------------- ALL FAQS API ---------------------------- */
/* Get All Faqs */
export const getFaqs = () =>
  axios.get(MAIN_URL + GET_FAQS_API, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* add Faqs*/
export const addFaqs = (data) =>
  axios.post(MAIN_URL + ADD_FAQS_API, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* delete FAQS  */
export const deleteFaqs = (id) =>
  axios.delete(MAIN_URL + DELETE_FAQS_API + id, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* update FAQS  */
export const updateFaqs = (data, id) =>
  axios.put(MAIN_URL + UPDATE_FAQS_API + id, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* ---------------------------- END FAQS API ---------------------------- */
/* ---------------------------- ALL Feedback API ---------------------------- */
/* Get All Feedback */
export const getFeedback = () =>
  axios.get(MAIN_URL + GET_FEEDBACK_API, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* delete Feedback  */
export const deleteFeedback = (id) =>
  axios.delete(MAIN_URL + DELETE_FEEDBACK_API + id, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* ---------------------------- ALL Notification API ---------------------------- */
/* Get All Notification */
export const getNotification = () =>
  axios.get(MAIN_URL + GET_NOTIFICATION_API, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* add Notification*/
export const addNotification = (data) =>
  axios.post(MAIN_URL + ADD_NOTIFICATION_API_API, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* delete Notification  */
export const deleteNotification = (id) =>
  axios.delete(MAIN_URL + DELETE_NOTIFICATION_API + id, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* update Notification  */
export const updateNotification = (data, id) =>
  axios.put(MAIN_URL + UPDATE_NOTIFICATION_API + id, data, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })
/* Get All Dashboard */
export const getDashboradCount = () =>
  axios.get(MAIN_URL + GET_COUNT_DASHBORD_API, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* Get All get Language Wise News */
export const getLanguageWiseNews = () =>
  axios.get(MAIN_URL + GET_LANGAUGES_WISE_NEWS_API, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* Get All Category Wise News */
export const getCategoryWiseNews = () =>
  axios.get(MAIN_URL + GET_CATEGORY_WISE_NEWS_API, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })

/* active User  */
export const ActiveUserList = () =>
  axios.get(MAIN_URL + ACTIVE_USER_API, {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  })
