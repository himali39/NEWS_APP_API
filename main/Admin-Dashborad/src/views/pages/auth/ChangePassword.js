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
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { changePassword } from 'src/redux/api/api'
import Cookies from 'js-cookie'

const ChangePassword = () => {
  const { register, handleSubmit } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const adminId = Cookies.get('adminId')

  const onSubmit = async (data, e) => {
    setIsLoading(true)
    changePassword(data)
      .then((response) => {
        console.log(response)
        // if (response.data.status === 200 && response.data.success) {
        //   e.target.reset()
        //   toast.success(response.data.messages)
        //   setIsLoading(false)
        // } else {
        //   setError(response.data.messages)
        //   setIsLoading(false)
        // }
      })
      .catch((err) => {
        console.log(err)

        // if ((err.response.data.status === 401 || 400) && !err.response.data.success)
        //   toast.error(err.response.data.message)
        // setIsLoading(false)
      })
  }

  return (
    <div className="bg-light min-vh-100 profile">
      <CContainer className="profile-container">
        <CRow>
          <CCol>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="text-center mb-4">Change Password</h2>
                    <ToastContainer />
                    <div in={error}>
                      <p className="errors">{error ? error : ''}</p>
                    </div>
                    <CInputGroup className="mb-4">
                      <CFormInput {...register('_id')} type="hidden" value={adminId} />

                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        {...register('old-password', { required: 'Old Password is required' })}
                        type="password"
                        placeholder="old-password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
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

                    <CInputGroup className="mb-4">
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
