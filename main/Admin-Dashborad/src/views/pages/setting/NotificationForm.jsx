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
  CFormTextarea,
  CRow,
  CSpinner,
} from '@coreui/react'
import { useForm } from 'react-hook-form'
import { addFaqs, updateFaqs } from 'src/redux/api/api'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const NotificationForm = () => {
  const {
    register,
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
      ? addFaqs(data)
          .then((res) => {
            navigate('/notification')
          })
          .catch((err) => {
            if (!err.response.data.success) {
              toast.error(err.response.data.message)
            } else {
              setIsLoading(false)
            }
          })
      : updateFaqs(data, isUpdate)
          .then((res) => {
            navigate('/notification')
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
      setValue('question', editData.question)
      setValue('answer', editData.answer)
    }
  }, [])
  return (
    <div className=" bg-light min-vh-100">
      <CContainer className="mt-3">
        <CRow>
          <CCol md={8}>
            <CCard>
              <CCardHeader>
                <strong>Faqs Form</strong>
              </CCardHeader>
              <CCardBody>
                <ToastContainer />
                <CForm className="row g-3 " onSubmit={handleSubmit(onSubmit)}>
                  <CCol md={12}>
                    <CFormLabel>Question</CFormLabel>
                    <CFormInput
                      type="text"
                      id="question"
                      {...register('question', {
                        required: 'Question  is required',
                      })}
                      placeholder="Question"
                      invalid={!!errors.question}
                    />
                    <CFormFeedback invalid>Question is required</CFormFeedback>
                  </CCol>

                  <CCol md={12}>
                    <CFormLabel>Answer</CFormLabel>
                    <CFormTextarea
                      id="answer"
                      rows="6"
                      type="text"
                      placeholder="Answer"
                      {...register('answer', {
                        required: 'Answer  is required',
                      })}
                      invalid={!!errors.answer}
                    />

                    <CFormFeedback invalid>Answer is required</CFormFeedback>
                  </CCol>

                  <CCol md={12} className="text-center submitButton">
                    {isLoading ? (
                      <CButton disabled>
                        <CSpinner component="span" size="sm" aria-hidden="true" />
                        Loading...
                      </CButton>
                    ) : (
                      <CButton type="submit" className="AddButton">
                        {isUpdate === '' ? 'Submit' : 'Update'}
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

export default NotificationForm
