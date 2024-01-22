import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CRow,
  CSpinner,
} from '@coreui/react'
import { useForm } from 'react-hook-form'
import { addLanguage, addUser, updateLanguage, updateUser } from 'src/redux/api/api'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const UserForm = () => {
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()
  const [newUrl, setNewUrl] = useState()
  const [isUpdate, setIsUpdate] = useState('')
  var [isLoading, setIsLoading] = useState(false)

  const { state } = useLocation()
  console.log(state)

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      setNewUrl(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const onSubmit = (data) => {
    let formData = new FormData() //formdata object
    Object.keys(data).forEach(function (key) {
      if (key === 'ProfileImg') {
        formData.append(key, data[key][0])
      } else {
        formData.append(key, data[key])
      }
    })

    isUpdate === ''
      ? addUser(formData)
          .then((res) => {
            console.log(res)
            navigate('/user')
          })
          .catch((err) => {
            console.log(err)
            if (!err.response.data.success) {
              toast.error(err.response.data.message)
            } else {
              setIsLoading(false)
            }
          })
      : updateUser(formData, isUpdate)
          .then((res) => {
            console.log(res)
            navigate('/language')
          })
          .catch((err) => {
            if (!err.response.data.success) {
              toast.error(err.response.data.message)
            } else {
              toast.error('Something Went Wrong!')
            }
            setIsLoading(false)
          })
  }
  useEffect(() => {
    // if (state) {
    //   const { editdata, imageUrl } = state
    //   console.log(state)
    //   setIsUpdate(editdata._id)
    //   setValue('languagesName', editdata.languagesName)
    //   setValue('displayName', editdata.displayName)
    //   setValue('code', editdata.code)
    //   setValue(imageUrl + editdata.jsonFile)
    //   setNewUrl(imageUrl + editdata.flagImage)
    //   console.log(editdata.flagImage)
    // }
    // setdefaultLoading(false)
  })
  return (
    <div className=" bg-light min-vh-100">
      <CContainer className="mt-3">
        <CRow>
          <CCol md={8}>
            <CCard>
              <CCardHeader>
                <strong>User Form</strong>
              </CCardHeader>
              <CCardBody>
                <ToastContainer />
                <CForm className="row g-3 " onSubmit={handleSubmit(onSubmit)}>
                  <CCol md={6}>
                    <CFormLabel htmlFor="validationDefault01">FullName</CFormLabel>
                    <CFormInput
                      type="text"
                      id="validationDefault01"
                      {...register('fullName', { required: 'fullName is required' })}
                      invalid={!!errors.fullName}
                    />
                    <CFormFeedback invalid>Language is required</CFormFeedback>
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel htmlFor="validationDefault01">UserName</CFormLabel>
                    <CFormInput
                      type="text"
                      id="validationDefault01"
                      {...register('userName', { required: 'User name is required' })}
                      invalid={!!errors.userName}
                    />
                    <CFormFeedback invalid>user Name is required</CFormFeedback>
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel htmlFor="validationDefault01">Email</CFormLabel>
                    <CFormInput
                      type="text"
                      id="validationDefault01"
                      {...register('email', { required: 'Email code is required' })}
                      invalid={!!errors.email}
                    />
                    <CFormFeedback invalid>Email code is required</CFormFeedback>
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel htmlFor="validationDefault01">Profile</CFormLabel>
                    <CFormInput
                      type="file"
                      id="ProfileImg"
                      aria-label="file example"
                      {...register('ProfileImg', { required: 'Profile Image is required' })}
                      invalid={!!errors.ProfileImg}
                      onChange={handleFileUpload}
                    />
                    <CFormFeedback invalid> Profile Img is required</CFormFeedback>
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel htmlFor="validationDefault01">
                      Flag Image
                      <span style={{ color: '#ff2d55', fontSize: '12px' }}>
                        Only png, jpg, webp and jpeg image allow
                      </span>
                    </CFormLabel>
                    <CFormInput
                      type="file"
                      id="validationTextarea"
                      aria-label="file example"
                      {...register('flagImage', { required: 'flag Image is required' })}
                      invalid={!!errors.flagImage}
                      onChange={handleFileUpload}
                    />
                    <CFormFeedback invalid>Flag Image is required</CFormFeedback>
                  </CCol>
                  <CCol md={12} className="text-center submitButton">
                    {isLoading ? (
                      <CButton disabled>
                        <CSpinner component="span" size="sm" aria-hidden="true" />
                        Loading...
                      </CButton>
                    ) : (
                      <CButton type="submit" className="AddButton">
                        {isUpdate === '' ? 'Add' : 'Update'}
                      </CButton>
                    )}
                  </CCol>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default UserForm
