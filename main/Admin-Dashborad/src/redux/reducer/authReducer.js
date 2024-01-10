import { LOGIN_SUCCESS, LOGOUT } from '../actions/action'
import Cookies from 'js-cookie'

const initialState = {
  isAuthenticated: false,
  admin: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      // const { data } = action
      // const { accessToken, refreshToken, admin } = data

      // // Set data in cookies
      // Cookies.set('accessToken', accessToken)
      // Cookies.set('refreshToken', refreshToken)
      // Cookies.set('adminId', admin._id)

      return {
        ...state,
        isAuthenticated: true,
        admin: action.data,
      }
    }

    case LOGOUT: {
      return {
        ...state,
        isAuthenticated: false,
        admin: null,
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export default authReducer
