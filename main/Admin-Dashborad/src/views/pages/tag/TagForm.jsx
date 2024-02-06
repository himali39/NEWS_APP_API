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
  CFormSelect,
} from '@coreui/react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { addTag, getAllLanguage, updateTag } from 'src/redux/api/api'

const TagForm = () => {
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()
  const [isUpdate, setIsUpdate] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [languageOptions, setLanguageOptions] = useState([])

  const { state } = useLocation()

  const handleChange = async (fieldName, fieldValue) => {
    clearErrors(fieldName, fieldValue)
    if (fieldName == 'languages') {
      setValue(fieldName, fieldValue)
    }
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
    isUpdate === ''
      ? addTag(data)
          .then((res) => {
            navigate('/tag')
          })
          .catch((err) => {
            if (!err.response.data.success) {
              toast.error(err.response.data.message)
            } else {
              setIsLoading(false)
            }
          })
      : updateTag(data, isUpdate)
          .then((res) => {
            navigate('/tag')
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
      console.log(editData)
      setIsUpdate(editData._id)
      setValue('tagName', editData.tagName)
      setValue('languages', editData.languages._id)
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
                <strong>Tag Form</strong>
              </CCardHeader>
              <CCardBody>
                <ToastContainer />
                <CForm className="row g-3 " onSubmit={handleSubmit(onSubmit)}>
                  <CCol xl={6} md={12}>
                    <CFormLabel>Tag</CFormLabel>
                    <CFormInput
                      type="text"
                      id="validationDefault01"
                      {...register('tagName', {
                        required: 'Tag is required',
                      })}
                      placeholder="tag name"
                      invalid={!!errors.tagName}
                    />
                    <CFormFeedback invalid>Tag is required</CFormFeedback>
                  </CCol>

                  <CCol xl={6} md={12}>
                    <CFormLabel>Language</CFormLabel>
                    <CFormSelect
                      id="languages"
                      name="languages"
                      {...register('languages', { required: 'Language is required' })}
                      onChange={(e) => handleChange('languages', e.target.value)}
                      invalid={!!errors.languages}
                      value={getValues('languages')}
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

                  <CCol xl={6} md={12} className="text-center submitButton">
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

export default TagForm
