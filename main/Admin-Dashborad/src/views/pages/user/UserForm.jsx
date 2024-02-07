import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormCheck,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
  CSpinner,
} from '@coreui/react'
import { useForm } from 'react-hook-form'
import { addUser, updateUser } from 'src/redux/api/api'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const UserForm = () => {
  const {
    register,
    setValue,
    handleSubmit,
    value,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()
  const [isUpdate, setIsUpdate] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [singleImageUrl, setSingleImageUrl] = useState(null)

  const { state } = useLocation()

  const handleFileUpload = (event) => {
    const file = event.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSingleImageUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = (data) => {
    let formData = new FormData() //formdata object
    Object.keys(data).forEach(function (key) {
      if (key === 'ProfileImg') {
        if (data[key][0] !== undefined) {
          formData.append(key, data[key][0])
        }
      } else {
        formData.append(key, data[key])
      }
    })

    isUpdate === ''
      ? addUser(formData)
          .then((res) => {
            navigate('/user')
          })
          .catch((err) => {
            if (!err.response.data.success) {
              toast.error(err.response.data.message)
            } else {
              setIsLoading(false)
            }
          })
      : updateUser(formData, isUpdate)
          .then((res) => {
            navigate('/user')
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
    if (state) {
      const { editData, imageUrl } = state
      setIsUpdate(editData._id)
      setValue('fullName', editData.fullName)
      setValue('userName', editData.userName)
      setValue('mobile', editData.mobile)
      setValue('email', editData.email)
      setValue('yourBio', editData.yourBio)
      setValue('gender', editData.gender)
      setSingleImageUrl(imageUrl + editData.ProfileImg)
    }
  }, [])
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
                  {/* fullName field */}
                  <CCol xl={6} md={12}>
                    <CFormLabel>FullName</CFormLabel>
                    <CFormInput
                      type="text"
                      id="fullName"
                      placeholder=" Enter your fullName"
                      {...register('fullName', { required: 'fullName is required' })}
                      invalid={!!errors.fullName}
                    />
                    <CFormFeedback invalid>FullName is required</CFormFeedback>
                  </CCol>
                  {/* end field */}

                  {/* userName field */}
                  <CCol xl={6} md={12}>
                    <CFormLabel>UserName</CFormLabel>
                    <CFormInput
                      type="text"
                      id="userName"
                      placeholder=" Enter User Name"
                      {...register('userName', { required: 'User name is required' })}
                      invalid={!!errors.userName}
                    />
                    <CFormFeedback invalid>user Name is required</CFormFeedback>
                  </CCol>
                  {/* end field */}

                  {/* password field */}
                  <CCol xl={6} md={12}>
                    <CFormLabel>Password</CFormLabel>
                    <CFormInput
                      type="password"
                      id="password"
                      placeholder=" Enter ypur password"
                      {...register('password', { required: 'Password is required' })}
                      invalid={!!errors.password}
                    />
                    <CFormFeedback invalid>Password is required</CFormFeedback>
                  </CCol>
                  {/* end field */}
                  {/* email field */}
                  <CCol xl={6} md={12}>
                    <CFormLabel>Email</CFormLabel>
                    <CFormInput
                      type="text"
                      id="email"
                      placeholder="Enter Email"
                      {...register('email', { required: 'Email code is required' })}
                      invalid={!!errors.email}
                    />
                    <CFormFeedback invalid>Email is required</CFormFeedback>
                  </CCol>
                  {/* end field */}

                  {/* Mobile field */}
                  <CCol xl={6} md={12}>
                    <CFormLabel>Mobile</CFormLabel>
                    <CFormInput
                      type="text"
                      id="mobile"
                      placeholder="Enter mobile"
                      {...register('mobile', {
                        required: 'Mobile  is required',
                        pattern: {
                          value: /^[0-9]*$/,
                          message: 'Enter only numbers for mobile',
                        },
                      })}
                      invalid={!!errors.mobile}
                    />
                    <CFormFeedback invalid>Mobile is required</CFormFeedback>
                  </CCol>
                  {/* end field */}

                  {/* Gender field */}
                  <CCol xl={6} md={12}>
                    <CFormLabel className="gender">Gender</CFormLabel>
                    <CFormCheck
                      type="radio"
                      inline
                      id="male"
                      name="gender"
                      label="Male"
                      value="male"
                      {...register('gender', { required: 'Gender is required' })}
                      onChange={(e) => setValue('male', e.target.value)}
                    />
                    <CFormCheck
                      type="radio"
                      inline
                      name="gender"
                      id="female"
                      value="female"
                      label="Female"
                      {...register('gender', { required: 'Gender is required' })}
                      onChange={(e) => setValue('female', e.target.value)}
                    />
                    <CFormCheck
                      type="radio"
                      inline
                      name="gender"
                      id="other"
                      value="other"
                      label="Other"
                      {...register('gender', { required: 'Gender is required' })}
                      onChange={(e) => setValue('female', e.target.value)}
                    />
                    <CFormFeedback invalid>Gender is required</CFormFeedback>
                  </CCol>
                  {/* end field */}

                  {/* Profile field */}
                  <CCol xl={6} md={12}>
                    <CFormLabel>Profile</CFormLabel>
                    <CFormInput
                      type="file"
                      id="ProfileImg"
                      {...register('ProfileImg')}
                      invalid={!!errors.ProfileImg}
                      onChange={handleFileUpload}
                    />
                    {singleImageUrl && (
                      <>
                        <p>Profile img :</p>
                        <img src={singleImageUrl} alt="Single Image" className="user-profile" />
                      </>
                    )}

                    <CFormFeedback invalid> Profile Img is required</CFormFeedback>
                  </CCol>
                  {/* end field */}

                  {/* Your Bio field */}
                  <CCol xl={6} md={12}>
                    <CFormLabel>Your Bio</CFormLabel>
                    <CFormTextarea
                      id="bioTextarea1"
                      rows="6"
                      type="text"
                      placeholder="Enter your Bio"
                      {...register('yourBio', { required: 'your Bio  is required' })}
                      invalid={!!errors.yourBio}
                    />
                    <CFormFeedback invalid>your Bio is required</CFormFeedback>
                  </CCol>
                  {/* end field */}

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
