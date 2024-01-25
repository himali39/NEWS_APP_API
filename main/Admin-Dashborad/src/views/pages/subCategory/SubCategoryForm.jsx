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
import {
  addCategory,
  addSubCategory,
  getAllCategory,
  getAllLanguage,
  updateCategory,
  updateSubCategory,
} from 'src/redux/api/api'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { MenuItem, Select } from '@mui/material'

const SubCategoryForm = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()
  const [isUpdate, setIsUpdate] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [languageOptions, setLanguageOptions] = useState([])
  const [categoryOptions, setCategoryOptions] = useState([])

  const { state } = useLocation()

  const LanguagesList = () => {
    getAllLanguage()
      .then((res) => {
        setLanguageOptions(res.data.language)
      })
      .catch((err) => {
        toast.error(err)
      })
  }

  const CategoryList = () => {
    getAllCategory()
      .then((res) => {
        setCategoryOptions(res.data.category)
      })
      .catch((err) => {
        toast.error(err)
      })
  }

  const onSubmit = (data) => {
    isUpdate === ''
      ? addSubCategory(data)
          .then((res) => {
            navigate('/sub-category')
          })
          .catch((err) => {
            if (!err.response.data.success) {
              toast.error(err.response.data.message)
            } else {
              setIsLoading(false)
            }
          })
      : updateSubCategory(data, isUpdate)
          .then((res) => {
            navigate('/sub-category')
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
      const { editdata } = state
      setIsUpdate(editdata._id)
      setValue('subCategoryName', editdata.subCategoryName)
      setValue('languages', editdata.languages)
    }
    LanguagesList()
    CategoryList()
  }, [])
  return (
    <div className=" bg-light min-vh-100">
      <CContainer className="mt-3">
        <CRow>
          <CCol md={8}>
            <CCard>
              <CCardHeader>
                <strong>Sub Category Form</strong>
              </CCardHeader>
              <CCardBody>
                <ToastContainer />
                <CForm className="row g-3 " onSubmit={handleSubmit(onSubmit)}>
                  <CCol md={6}>
                    <CFormLabel htmlFor="validationDefault01">Sub Category</CFormLabel>
                    <CFormInput
                      type="text"
                      id="validationDefault01"
                      {...register('subCategoryName', {
                        required: ' sub category is required',
                      })}
                      placeholder="sub category name"
                      invalid={!!errors.subCategoryName}
                    />
                    <CFormFeedback invalid>sub Category is required</CFormFeedback>
                  </CCol>

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
                    <CFormLabel>Category</CFormLabel>
                    <CFormSelect
                      id="category"
                      name="category"
                      {...register('category', { required: 'category is required' })}
                      invalid={!!errors.category}
                    >
                      <option value="">Select category</option>
                      {categoryOptions?.map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.categoryName}
                        </option>
                      ))}
                    </CFormSelect>
                    <CFormFeedback invalid>category Name is required</CFormFeedback>
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

export default SubCategoryForm
