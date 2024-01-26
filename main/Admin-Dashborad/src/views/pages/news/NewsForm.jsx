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
import {
  addNews,
  getAllLanguage,
  getAllLocation,
  getAllTag,
  getCatByLanguage,
  getSubCatByCategory,
  updateNews,
} from 'src/redux/api/api'
import ReactQuill from 'react-quill'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-quill/dist/quill.snow.css'

const NewsForm = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    clearErrors,
    control,
    getValues,
  } = useForm()

  const navigate = useNavigate()

  const [isUpdate, setIsUpdate] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [languageOptions, setLanguageOptions] = useState([])
  const [categoryOptions, setCategoryOptions] = useState([])
  const [subCatOptions, setSubCatOptions] = useState([])
  const [locationOptions, setLocationOptions] = useState([])
  const [tagOptions, setTagOptions] = useState([])
  const [singleImageUrl, setSingleImageUrl] = useState(null)
  const [multipleImageUrls, setMultipleImageUrls] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [videoeUrl, setVideoUrl] = useState(null)

  const { state } = useLocation()

  /**Single image url handle change */
  const handleSingleImgChange = (e) => {
    const files = e.target.files[0]
    if (files) {
      const imageUrl = URL.createObjectURL(files)
      setSingleImageUrl(imageUrl)

      clearErrors('newsImage')
    } else {
      setSingleImageUrl(null)
    }
  }

  /**multiple image url handle change */
  const handleMultiImgChange = (e) => {
    const files = e.target.files
    const multipleImgPreviews = Array.from(files).map((file) => URL.createObjectURL(file))
    setMultipleImageUrls(multipleImgPreviews)
    clearErrors('multipleImage')
  }

  /* language on change event*/
  const handleLangChange = async (languageId) => {
    await CategoryList(languageId)
  }

  /**category on change event */
  const handleChangeCategory = async (categoryId) => {
    await subCategoryList(categoryId)
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
  const CategoryList = async (languageId, data) => {
    try {
      setValue('languages', languageId)
      const res = await getCatByLanguage(languageId, data)
      if (res) {
        await setCategoryOptions(res.data.category)
      } else {
        await setCategoryOptions([])
        await setSubCatOptions([])
      }
    } catch (err) {
      toast.error(err)
    }
  }

  /**list of sub category data */
  const subCategoryList = async (categoryId, data) => {
    try {
      setValue('category', categoryId)

      const res = await getSubCatByCategory(categoryId, data)
      if (res) {
        await setSubCatOptions(res.data.subCategory)
      } else {
        await setSubCatOptions([])
      }
    } catch (err) {
      toast.error(err)
    }
  }
  /* list of Location data*/
  const LocationList = () => {
    getAllLocation()
      .then((res) => {
        setLocationOptions(res.data.location)
      })
      .catch((err) => {
        toast.error(err)
      })
  }
  /* list of Tag data*/

  const onSubmit = (data) => {
    let formData = new FormData() // FormData object

    Object.keys(data).forEach(function (key) {
      if (key === 'newsImage') {
        if (data[key][0] !== undefined) {
          formData.append(key, data[key][0])
        }
      } else if (key === 'multipleImage') {
        if (data[key] !== undefined) {
          for (let i = 0; i < data[key].length; i++) {
            formData.append('multipleImage', data[key][i])
          }
        }
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
    if (state) {
      const { editData, imageUrl } = state
      setIsUpdate(editData._id)

      setValue('category', editData.category._id)
      setValue('languages', editData.languages._id)
      setValue('subcategory', editData.subcategory._id)

      setSingleImageUrl(imageUrl + editData.newsImage)
      setMultipleImageUrls(imageUrl + editData.multipleImage)
    }
    LanguagesList()
    CategoryList()
    subCategoryList()

    // setValue('languages', '65a6724f08068a8b9ffca92d')
  }, [])

  return (
    <div className=" bg-light min-vh-100">
      <CContainer className="mt-3">
        <CRow>
          <CCol md={10}>
            <CCard>
              <CCardHeader>
                <strong>News Form</strong>
              </CCardHeader>
              <CCardBody>
                <ToastContainer />
                <CForm className="row g-3 " onSubmit={handleSubmit(onSubmit)}>
                  {/* start language */}
                  <CCol md={4}>
                    <CFormLabel>Language</CFormLabel>
                    <CFormSelect
                      id="languages"
                      name="languages"
                      {...register('languages', { required: 'Language is required' })}
                      onChange={(e) => handleLangChange(e.target.value)}
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
                  {/* end language */}
                  {/* start-category field */}
                  <CCol md={4}>
                    <CFormLabel>Category</CFormLabel>
                    <CFormSelect
                      id="category"
                      name="category"
                      {...register('category', { required: 'category is required' })}
                      invalid={!!errors.category}
                      value={getValues('category')}
                      onChange={(e) => handleChangeCategory(e.target.value)}
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
                  {/* end category */}
                  {/* start subcategory */}
                  {/* <CCol md={4}>
                    <CFormLabel>Sub Category</CFormLabel>
                    <CFormSelect
                      id="subcategory"
                      name="subcategory"
                      {...register('subcategory', { required: 'Sub category is required' })}
                      invalid={!!errors.subcategory}
                      onChange={(e) => console.log(e.target.value)}
                      value={getValues('subcategory')}
                    >
                      <option value="">Select Sub Category</option>
                      {subCatOptions?.map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.subCategoryName}
                        </option>
                      ))}
                    </CFormSelect>
                    <CFormFeedback invalid>Sub category is required</CFormFeedback>
                  </CCol> */}
                  {/* end subcategory */}

                  {/* submit button */}
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
