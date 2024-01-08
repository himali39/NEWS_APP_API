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
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()

  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    setIsLoading(true)
    await axios
      .post('http://localhost:8002/admin/login', data)
      .then((res) => {
        if (res.data.isSuccess === 400 || res.data.isSuccess === false) {
          setError(res.data.message)
          setIsLoading(false)
        } else {
          setIsLoading(true)
          setSuccess('Check your mail box.')
          // toast.success(res.data.message)
        }
      })
      .catch((err) => {
        if (err.res.data.status === 401 || !err.res.data.isSuccess) {
          setError(err.response.data.message)
          setIsLoading(false)
        } else {
          setError('Something is wrong!')
          setIsLoading(false)
        }
      })

    navigate('/dashboard')
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
                    <div in={success}>
                      <p color="#40903c">{success ? success : ''}</p>
                    </div>
                    {errors.email && <div className="errors">{errors.email.message}</div>}

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
                    {errors.password && <div className="errors">{errors.password.message}</div>}

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
