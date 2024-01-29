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
  const [defaultLoading, setDefaultLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [languageOptions, setLanguageOptions] = useState([])
  const [categoryOptions, setCategoryOptions] = useState([])
  const [subCatOptions, setSubCatOptions] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [locationOptions, setLocationOptions] = useState([])
  const [tagOptions, setTagOptions] = useState([])
  const [singleImageUrl, setSingleImageUrl] = useState(null)
  const [multipleImageUrls, setMultipleImageUrls] = useState([])
  const [videoDiv, setVideoDiv] = useState(false)
  const [videoFile, setVideoFile] = useState(null)

  const { state } = useLocation()

  /* language on change event*/
  const handleChange = async (fieldName, fieldValue) => {
    console.log(fieldName)
    clearErrors(fieldName, fieldValue)
    setValue(fieldName, fieldValue)
    if (fieldName == 'languages') {
      await CategoryList(fieldValue)
    }
    if (fieldName == 'category') {
      await subCategoryList(fieldValue)
    }
    if (fieldName == 'contentType') {
      const newVal = fieldValue == 2 ? true : false
      setVideoDiv(newVal)
    }
  }

  const handleVideoChange = (e) => {
    const file = e.target.files[0]
    setVideoFile(file)
  }
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
  const CategoryList = async (languageId) => {
    try {
      const res = await getCatByLanguage(languageId)
      if (res) {
        setCategoryOptions(res.data.category)
      } else {
        setCategoryOptions([])
      }
      setSubCatOptions([])
    } catch (err) {
      setCategoryOptions([])
      setSubCatOptions([])
      toast.error(err.response.data.message)
    }
  }

  /**list of sub category data */
  const subCategoryList = async (categoryId) => {
    try {
      const res = await getSubCatByCategory(categoryId)
      if (res) {
        setSubCatOptions(res.data.subCategory)
      } else {
        setSubCatOptions([])
      }
    } catch (err) {
      setSubCatOptions([])
      toast.error(err.response.data.message)
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
  const TagList = () => {
    getAllTag()
      .then((res) => {
        setTagOptions(res.data.tag)
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
        formData.append(key, data[key][0])
      } else if (key === 'multipleImage') {
        if (data[key] !== undefined) {
          for (let i = 0; i < data[key].length; i++) {
            formData.append('multipleImage', data[key][i])
          }
        }
      } else if (key === 'video') {
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
    LanguagesList()
    LocationList()
    TagList()
    if (state) {
      const { editData, imageUrl } = state
      setIsUpdate(editData._id)
      setValue('languages', editData.languages._id)
      CategoryList(editData.languages._id)
      setValue('category', editData.category._id)
      subCategoryList(editData.category._id)
      setValue('subcategory', editData.subcategory._id)
      setValue('title', editData.title)
      setValue('tag', editData.tag._id)
      setValue('location', editData.location._id)
      const expiry_date = new Date(editData.expiry_date)
      setValue('expiry_date', expiry_date)
      const formattedDate = expiry_date.toISOString().split('T')[0]
      setValue('expiry_date', formattedDate)
      setSelectedDate(formattedDate)
      setSingleImageUrl(imageUrl + editData.newsImage)
      // setMultipleImageUrls(imageUrl + editData.multipleImage)
      // setFormData(imageUrl + editData.video)
    }
    setDefaultLoading(false)
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
                {defaultLoading ? (
                  <CButton disabled>
                    <CSpinner component="span" size="sm" aria-hidden="true" />
                    Loading...
                  </CButton>
                ) : (
                  <CForm className="row g-3 " onSubmit={handleSubmit(onSubmit)}>
                    {/* start language */}
                    <CCol md={4}>
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
                        onChange={(e) => handleChange('category', e.target.value)}
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
                    <CCol md={4}>
                      <CFormLabel>Sub Category</CFormLabel>
                      <CFormSelect
                        id="subcategory"
                        name="subcategory"
                        {...register('subcategory', { required: 'Sub category is required' })}
                        invalid={!!errors.subcategory}
                        value={getValues('subcategory')}
                        onChange={(e) => handleChange('subcategory', e.target.value)}
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
                      <CFormLabel>Title</CFormLabel>
                      <CFormInput
                        type="text"
                        id="Title"
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
                      <CFormLabel>Expiry Date</CFormLabel>
                      <CFormInput
                        type="date"
                        id="expiry_date"
                        dateFormat="dd/MM/yyyy"
                        defaultValue={selectedDate || ''}
                        {...register('expiry_date', {
                          required: 'Expiry Date is required',
                        })}
                        placeholder="Expiry Date"
                        invalid={!!errors.expiry_date}
                        onChange={(e) => handleChange('expiry_date', e.target.value)}
                        minDate={new Date()} // Set minimum date to the current date
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
                        {...register('location', {
                          required: 'Location is required',
                        })}
                        invalid={!!errors.location}
                        value={getValues('location')}
                        onChange={(e) => handleChange('location', e.target.value)}
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
                        value={getValues('tag')}
                        onChange={(e) => handleChange('tag', e.target.value)}
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
                        <span className="errors"> Only png, jpg, webp and jpeg image allow</span>
                      </CFormLabel>
                      <CFormInput
                        type="file"
                        id="newsImage"
                        {...register(
                          'newsImage',
                          isUpdate
                            ? ''
                            : {
                                required: 'newsImage is required',
                              },
                        )}
                        className={errors.newsImage ? 'is-invalid' : ''}
                        onChange={(e) => {
                          handleSingleImgChange(e)
                        }}
                      />
                      {singleImageUrl && (
                        <img
                          src={singleImageUrl}
                          alt="Single Image"
                          style={{
                            maxWidth: '20%',
                            marginTop: '1.5rem',
                            borderRadius: '10px',
                            maxHeight: '40%',
                          }}
                        />
                      )}

                      {errors.newsImage && (
                        <CFormFeedback invalid>News Image is required</CFormFeedback>
                      )}
                    </CCol>
                    {/* end image */}

                    {/* start multiple image field */}
                    <CCol md={6}>
                      <CFormLabel>
                        Other Images
                        <span className="errors"> Only png, jpg, webp and jpeg image allow</span>
                      </CFormLabel>
                      <CFormInput
                        type="file"
                        id="multipleImage"
                        className={errors.multipleImage ? 'is-invalid' : ''}
                        {...register(
                          'multipleImage',
                          isUpdate
                            ? ''
                            : {
                                required: 'Image is required',
                              },
                        )}
                        invalid={!!errors.multipleImage}
                        onChange={(e) => {
                          handleMultiImgChange(e)
                        }}
                        multiple
                      />

                      {multipleImageUrls &&
                        multipleImageUrls.map((preview, index) => (
                          <img
                            key={index}
                            src={preview}
                            alt={`preview${index + 1}`}
                            style={{
                              maxWidth: '20%',
                              maxHeight: '40%',
                              marginTop: '1.5rem',
                              marginRight: '0.8rem',
                              borderRadius: '10px',
                            }}
                          />
                        ))}
                      {errors.newsImage && (
                        <CFormFeedback invalid> Image is required</CFormFeedback>
                      )}
                    </CCol>
                    {/* end image */}

                    {/* start contentType field */}
                    <CCol md={6}>
                      <CFormLabel>Content Type</CFormLabel>
                      <CFormSelect
                        id="contentType"
                        name="contentType"
                        {...register('contentType', {
                          required: 'contentType is required',
                        })}
                        invalid={!!errors.contentType}
                        value={getValues('contentType')}
                        onChange={(e) => handleChange('contentType', e.target.value)}
                      >
                        <option value="1">Standard Post </option>
                        <option value="2">Video Upload </option>
                      </CFormSelect>
                    </CCol>
                    {/* end contentType */}

                    {/* Video upload */}
                    {videoDiv && (
                      <>
                        <CCol md={4}>
                          <CFormLabel>
                            Video Upload
                            <span className="errors"> Only mp4 allow</span>
                          </CFormLabel>
                          <CFormInput
                            type="file"
                            id="video"
                            {...register(
                              'video',
                              videoDiv
                                ? ''
                                : {
                                    required: 'Video is required',
                                  },
                            )}
                            onChange={handleVideoChange}
                          />
                        </CCol>
                        <CCol md={2}>
                          {videoFile && (
                            <video
                              alt="Video"
                              style={{
                                maxWidth: '100%',
                                borderRadius: '10px',
                                maxHeight: '80%',
                              }}
                              controls
                              src={videoFile ? URL.createObjectURL(videoFile) : ''}
                            />
                          )}
                        </CCol>
                      </>
                    )}

                    {/* start Description Field */}
                    <CCol md={12}>
                      <CFormLabel>Description</CFormLabel>
                      <Controller
                        name="description"
                        control={control}
                        defaultValue={getValues('description')}
                        render={({ field }) => (
                          <ReactQuill
                            placeholder="Description"
                            value={field.value || ''}
                            onChange={field.onChange}
                            style={{ height: '200px', border: 'none' }}
                          />
                        )}
                      />
                    </CCol>
                    {/* end Description  */}

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
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default NewsForm
