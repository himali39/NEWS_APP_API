export const MAIN_URL = 'http://localhost:8002'
// const MAIN_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8002' : ''

/* ---------------------------- ALL ADMIN API ---------------------------- */
/*  admin login   */
export const ADMIN_LOGIN_API = '/admin/login'

/*  admin forgot password  */
export const ADMIN_FORGOT_PASSWORD_API = '/admin/forgot-password'

/*  admin reset password  */
export const ADMIN_RESET_PASSWORD_API = '/admin/reset-password'

/*  admin change password  */
export const ADMIN_CHANGE_PASSWORD_API = '/admin/change-password'

/*  Get admin profile  */
export const ADMIN_EDIT_PROFILE_PASSWORD_API = '/admin/edit-profile'

/* ---------------------------- END ADMIN API ---------------------------- */

/* ---------------------------- ALL LANGUAGE API ---------------------------- */
/* all language list */
export const All_LANGUAGE_LIST_API = '/admin/language/get-Language'

/* add language data */
export const ADD_LANGUAGE_API = '/admin/language/add-Language'

/* update language  */
export const UPDATE_LANGUAGE_API = '/admin/language/update-Language/'

/* delete language  */
export const DELETE_LANGUAGE_API = '/admin/language/delete-Language/'

/*  delete MULTIPLE language  */
export const DELETE_MULTIPLE_LANGUAGES_API = '/admin/language/multidelete-Language'

/* ---------------------------- END LANGUAGE API ---------------------------- */

/* ---------------------------- ALL CATEGORY API ---------------------------- */

/*  all category list */
export const All_CATEGORY_LIST_API = '/admin/category/get-Category'

/*  add category data */
export const ADD_CATEGORY_API = '/admin/category/add-Category'

/*  delete category  */
export const DELETE_CATEGORY_API = '/admin/category/delete-Category/'

/*  update category  */
export const UPDATE_CATEGORY_API = '/admin/category/update-Category/'

/*  update status category  */
export const UPDATE_CATEGORY_STATUS_API = '/admin/category/update-Status/'

/*  delete category  */
export const DELETE_MULTIPLE_CATEGORY_API = '/admin/category/multidelete-Category'

/* ---------------------------- END CATEGORY API ---------------------------- */

/* ---------------------------- ALL SUB CATEGORY API ---------------------------- */

/*  all subcategory list */
export const All_SUBCATEGORY_LIST_API = '/admin/subcategory/get-subCategory'

/*  add sub category data */
export const ADD_SUBCATEGORY_API = '/admin/subcategory/add-subCategory/'

/*  delete subcategory  */
export const DELETE_SUBCATEGORY_API = '/admin/subcategory/delete-subCategory/'

/*  update subcategory  */
export const UPDATE_SUBCATEGORY_API = '/admin/subcategory/update-subcategory/'

/*  update status sub category  */
export const UPDATE_SUBCATEGORY_STATUS_API = '/admin/subcategory/update-Status/'

/*  delete subcategory  */
export const DELETE_MULTIPLE_SUBCATE_API = '/admin/subcategory/multidelete-subCategory'

/* ---------------------------- END SUB CATEGORY API ---------------------------- */

/* ---------------------------- ALL TAG API ---------------------------- */

/*  all tag list */
export const All_TAG_LIST_API = '/admin/tag/get-Tag'

/*  add  tag data */
export const ADD_TAG_API = '/admin/tag/add-Tag/'

/*  delete tag  */
export const DELETE_TAG_API = '/admin/tag/delete-Tag/'

/*  update tag  */
export const UPDATE_TAG_API = '/admin/tag/update-Tag/'

/*  delete multiple tag  */
export const DELETE_MULTIPLE_TAG_API = '/admin/tag/multidelete-Tag'

/*  update status tag  */
export const UPDATE_TAG_STATUS_API = '/admin/tag/update-Status/'

/* ---------------------------- END TAG API ---------------------------- */

/* ---------------------------- ALL Location API ---------------------------- */

/*  all location list */
export const All_LOCATION_LIST_API = '/admin/location/get-Location'

/*  add  location data */
export const ADD_LOCATION_API = '/admin/location/add-Location/'

/*  delete location  */
export const DELETE_LOCATION_API = '/admin/location/delete-Location/'

/*  update location  */
export const UPDATE_LOCATION_API = '/admin/location/update-Location/'

/* ---------------------------- END Location API ---------------------------- */

/* ---------------------------- ALL News API ---------------------------- */

/*  all news list */
export const All_NEWS_LIST_API = '/admin/news/get-News'

/*  add  news data */
export const ADD_NEWS_API = '/admin/news/add-News'

/*  delete news  */
export const DELETE_NEWS_API = '/admin/news/delete-News/'

/*  update news  */
export const UPDATE_NEWS_API = '/admin/news/update-News/'

/*  delete MULTIPLE news  */
export const DELETE_MULTIPLE_NEWS_API = '/admin/news/multidelete-News'

/**update status */
export const UPDATE_NEWS_STATUS_API = '/admin/news/update-Status/'

/* ---------------------------- END News API ---------------------------- */

/* ---------------------------- ALL User API ---------------------------- */

/*  all user list */
export const All_USER_LIST_API = '/admin/get-user'

/*  add  User data */
export const ADD_USER_API = '/admin/add-user'

/*  delete USER  */
export const DELETE_USER_API = '/admin/delete-user/'

/*  update USER  */
export const UPDATE_USER_API = '/admin/update-user/'

/*  delete  multiple USER  */
export const DELETE_MULTIPLE_USER_API = '/admin/multidelete-user'

/*user active  */
export const ACTIVE_USER_API = '/admin/get-activeUser/'

/* ---------------------------- END User API ---------------------------- */

/* ---------------------------- ALL news page listing API ---------------------------- */
export const GET_CATEGORY_BY_LANGUAGE_API = '/admin/category/getCatByLanguage/'

export const GET_SUBCATE_BY_CATEGORY_API = '/admin/subcategory/getSubCatByCate/'
/* ---------------------------- END news page listing API ---------------------------- */

/* ---------------------------- ALL FAQS API ---------------------------- */
/*  add  FAQS data */
export const ADD_FAQS_API = '/admin/faqs/add-Faqs'

/**list of Faqs data */
export const GET_FAQS_API = '/admin/faqs/get-Faqs'

/*  delete FAQS  */
export const DELETE_FAQS_API = '/admin/faqs/delete-Faqs/'

/*  update FAQS  */
export const UPDATE_FAQS_API = '/admin/faqs/update-Faqs/'

/* ---------------------------- END FAQS API ---------------------------- */

/* ---------------------------- ALL Feedback API ---------------------------- */
/**list of feedback data */
export const GET_FEEDBACK_API = '/admin/feedback/get-Feedback'

/*  delete Feedback  */
export const DELETE_FEEDBACK_API = '/admin/feedback/delete-Feedback/'

/* ---------------------------- END Feedback API ---------------------------- */

/* ---------------------------- ALL Notification API ---------------------------- */
/** list of notification data */
export const GET_NOTIFICATION_API = '/admin/notification/get-Notification'

/* add Notification data */
export const ADD_NOTIFICATION_API_API = '/admin/notification/add-Notification'

/*  delete Notification  */
export const DELETE_NOTIFICATION_API = '/admin/notification/delete-Notification/'

/*  update Notification  */
export const UPDATE_NOTIFICATION_API = '/admin/notification/update-Notification/'

/* ---------------------------- END Notification API ---------------------------- */

/** list of notification data */
export const GET_COUNT_DASHBORD_API = '/admin/dashborad/count-Dashborad'

export const GET_CATEGORY_WISE_NEWS_API = '/admin/dashborad/categoryWiseNews'

export const GET_LANGAUGES_WISE_NEWS_API = '/admin/dashborad/languageWiseNews'
