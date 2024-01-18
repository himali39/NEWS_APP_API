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
import { Controller, useForm } from 'react-hook-form'
import { addCategory, getAllLanguage, updateCategory } from 'src/redux/api/api'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { MenuItem, Select } from '@mui/material'

const CategoryForm = () => {
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()
  const [newUrl, setNewUrl] = useState()
  const [isUpdate, setIsUpdate] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [languageOptions, setLanguageOptions] = useState([])

  const { state } = useLocation()

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
      if (key === 'categoryImage') {
        formData.append(key, data[key][0])
      } else {
        formData.append(key, data[key])
      }
    })

    isUpdate === ''
      ? addCategory(formData)
          .then((res) => {
            navigate('/category')
          })
          .catch((err) => {
            if (!err.response.data.success) {
              toast.error(err.response.data.message)
            } else {
              setIsLoading(false)
            }
          })
      : updateCategory(formData, isUpdate)
          .then((res) => {
            navigate('/category')
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
      const { editdata, imageUrl } = state
      setIsUpdate(editdata._id)
      setValue('categoryName', editdata.categoryName)
      setValue('languages', editdata.languages)
      setNewUrl(imageUrl + editdata.flagImage)
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
                <strong>Category Form</strong>
              </CCardHeader>
              <CCardBody>
                <ToastContainer />
                <CForm className="row g-3 " onSubmit={handleSubmit(onSubmit)}>
                  <CCol md={6}>
                    <CFormLabel htmlFor="validationDefault01">Category Name</CFormLabel>
                    <CFormInput
                      type="text"
                      id="validationDefault01"
                      {...register('categoryName', { required: 'category Name is required' })}
                      invalid={!!errors.categoryName}
                    />
                    <CFormFeedback invalid>category Name is required</CFormFeedback>
                  </CCol>

                  <CCol md={6}>
                    <CFormLabel htmlFor="validationDefault01">Language</CFormLabel>
                    <Controller
                      name="languages"
                      control={control}
                      rules={{ required: 'Language name is required' }}
                      render={({ field }) => (
                        <>
                          <Select
                            {...field}
                            style={{
                              width: '100%',
                              height: '36px',
                              borderRadius: '0.375rem',
                            }}
                            id="languages"
                            labelId="languages"
                            autoWidth={false}
                          >
                            <option value="" disabled selected>
                              Select Language
                            </option>
                            {languageOptions?.map((option) => (
                              <MenuItem key={option._id} value={option._id}>
                                {option?.languagesName}
                              </MenuItem>
                            ))}
                          </Select>
                        </>
                      )}
                    />
                    {errors.languages && <div className="errors">{errors.languages.message}</div>}
                  </CCol>

                  <CCol md={6}>
                    <CFormLabel htmlFor="validationDefault01">
                      Category Image
                      <span className="errors">Only png, jpg, webp and jpeg image allow</span>
                    </CFormLabel>
                    <CFormInput
                      type="file"
                      id="validationTextarea"
                      aria-label="file example"
                      {...register('categoryImage', { required: 'category Image is required' })}
                      invalid={!!errors.categoryImage}
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

export default CategoryForm
