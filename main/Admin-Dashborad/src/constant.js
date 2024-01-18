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

/* ---------------------------- END TAG API ---------------------------- */
