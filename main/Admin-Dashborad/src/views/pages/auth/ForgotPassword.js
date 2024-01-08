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
  CFormFeedback,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser, cilCircle } from '@coreui/icons'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState()

  const onSubmit = async (data) => {
    setError('')
    setSuccess('')
    setIsLoading(true)
    await axios
      .post('http://localhost:8002/admin/forgot-password', data)

      .then((res) => {
        console.log(res.status)
        if (res.data.status === 404 || res.data.success === false) {
          setError(res.data.message)
          setIsLoading(false)
        } else {
          setIsLoading(false)
          setSuccess('Check your mail box.')
          toast.success(res.data.message)
        }
      })
      .catch((err) => {
        // console.log(err.response.data)

        if (err.response.status === 401 || !err.response.data.success === false) {
          setError(err.response.data.message)
          setIsLoading(false)
          setSuccess(err.response.data.message)
        } else {
          setError('Something is wrong!')
          setIsLoading(false)
        }
      })
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
                    <h2 className="text-center mb-4">Forgot Password </h2>
                    <p className="text-medium-emphasis text-center">
                      Enter your email and we send you a link to reset your password
                    </p>
                    <CInputGroup className="mb-3">
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

                    {errors.email && <div>{errors.email.message}</div>}

                    <ToastContainer />

                    <CRow>
                      <CCol xs={12} md={6} className="mb-2 mb-md-0">
                        <CButton type="submit" className="w-100 custom-color">
                          {isLoading ? 'Loading...' : 'Submit'}
                        </CButton>
                      </CCol>

                      <CCol xs={12} md={6} className="text-center text-md-right">
                        <NavLink to="/">
                          <CButton color="link" className="px-0">
                            Back to Login
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

export default ForgotPassword
