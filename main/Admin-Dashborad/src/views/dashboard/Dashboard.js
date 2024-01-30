import React, { useEffect, useState } from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartBar, CChartLine, CChartPie } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { getCategoryWiseNews, getLanguageWiseNews } from 'src/redux/api/api'

const Dashboard = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
  const [categoryNewsCount, setCategoryNewsCount] = useState([])

  const [languageNewsCount, setLanguageNewsCount] = useState([])

  const getCategoryChart = async () => {
    try {
      const res = await getCategoryWiseNews()
      const newData = res.data.data
      setCategoryNewsCount(newData)
    } catch (err) {
      if (!err.response.data.success) {
        if (err.response.data.status === 401) {
          // toast.error(err.response.data.message)
        } else {
          console.log(err.response.data, 'else')
        }
      }
    }
  }
  const getLanguageChart = async () => {
    try {
      const res = await getLanguageWiseNews()
      console.log(res.data.data)
      const newData = res.data.data
      setLanguageNewsCount(newData)
    } catch (err) {
      if (!err.response.data.success) {
        if (err.response.data.status === 401) {
          // toast.error(err.response.data.message)
        } else {
          console.log(err.response.data, 'else')
        }
      }
    }
  }

  useEffect(() => {
    getCategoryChart()
    getLanguageChart()
  }, [])

  return (
    <>
      <WidgetsDropdown />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol xs={4}>
              <CCard className="mb-4">
                <CCardHeader>Category wise News</CCardHeader>
                <CCardBody>
                  <CChartPie
                    data={{
                      labels: categoryNewsCount.map((category) => category.category),
                      datasets: [
                        {
                          data: categoryNewsCount.map((category) => category.percentage),
                          backgroundColor: ['#8bb5b5', '#FF6384', '#36A2EB', '#FFCE56'],
                          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                        },
                      ],
                    }}
                  />
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs={8}>
              <CCard className="mb-4">
                <CCardHeader></CCardHeader>
                <CCardBody></CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs={6}>
              <CCard className="mb-4">
                <CCardHeader>Language wise News</CCardHeader>
                <CCardBody>
                  <CChartBar
                    data={{
                      labels: languageNewsCount.map((language) => language.language),
                      datasets: [
                        {
                          label: 'News Count',
                          backgroundColor: '#f87979',
                          data: languageNewsCount.map((language) => language.count),
                        },
                      ],
                    }}
                    labels="Languages"
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
