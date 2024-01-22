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
  getAllLocation,
  getAllSubCategory,
  getAllTag,
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
  const [locationOptions, setLocationOptions] = useState([])
  const [tagOptions, setTagOptions] = useState([])
  const [singleImageUrl, setSingleImageUrl] = useState(null)
  const [multipleImageUrls, setMultipleImageUrls] = useState([])

  const { state } = useLocation()

  // const handleFileUpload = (event) => {
  //   const files = event.target.files

  //   // Check if it's a single file or multiple files
  //   if (files.length === 1) {
  //     // Single file upload
  //     const file = files[0]
  //     const reader = new FileReader()

  //     reader.onloadend = () => {
  //       setSingleImageUrl(reader.result)
  //     }

  //     reader.readAsDataURL(file)
  //   } else if (files.length > 1) {
  //     // Multiple file upload
  //     const fileUrls = []

  //     for (let i = 0; i < files.length; i++) {
  //       const reader = new FileReader()
  //       const file = files[i]

  //       reader.onloadend = () => {
  //         // Assuming you have an array state to store multiple image URLs
  //         fileUrls.push(reader.result)

  //         // Check if all files are processed before updating state
  //         if (fileUrls.length === files.length) {
  //           setMultipleImageUrls(fileUrls)
  //         }
  //       }

  //       reader.readAsDataURL(file)
  //     }
  //   }
  // }
  const handleImageChange = (e) => {
    const files = e.target.files

    const singleImagePreview = files.length === 1 ? URL.createObjectURL(files[0]) : null
    setSingleImageUrl(singleImagePreview)

    const multipleImagePreviews = Array.from(files).map((file) => URL.createObjectURL(file))
    setMultipleImageUrls(multipleImagePreviews)
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

    try {
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'newsImage' && typeof value === 'object' && !Array.isArray(value)) {
          // Handle single image
          formData.append('newsImage', value)
        } else if (Array.isArray(value)) {
          // Handle multiple images
          console.log(Array.isArray(value))
          value.forEach((file) => {
            formData.append('multipleImage', file) // Use 'multipleImage' as the key
          })
        } else {
          // Handle other fields
          formData.append(key, value)
        }
      })
    } catch (error) {
      console.error('Error building FormData:', error)
    }
    // let formData = new FormData() //formdata object

    // Object.keys(data).forEach(function (key) {
    //   if (key === 'newsImage') {
    //     formData.append(key, data[key])
    //   } else if (key === 'multipleImage') {
    //     // Handle multiple images
    //     for (let i = 0; i < data[key].length; i++) {
    //       formData.append(`multipleImage[${i}]`, data[key][i])
    //     }
    //   } else {
    //     formData.append(key, data[key])
    //   }
    // })

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
                  {/* start-category field */}
                  {/* <CCol md={6}>
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
                  </CCol> */}
                  {/* end category */}

                  {/* start subcategory */}
                  {/* <CCol md={6}>
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
                  </CCol> */}
                  {/* end subcategory */}

                  {/* start language */}
                  {/* <CCol md={6}>
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
                  </CCol> */}
                  {/* end language */}

                  {/* start Title */}
                  {/* <CCol md={6}>
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
                  </CCol> */}
                  {/* end title */}

                  {/* Start Expiry Date */}
                  {/* <CCol md={6}>
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
                  </CCol> */}
                  {/* End  Expiry Date  */}

                  {/* start location */}
                  {/* <CCol md={6}>
                    <CFormLabel htmlFor="validationDefault01">Location</CFormLabel>
                    <Controller
                      name="location"
                      control={control}
                      rules={{ required: 'location name is required' }}
                      render={({ field }) => (
                        <>
                          <Select
                            {...field}
                            style={{
                              width: '100%',
                              height: '36px',
                              borderRadius: '0.375rem',
                            }}
                            id="location"
                            labelId="location"
                            autoWidth={false}
                          >
                            <option value="" disabled selected>
                              Select location
                            </option>
                            {locationOptions?.map((option) => (
                              <MenuItem key={option._id} value={option._id}>
                                {option?.locationName}
                              </MenuItem>
                            ))}
                          </Select>
                        </>
                      )}
                    />
                    {errors.location && <div className="errors">{errors.location.message}</div>}
                  </CCol> */}
                  {/* end location */}

                  {/* start tag */}
                  {/* <CCol md={6}>
                    <CFormLabel htmlFor="validationDefault01">Tag</CFormLabel>
                    <Controller
                      name="tag"
                      control={control}
                      rules={{ required: 'Tag name is required' }}
                      render={({ field }) => (
                        <>
                          <Select
                            {...field}
                            style={{
                              width: '100%',
                              height: '36px',
                              borderRadius: '0.375rem',
                            }}
                            id="tag"
                            labelId="tag"
                            autoWidth={false}
                          >
                            <option value="" disabled selected>
                              Select tag
                            </option>
                            {tagOptions?.map((option) => (
                              <MenuItem key={option._id} value={option._id}>
                                {option?.tagName}
                              </MenuItem>
                            ))}
                          </Select>
                        </>
                      )}
                    />
                    {errors.tag && <div className="errors">{errors.tag.message}</div>}
                  </CCol> */}
                  {/* end tag */}

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
                      accept="image/*"
                      {...register('newsImage', { required: 'News Image is required' })}
                      invalid={!!errors.newsImage}
                      onChange={(e) => handleImageChange(e)}
                    />

                    {singleImageUrl && (
                      <div>
                        <p>Single Image Preview:</p>
                        <img src={singleImageUrl} alt="Single Image" style={{ maxWidth: '20%' }} />
                      </div>
                    )}
                    <CFormFeedback invalid>News Image is required</CFormFeedback>
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
                      id="validationTextarea"
                      aria-label="file example"
                      accept="image/*"
                      multiple
                      {...register('multipleImage', { required: 'News Image is required' })}
                      invalid={!!errors.multipleImage}
                      onChange={(e) => handleImageChange(e)}
                    />

                    {multipleImageUrls.length > 0 && (
                      <div>
                        <p>Multiple Image Previews:</p>
                        {multipleImageUrls.map((url, index) => (
                          <img
                            key={index}
                            src={url}
                            alt={`Image ${index}`}
                            style={{ maxWidth: '20%' }}
                          />
                        ))}
                      </div>
                    )}
                    <CFormFeedback invalid>News Image is required</CFormFeedback>
                  </CCol>
                  {/* end image */}

                  {/* <CCol md={6}>
                    <CFormLabel htmlFor="validationDefault01">News Image</CFormLabel>
                    <CFormInput
                      type="file"
                      id="newsImage"
                      onChange={(e) => {
                        handleImageChange(e)
                      }}
                    />
                    {singleImageUrl && (
                      <div>
                        <p>Single Image Preview:</p>
                        <img src={singleImageUrl} alt="Single Image" style={{ maxWidth: '20%' }} />
                      </div>
                    )}
                    {errors.newsImage && (
                      <span style={{ color: '#e55353' }}>{errors.newsImage.message}</span>
                    )}
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel htmlFor="multipleImage">Multiple Images</CFormLabel>
                    <CFormInput
                      type="file"
                      id="multipleImage"
                      onChange={(e) => {
                        handleImageChange(e)
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
                    {errors.multipleImage && (
                      <span style={{ color: '#e55353' }}>{errors.multipleImage.message}</span>
                    )}
                  </CCol> */}
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
