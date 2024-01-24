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
  addNews,
  getAllCategory,
  getAllLanguage,
  getAllLocation,
  getAllSubCategory,
  getAllTag,
  getCatByLanguage,
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
    clearErrors,
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
  const [selectedLanguage, setSelectedLanguage] = useState('')

  const { state } = useLocation()

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
  const handleMultiImgChange = (e) => {
    const files = e.target.files
    const multipleImgPreviews = Array.from(files).map((file) => URL.createObjectURL(file))
    setMultipleImageUrls(multipleImgPreviews)
    clearErrors('multipleImage')
  }

  const handleLangChange = async (languageId) => {
    setValue('languages', languageId)
    await CategoryList(languageId)
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
      const res = await getCatByLanguage(languageId, data)
      console.log(res)
      setCategoryOptions(res.data.category)
    } catch (err) {
      console.error(err)
    }
    // getAllCategory()
    //   .then((res) => {
    //     setCategoryOptions(res.data.category)
    //   })
    //   .catch((err) => {
    //     toast.error(err)
    //   })
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
  const TagList = () => {
    getAllTag()
      .then((res) => {
        setTagOptions(res.data.tag)
      })
      .catch((err) => {
        toast.error(err)
      })
  }

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
    LocationList()
    TagList()
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
                  {/* start language */}
                  <CCol md={6}>
                    <CFormLabel htmlFor="validationDefault01">Language</CFormLabel>
                    <CFormSelect
                      id="languages"
                      name="languages"
                      {...register('languages', { required: 'Language is required' })}
                      onChange={(e) => handleLangChange(e.target.value)}
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
                  {/* end language */}

                  {/* start-category field */}
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
                  {/* end category */}

                  {/* start subcategory */}
                  <CCol md={6}>
                    <CFormLabel>Sub Category</CFormLabel>
                    <CFormSelect
                      id="subcategory"
                      name="subcategory"
                      {...register('subcategory', { required: 'Sub category is required' })}
                      invalid={!!errors.subcategory}
                    >
                      <option value="">Select Sub Category</option>
                      {subCatOptions?.map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.subCategoryName}
                        </option>
                      ))}
                    </CFormSelect>
                    <CFormFeedback invalid>Sub category is required</CFormFeedback>
                  </CCol>
                  {/* end subcategory */}

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

                  {/* Start Expiry Date */}
                  <CCol md={6}>
                    <CFormLabel htmlFor="validationDefault01">Expiry Date</CFormLabel>
                    <CFormInput
                      type="date"
                      id="validationDefault01"
                      {...register('expiry_date', {
                        required: 'Expiry Date is required',
                      })}
                      placeholder="Expiry Date"
                      invalid={!!errors.expiry_date}
                    />
                    <CFormFeedback invalid>Expiry Date is required</CFormFeedback>
                  </CCol>
                  {/* End  Expiry Date  */}

                  {/* start location */}
                  <CCol md={6}>
                    <CFormLabel>Location</CFormLabel>
                    <CFormSelect
                      id="location"
                      name="location"
                      {...register('location', { required: 'Location is required' })}
                      invalid={!!errors.location}
                    >
                      <option value="">Select Location</option>
                      {locationOptions?.map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.locationName}
                        </option>
                      ))}
                    </CFormSelect>
                    <CFormFeedback invalid>Location is required</CFormFeedback>
                  </CCol>
                  {/* end location */}

                  {/* start tag */}
                  <CCol md={6}>
                    <CFormLabel>Tag</CFormLabel>
                    <CFormSelect
                      id="tag"
                      name="tag"
                      {...register('tag', { required: 'Tag is required' })}
                      invalid={!!errors.tag}
                    >
                      <option value="">Select Tag</option>
                      {tagOptions?.map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.tagName}
                        </option>
                      ))}
                    </CFormSelect>
                    <CFormFeedback invalid>Tag is required</CFormFeedback>
                  </CCol>
                  {/* end tag */}

                  {/* start image field */}
                  <CCol md={6}>
                    <CFormLabel>
                      News Images
                      <span className="errors">Only png, jpg, webp and jpeg image allow</span>
                    </CFormLabel>
                    <CFormInput
                      type="file"
                      id="newsImage"
                      {...register('newsImage', { required: 'newsImage is required' })}
                      className={errors.newsImage ? 'is-invalid' : ''}
                      onChange={(e) => {
                        handleSingleImgChange(e)
                      }}
                    />
                    {singleImageUrl && (
                      <img src={singleImageUrl} alt="Single Image" style={{ maxWidth: '20%' }} />
                    )}

                    {errors.newsImage && (
                      <CFormFeedback invalid>News Image is required</CFormFeedback>
                    )}
                  </CCol>
                  {/* end image */}

                  {/* start multiple image field */}
                  <CCol md={6}>
                    <CFormLabel htmlFor="validationDefault01">
                      Other Images
                      <span className="errors">Only png, jpg, webp and jpeg image allow</span>
                    </CFormLabel>

                    <CFormInput
                      type="file"
                      id="multipleImage"
                      className={errors.multipleImage ? 'is-invalid' : ''}
                      {...register('multipleImage', {
                        required: 'Image is required',
                      })}
                      invalid={!!errors.multipleImage}
                      onChange={(e) => {
                        handleMultiImgChange(e) // Assuming handleImageChange is a function you've defined
                      }}
                      multiple
                    />
                    {multipleImageUrls &&
                      multipleImageUrls.map((preview, index) => (
                        <img
                          key={index}
                          src={preview}
                          alt={`preview${index + 1}`}
                          width="60"
                          height="60"
                        />
                      ))}
                    {errors.newsImage && <CFormFeedback invalid> Image is required</CFormFeedback>}
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
