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
import { cilLockLocked, cilUser, cilEnvelopeClosed } from '@coreui/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ChangePassword = () => {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const { token, adminid } = useParams()

  const onSubmit = async (data) => {}

  return (
    <div className="bg-light min-vh-100 profile">
      <CContainer className="profile-container">
        <CRow>
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4 profile-card">
                <CCardBody>
                  <CForm
                  //   onSubmit={handleSubmit(onSubmit)}
                  >
                    <h2 className="text-center mb-4">Edit Your Profile</h2>
                    <ToastContainer />
                    <div in={error}>
                      <p className="errors">{error ? error : ''}</p>
                    </div>

                    <CInputGroup className="mb-2">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        {...register('name', { required: ' name is required' })}
                        placeholder="name"
                        autoComplete="current-password"
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-2">
                      <CInputGroupText>
                        <CIcon icon={cilEnvelopeClosed} />
                      </CInputGroupText>
                      <CFormInput
                        {...register('email')}
                        type="text"
                        autoComplete="current-email"
                        disabled={true}
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-2">
                      <CFormInput
                        type="file"
                        {...register('profileImage', { required: 'New password is required' })}
                        id="validationTextarea"
                        aria-label="file example"
                        required
                      />
                    </CInputGroup>

                    <CRow className="update-button">
                      <CCol xs={6} md={4} className="mb-2 mb-md-0 ">
                        {/* <NavLink to="/"> */}
                        <CButton type="submit" className="w-100 custom-color">
                          {isLoading ? 'Loading...' : 'Update'}
                        </CButton>
                        {/* </NavLink> */}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm
                  //   onSubmit={handleSubmit(onSubmit)}
                  >
                    <h2 className="text-center mb-4">Change Password</h2>
                    <ToastContainer />
                    <div in={error}>
                      <p className="errors">{error ? error : ''}</p>
                    </div>
                    <CInputGroup className="mb-2">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        {...register('old-password', { required: 'Old Password is required' })}
                        placeholder="old-password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-2">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        {...register('newPassword', { required: 'New password is required' })}
                        type="password"
                        placeholder="new-password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-2">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        {...register('confirmPassword', {
                          required: 'confirm password is required',
                        })}
                        type="password"
                        placeholder="confirm Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>

                    <CRow className="update-button">
                      <CCol xs={6} md={4} className="mb-2 mb-md-0">
                        {/* <NavLink to="/"> */}
                        <CButton type="submit" className="w-100 custom-color">
                          {isLoading ? 'Loading...' : 'Reset Password'}
                        </CButton>
                        {/* </NavLink> */}
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

export default ChangePassword
