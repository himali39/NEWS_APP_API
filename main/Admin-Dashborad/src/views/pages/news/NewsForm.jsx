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
import { Controller, useForm } from 'react-hook-form'
import {
  addNews,
  getAllCategory,
  getAllLanguage,
  getAllSubCategory,
  updateNews,
} from 'src/redux/api/api'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { MenuItem, Select } from '@mui/material'

const NewsForm = () => {
  const {
    register,
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
  const [categoryOptions, setCategoryOptions] = useState([])
  const [subcatOptions, setSubCatOptions] = useState([])

  const { state } = useLocation()

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      setNewUrl(reader.result)
    }
    reader.readAsDataURL(file)
  }
  /* list of languages data*/
  const LanguagesList = () => {
    getAllLanguage()
      .then((res) => {
        setLanguageOptions(res.data.language)
      })
      .catch((err) => {
        toast.error(err)
      })
  }
  /** list of Category data */
  const CategoryList = () => {
    getAllCategory()
      .then((res) => {
        setCategoryOptions(res.data.category)
      })
      .catch((err) => {
        toast.error(err)
      })
  }

  /**list of sub category data */
  const subCategoryList = () => {
    getAllSubCategory()
      .then((res) => {
        setSubCatOptions(res.data.subCategory)
      })
      .catch((err) => {
        toast.error(err)
      })
  }

  const onSubmit = (data) => {
    let formData = new FormData() //formdata object
    Object.keys(data).forEach(function (key) {
      if (key === 'newsImage') {
        formData.append(key, data[key][0])
      } else {
        formData.append(key, data[key])
      }
    })

    isUpdate === ''
      ? addNews(formData)
          .then((res) => {
            navigate('/news')
          })
          .catch((err) => {
            if (!err.response.data.success) {
              toast.error(err.response.data.message)
            } else {
              setIsLoading(false)
            }
          })
      : updateNews(formData, isUpdate)
          .then((res) => {
            navigate('/news')
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
    // if (state) {
    //   const { editdata, imageUrl } = state
    //   setIsUpdate(editdata._id)
    //   setValue('categoryName', editdata.categoryName)
    //   setValue('languages', editdata.languages)
    //   setNewUrl(imageUrl + editdata.flagImage)
    // }
    LanguagesList()
    CategoryList()
    subCategoryList()
  }, [])
  return (
    <div className=" bg-light min-vh-100">
      <CContainer className="mt-3">
        <CRow>
          <CCol md={8}>
            <CCard>
              <CCardHeader>
                <strong>News Form</strong>
              </CCardHeader>
              <CCardBody>
                <ToastContainer />
                <CForm className="row g-3 " onSubmit={handleSubmit(onSubmit)}>
                  {/* start-category field */}
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
                      <div className="errors">{errors.categoryName.message}</div>
                    )}
                  </CCol>
                  {/* end category */}

                  {/* start subcategory */}
                  <CCol md={6}>
                    <CFormLabel htmlFor="validationDefault01">Sub Category</CFormLabel>
                    <Controller
                      name="subcategory"
                      control={control}
                      rules={{ required: 'subcategory is required' }}
                      render={({ field }) => (
                        <>
                          <Select
                            {...field}
                            style={{
                              width: '100%',
                              height: '36px',
                              borderRadius: '0.375rem',
                            }}
                            id="subcategory"
                            labelId="subcategory"
                            autoWidth={false}
                          >
                            <option value="" disabled selected>
                              Select subcategory
                            </option>
                            {subcatOptions?.map((option) => (
                              <MenuItem key={option._id} value={option._id}>
                                {option?.subCategoryName}
                              </MenuItem>
                            ))}
                          </Select>
                        </>
                      )}
                    />
                    {errors.subcategory && (
                      <div className="errors">{errors.subcategory.message}</div>
                    )}
                  </CCol>
                  {/* end subcategory */}

                  {/* start language */}
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
                  {/* end language */}

                  {/* start Title */}
                  <CCol md={6}>
                    <CFormLabel htmlFor="validationDefault01">Title</CFormLabel>
                    <CFormInput
                      type="text"
                      id="validationDefault01"
                      {...register('title', {
                        required: 'Title is required',
                      })}
                      placeholder="Title name"
                      invalid={!!errors.title}
                    />
                    <CFormFeedback invalid>Title is required</CFormFeedback>
                  </CCol>
                  {/* end title */}

                  <CCol md={6}>
                    <CFormLabel htmlFor="validationDefault01">Expiry Date</CFormLabel>
                    <CFormInput
                      type="date"
                      id="validationDefault01"
                      {...register('expiry_date', {
                        required: 'expiry_date is required',
                      })}
                      placeholder="Expiry_date name"
                      invalid={!!errors.expiry_date}
                    />
                    <CFormFeedback invalid>Expiry Date is required</CFormFeedback>
                  </CCol>
                  {/* start image field */}
                  <CCol md={6}>
                    <CFormLabel htmlFor="validationDefault01">
                      News Image
                      <span className="errors">Only png, jpg, webp and jpeg image allow</span>
                    </CFormLabel>
                    <CFormInput
                      type="file"
                      id="validationTextarea"
                      aria-label="file example"
                      {...register('newsImage', { required: 'News Image is required' })}
                      invalid={!!errors.newsImage}
                      onChange={handleFileUpload}
                    />
                    <CFormFeedback invalid>Flag Image is required</CFormFeedback>
                  </CCol>
                  {/* end image */}

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

export default NewsForm
