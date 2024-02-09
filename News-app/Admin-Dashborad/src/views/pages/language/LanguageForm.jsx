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
import { addLanguage, updateLanguage } from 'src/redux/api/api'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const LanguageForm = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()
  const [newUrl, setNewUrl] = useState()
  const [isUpdate, setIsUpdate] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [defaultLoading, setDefaultLoading] = useState(true)

  const { state } = useLocation()

  const handleFileUpload = (e) => {
    const files = e.target.files[0]
    if (files) {
      const imageUrl = URL.createObjectURL(files)
      setNewUrl(imageUrl)
    } else {
      setNewUrl(null)
    }
  }

  const onSubmit = (data) => {
    let formData = new FormData() //formdata object
    Object.keys(data).forEach(function (key) {
      if (key === 'jsonFile' || key === 'flagImage') {
        if (data[key][0] !== undefined) {
          formData.append(key, data[key][0])
        }
      } else {
        formData.append(key, data[key])
      }
    })

    isUpdate === ''
      ? addLanguage(formData)
          .then((res) => {
            console.log(res)
            navigate('/language')
          })
          .catch((err) => {
            if (!err.response.data.success) {
              toast.error(err.response.data.message)
            } else {
              setIsLoading(false)
            }
          })
      : updateLanguage(formData, isUpdate)
          .then((res) => {
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
    if (state) {
      const { editData, imageUrl } = state
      setIsUpdate(editData._id)
      setValue('languagesName', editData.languagesName)
      setValue('displayName', editData.displayName)
      setValue('code', editData.code)
      setNewUrl(imageUrl + editData.jsonFile)
      setNewUrl(imageUrl + editData.flagImage)
    }
    setDefaultLoading(false)
  }, [])

  return (
    <div className=" bg-light min-vh-100">
      <CContainer className="mt-3">
        <CRow>
          <CCol md={8}>
            <CCard>
              <CCardHeader>
                <strong>Language Form</strong>
              </CCardHeader>
              <CCardBody>
                <ToastContainer />
                {defaultLoading ? (
                  <CButton disabled>
                    <CSpinner component="span" size="sm" aria-hidden="true" />
                    Loading...
                  </CButton>
                ) : (
                  <CForm className="row g-3 " onSubmit={handleSubmit(onSubmit)}>
                    <CCol xl={6} md={12}>
                      <CFormLabel>Language</CFormLabel>
                      <CFormInput
                        type="text"
                        id="languagesName"
                        {...register('languagesName', { required: 'Language is required' })}
                        invalid={!!errors.languagesName}
                        placeholder="Language Name"
                      />
                      <CFormFeedback invalid>Language is required</CFormFeedback>
                    </CCol>
                    <CCol xl={6} md={12}>
                      <CFormLabel>Display Name</CFormLabel>
                      <CFormInput
                        type="text"
                        id="displayName"
                        {...register('displayName', { required: 'displayName is required' })}
                        invalid={!!errors.displayName}
                        placeholder="Language displayName"
                      />
                      <CFormFeedback invalid>displayName is required</CFormFeedback>
                    </CCol>

                    {/* language code */}
                    <CCol xl={6} md={12}>
                      <CFormLabel>Code</CFormLabel>
                      <CFormInput
                        type="text"
                        id="code"
                        placeholder="Language code"
                        {...register('code', { required: 'Language code is required' })}
                        invalid={!!errors.code}
                      />
                      <CFormFeedback invalid>Language code is required</CFormFeedback>
                    </CCol>
                    {/* end of code */}

                    {/* language Json file */}
                    <CCol xl={6} md={12}>
                      <CFormLabel>
                        Json File
                        <span style={{ color: '#ff2d55', fontSize: '12px' }}>
                          Only Json file allow
                        </span>
                      </CFormLabel>
                      <CFormInput
                        type="file"
                        id="jsonFile"
                        aria-label="file example"
                        {...register('jsonFile', { required: 'Json File is required' })}
                        invalid={!!errors.jsonFile}

                        // onChange={handleFileUpload}
                      />
                      <CFormFeedback invalid>Json File is required</CFormFeedback>
                    </CCol>
                    {/* end of code */}

                    {/* flag img */}
                    <CCol xl={6} md={8}>
                      <CFormLabel>
                        Flag Image
                        <span style={{ color: '#ff2d55', fontSize: '12px' }}>
                          Only png, jpg, webp and jpeg image allow
                        </span>
                      </CFormLabel>
                      <CFormInput
                        type="file"
                        id="flagImage"
                        aria-label="file example"
                        {...register('flagImage')}
                        onChange={handleFileUpload}
                      />
                    </CCol>

                    <CCol xl={6} md={4}>
                      {newUrl && (
                        <>
                          <p>Image preview</p>
                          <img
                            src={newUrl}
                            alt="newUrl"
                            style={{
                              maxWidth: '40%',
                              borderRadius: '10px',
                              maxHeight: '40%',
                            }}
                          />
                        </>
                      )}
                    </CCol>
                    {/* end of code */}

                    <CCol className="submitButton">
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
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default LanguageForm
