import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardGroup,
  CCardBody,
  CForm,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
// import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../actions/loginUser'
import { loginSuccess } from 'src/actions/action'

const Login = () => {
  const { register, handleSubmit } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // const onSubmit = async (data) => {
  //   try {
  //     setIsLoading(true)
  //     // await dispatch(loginUser(data, navigate, setIsLoading, setError))
  //     // await loginUser(data, navigate, setIsLoading, setError)

  //   } catch (err) {

  //     console.error(err)
  //   }
  // }
  const onSubmit = () => {
    // Perform login logic (e.g., API call) and dispatch loginSuccess action
    const user = { username: 'exampleUser' }
    console.log(user)
    dispatch(loginSuccess(user))
  }

  return (
    <div className="login-page bg-light min-vh-100">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="text-center mb-4">Login</h1>
                    <p className="text-medium-emphasis text-center">Sign In to your account</p>
                    <div in={error}>
                      <p className="errors">{error ? error : ''}</p>
                    </div>
                    <CInputGroup className="mb-2">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>

                      <CFormInput
                        {...register('email', { required: 'Email is required' })}
                        placeholder="email"
                        autoComplete="email"
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-2">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        {...register('password', { required: 'Password is required' })}
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>

                    <CRow>
                      <CCol xs={12} md={6} className="mb-3 mb-md-0 mt-2">
                        <CButton type="submit" className="w-100 custom-color">
                          {isLoading ? 'Loading...' : 'Login'}
                        </CButton>
                      </CCol>
                      <CCol xs={12} md={6} className="text-center text-md-right">
                        <NavLink to="/forgot-password">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </NavLink>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
