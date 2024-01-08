import React from 'react'
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

const Login = () => {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:8002/admin/login', data).then((res) => {
        console.log(res.data)
      })
    } catch (error) {
      console.error('Login failed', error)
    }
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
                    <h1 className="text-center mb-4">Reset Your Password</h1>
                    <p className="text-medium-emphasis text-center">
                      Enter a new password for this email
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        {...register('otp', { required: 'Email is required' })}
                        placeholder="otp"
                        autoComplete="Otp"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        {...register('new-password', { required: 'Password is required' })}
                        type="password"
                        placeholder="new-password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        {...register('confirm-password', {
                          required: 'confirm password is required',
                        })}
                        type="password"
                        placeholder="confirm Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={12} md={6} className="mb-2 mb-md-0">
                        <NavLink to="/">
                          <CButton type="submit" className="w-100 custom-color">
                            Reset Password
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
