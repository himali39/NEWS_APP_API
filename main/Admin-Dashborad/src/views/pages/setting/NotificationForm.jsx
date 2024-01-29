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
  CFormSelect,
  CFormTextarea,
  CRow,
  CSpinner,
} from '@coreui/react'
import { useForm } from 'react-hook-form'
import { addNotification, getAllLanguage, updateNotification } from 'src/redux/api/api'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const NotificationForm = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()
  const [isUpdate, setIsUpdate] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { state } = useLocation()
  const [languageOptions, setLanguageOptions] = useState([])
  const [newUrl, setNewUrl] = useState()

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      setNewUrl(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const LanguagesList = () => {
    getAllLanguage()
      .then((res) => {
        setLanguageOptions(res.data.language)
      })
      .catch((err) => {
        toast.error(err)
      })
  }

  const onSubmit = (data) => {
    let formData = new FormData() //formdata object
    Object.keys(data).forEach(function (key) {
      if (key === 'notifiImage') {
        formData.append(key, data[key][0])
      } else {
        formData.append(key, data[key])
      }
    })
    isUpdate === ''
      ? addNotification(formData)
          .then((res) => {
            navigate('/notification')
          })
          .catch((err) => {
            if (!err.response.data.success) {
              toast.error(err.response.data.message)
            } else {
              setIsLoading(false)
            }
          })
      : updateNotification(formData, isUpdate)
          .then((res) => {
            navigate('/notification')
          })
          .catch((err) => {
            if (!err.response.data.success) {
              toast.error('Must be Fill All Field required')
            } else {
              toast.error('Something Went Wrong!')
            }
            setIsLoading(false)
          })
  }
  useEffect(() => {
    if (state) {
      const { editData } = state
      setIsUpdate(editData._id)
      setValue('title', editData.question)
      setValue('languages', editData.languages)
    }
    LanguagesList()
  }, [])
  return (
    <div className=" bg-light min-vh-100">
      <CContainer className="mt-3">
        <CRow>
          <CCol md={8}>
            <CCard>
              <CCardHeader>
                <strong>Notification Form</strong>
              </CCardHeader>
              <CCardBody>
                <ToastContainer />
                <CForm className="row g-3 " onSubmit={handleSubmit(onSubmit)}>
                  <CCol md={6}>
                    <CFormLabel>Language</CFormLabel>
                    <CFormSelect
                      id="languages"
                      name="languages"
                      {...register('languages', { required: 'Language is required' })}
                      invalid={!!errors.languages}
                    >
                      <option value="">Select Language</option>
                      {languageOptions?.map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.languagesName}
                        </option>
                      ))}
                    </CFormSelect>
                    {errors.languages && <div className="errors">{errors.languages.message}</div>}
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel>Title</CFormLabel>
                    <CFormInput
                      type="text"
                      id="title"
                      {...register('title', {
                        required: 'Title  is required',
                      })}
                      placeholder="Title"
                      invalid={!!errors.title}
                    />
                    <CFormFeedback invalid>Title is required</CFormFeedback>
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel>
                      Image
                      <span className="errors"> Only png, jpg, webp and jpeg image allow</span>
                    </CFormLabel>
                    <CFormInput
                      type="file"
                      id="notifiImage"
                      {...register('notifiImage', { required: 'Notification Image is required' })}
                      invalid={!!errors.notifiImage}
                      onChange={handleFileUpload}
                    />
                  </CCol>

                  {newUrl && (
                    <img
                      src={newUrl}
                      alt="Single Image"
                      style={{
                        maxWidth: '12%',
                        marginTop: '1.5rem',
                        borderRadius: '12px',
                      }}
                    />
                  )}

                  <CFormFeedback invalid> Notification Image is required </CFormFeedback>

                  <CCol md={12}>
                    <CFormLabel>Description</CFormLabel>
                    <CFormTextarea
                      id="description"
                      rows="6"
                      type="text"
                      placeholder="Description"
                      {...register('description', {
                        required: 'Description  is required',
                      })}
                      invalid={!!errors.description}
                    />
                    <CFormFeedback invalid>Description is required</CFormFeedback>
                  </CCol>

                  <CCol md={12} className="text-center submitButton">
                    {isLoading ? (
                      <CButton disabled>
                        <CSpinner component="span" size="sm" aria-hidden="true" />
                        Loading...
                      </CButton>
                    ) : (
                      <CButton type="submit" className="AddButton">
                        {isUpdate === '' ? 'Submit' : 'Update'}
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

export default NotificationForm
