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

import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { MenuItem, Select } from '@mui/material'
import { addLocation, updateLocation } from 'src/redux/api/api'

const LocationForm = () => {
  const {
    register,
    getValues,
    setValue,
    handleSubmit,

    formState: { errors },
  } = useForm()

  const navigate = useNavigate()
  const [isUpdate, setIsUpdate] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { state } = useLocation()

  const onSubmit = (data) => {
    isUpdate === ''
      ? addLocation(data)
          .then((res) => {
            navigate('/location')
          })
          .catch((err) => {
            console.log(err)
            if (!err.res.data.status === 500) {
              toast.error('server error')
            } else {
              setIsLoading(false)
            }
          })
      : updateLocation(data, isUpdate)
          .then((res) => {
            navigate('/location')
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

      setIsUpdate(editData._id)

      setValue('locationName', editData.locationName)
      setValue('latitude', editData.latitude)
      setValue('longitude', editData.longitude)
    }
  }, [])
  return (
    <div className=" bg-light min-vh-100">
      <CContainer className="mt-3">
        <CRow>
          <CCol md={8}>
            <CCard>
              <CCardHeader>
                <strong>Location Form</strong>
              </CCardHeader>
              <CCardBody>
                <ToastContainer />
                <CForm className="row g-3 " onSubmit={handleSubmit(onSubmit)}>
                  <CCol md={6}>
                    <CFormLabel htmlFor="validationDefault01">Location</CFormLabel>
                    <CFormInput
                      type="text"
                      id="validationDefault01"
                      {...register('locationName', {
                        required: ' Location Name is required',
                      })}
                      placeholder="Location name"
                      invalid={!!errors.locationName}
                    />
                    <CFormFeedback invalid>Location is required</CFormFeedback>
                  </CCol>

                  <CCol md={6}>
                    <CFormLabel htmlFor="validationDefault01"></CFormLabel>
                    <CFormInput
                      type="text"
                      id="validationDefault01"
                      {...register('latitude', {
                        required: 'Latitude is required',
                        pattern: {
                          value: /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/,
                          message: 'Invalid latitude format',
                        },
                      })}
                      placeholder="Latitude name"
                      invalid={!!errors.latitude}
                    />
                    <CFormFeedback invalid>
                      {errors.latitude && errors.latitude.message}
                    </CFormFeedback>
                  </CCol>

                  <CCol md={6}>
                    <CFormLabel htmlFor="validationDefault01"></CFormLabel>
                    <CFormInput
                      type="text"
                      id="validationDefault01"
                      {...register('longitude', {
                        required: ' Longitude is required',
                        pattern: {
                          value: /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/,
                          message: 'Invalid longitude format',
                        },
                      })}
                      placeholder="longitude name"
                      invalid={!!errors.longitude}
                    />
                    <CFormFeedback invalid>{errors.longitude?.message}</CFormFeedback>
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

export default LocationForm
