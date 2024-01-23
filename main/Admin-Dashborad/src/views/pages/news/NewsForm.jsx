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
  const [isUpdate, setIsUpdate] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [languageOptions, setLanguageOptions] = useState([])
  const [categoryOptions, setCategoryOptions] = useState([])
  const [subcatOptions, setSubCatOptions] = useState([])
  const [locationOptions, setLocationOptions] = useState([])
  const [tagOptions, setTagOptions] = useState([])
  const [singleImageUrl, setSingleImageUrl] = useState(null)
  const [multipleImageUrls, setMultipleImageUrls] = useState([])
  const [selectedLanguage, setSelectedLanguage] = useState('')

  const { state } = useLocation()

  const handleSingleImgChange = (e) => {
    const files = e.target.files[0]
    setSingleImageUrl(URL.createObjectURL(files))
    setValue('newsImage', files)
  }
  const handleMultiImgChange = (e) => {
    const files = e.target.files
    const multipleImgPreviews = Array.from(files).map((file) => URL.createObjectURL(file))
    setMultipleImageUrls(multipleImgPreviews)
    setValue('multipleImage', files)
  }

  // const handleLangChange = async (selectedLanguageId) => {
  //   setValue('languages', selectedLanguageId) // Update the selected language in the form state
  //   await CategoryList() // Fetch category options based on the selected language
  // }
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

    Object.keys(data).forEach(function (key) {
      if (key === 'newsImage') {
        if (data[key] !== undefined) {
          formData.append(key, data[key])
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
    // subCategoryList()
    // LocationList()
    // TagList()
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
                    <CFormSelect id="languages" name="languages">
                      <option>Select Language</option>
                      {languageOptions?.map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.languagesName}
                        </option>
                      ))}
                    </CFormSelect>
                    {errors.category && <div className="errors">{errors.category.message}</div>}

                    {/* <Select
                            {...field}
                            style={{
                              width: '100%',
                              height: '36px',
                              borderRadius: '0.375rem',
                            }}
                            id="languages"
                            labelId="languages"
                            autoWidth={false}
                            onChange={(e) => handleLangChange(e.target.value)}
                          >
                            <MenuItem value="">Choose Option</MenuItem>
                            {languageOptions?.map((option) => (
                              <MenuItem key={option._id} value={option._id}>
                                {option.lang}
                              </MenuItem>
                            ))}
                          </Select> */}
                    {/* </> */}
                    {/* )} */}
                    {/* /> */}
                  </CCol>
                  {/* end language */}
                  {/* start-category field */}
                  <CCol md={6}>
                    <CFormLabel htmlFor="validationDefault01">Category</CFormLabel>

                    <CFormSelect
                      id="category"
                      name="category"
                      {...register('category', { required: 'category is required' })}
                      invalid={!!errors.category}
                    >
                      <option disabled>Select category</option>
                      {categoryOptions?.map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.categoryName}
                        </option>
                      ))}
                    </CFormSelect>
                    <CFormFeedback invalid>category Name is required</CFormFeedback>

                    {/* <Controller
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
                            <option value="" disabled>
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
                    /> */}
                    {/* {errors.categoryName && (
                      <div className="errors">{errors.categoryName.message}</div>
                    )} */}
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
                            <option value="" disabled>
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
                        required: 'expiry_date is required',
                      })}
                      placeholder="Expiry_date name"
                      invalid={!!errors.expiry_date}
                    />
                    <CFormFeedback invalid>Expiry Date is required</CFormFeedback>
                  </CCol>
                  {/* End  Expiry Date  */}

                  {/* start location */}
                  <CCol md={6}>
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
                            <option value="" disabled>
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
                  </CCol>
                  {/* end location */}

                  {/* start tag */}
                  <CCol md={6}>
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
                            <option value="" disabled>
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
                  </CCol>
                  {/* end tag */}

                  {/* start image field */}
                  <CCol md={6}>
                    <CFormLabel htmlFor="validationDefault01">
                      News Images
                      <span className="errors">Only png, jpg, webp and jpeg image allow</span>
                    </CFormLabel>
                    <Controller
                      name="newsImage"
                      control={control}
                      render={({ field }) => (
                        <>
                          <CFormInput
                            type="file"
                            id="newsImage"
                            onChange={(e) => {
                              field.onChange(e)
                              handleSingleImgChange(e) // Assuming handleImageChange is a function you've defined
                            }}
                          />
                          {singleImageUrl && (
                            <img
                              src={singleImageUrl}
                              alt="singleImageUrl"
                              style={{ maxWidth: '20%' }}
                            />
                          )}
                          {errors.newsImage && (
                            <span style={{ color: '#e55353' }}>{errors.newsImage.message}</span>
                          )}
                        </>
                      )}
                    />
                  </CCol>
                  {/* end image */}

                  {/* start multiple image field */}
                  <CCol md={6}>
                    <CFormLabel htmlFor="validationDefault01">
                      Other Images
                      <span className="errors">Only png, jpg, webp and jpeg image allow</span>
                    </CFormLabel>
                    <Controller
                      name="multipleImage"
                      control={control}
                      render={({ field }) => (
                        <>
                          <CFormInput
                            type="file"
                            id="multipleImage"
                            onChange={(e) => {
                              field.onChange(e)
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
                          {errors.multipleImage && (
                            <span style={{ color: '#e55353' }}>{errors.multipleImage.message}</span>
                          )}
                        </>
                      )}
                    />
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
