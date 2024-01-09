// rootReducer.js
import { combineReducers } from 'redux'
import authReducer from '../store/authReducer'

const rootReducer = combineReducers({
  auth: authReducer,

})

export default rootReducer
