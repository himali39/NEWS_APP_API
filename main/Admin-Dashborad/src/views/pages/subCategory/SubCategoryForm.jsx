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
    getValues,
    setValue,
    handleSubmit,
    control,
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
                      invalid={!!errors.subCategoryName}
                    />
                    <CFormFeedback invalid>sub Category is required</CFormFeedback>
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
                    {errors.languages && (
                      <CFormFeedback invalid>{errors.languages.message}</CFormFeedback>
                    )}
                  </CCol>

                  <CCol md={6}>
                    <CFormLabel htmlFor="validationDefault01">Category</CFormLabel>
                    <Controller
                      name="categoryName"
                      control={control}
                      rules={{ required: 'category is required' }}
                      render={({ field }) => (
                        <>
                          <Select
                            {...field}
                            style={{
                              width: '100%',
                              height: '36px',
                              borderRadius: '0.375rem',
                            }}
                            id="categoryName"
                            labelId="categoryName"
                            autoWidth={false}
                          >
                            <option value="" disabled selected>
                              Select Category
                            </option>
                            {categoryOptions?.map((option) => (
                              <MenuItem key={option._id} value={option._id}>
                                {option?.categoryName}
                              </MenuItem>
                            ))}
                          </Select>
                        </>
                      )}
                    />
                    {errors.categoryName && (
                      <CFormFeedback invalid>{errors.categoryName.message}</CFormFeedback>
                    )}
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
