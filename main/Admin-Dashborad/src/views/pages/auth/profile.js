import React from 'react'
import { CContainer, CRow, CCol, CCardGroup, CCardBody } from '@coreui/react'
import 'react-toastify/dist/ReactToastify.css'
import EditProfile from './EditProfile'
import ChangePassword from './ChangePassword'

const Profile = () => {
  return (
    <div className="bg-light min-vh-100 profile">
      <CContainer className="profile-container">
        <CRow>
          <CCol md={6}>
            <CCardGroup>
              <CCardBody>
                <EditProfile />
              </CCardBody>
            </CCardGroup>
          </CCol>
          <CCol md={6}>
            <CCardGroup>
              <CCardBody>
                <ChangePassword />
              </CCardBody>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Profile
