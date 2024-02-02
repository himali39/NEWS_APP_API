import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CSpinner } from '@coreui/react'
import { CChartBar, CChartDoughnut, CChartPie } from '@coreui/react-chartjs'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { ActiveUserList, getCategoryWiseNews, getLanguageWiseNews } from 'src/redux/api/api'
import UserTable from './UserTable'
import { toast, ToastContainer } from 'react-toastify'

const Dashboard = () => {
  // const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
  const [categoryNewsCount, setCategoryNewsCount] = useState([])
  const [languageNewsCount, setLanguageNewsCount] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState(null)

  const getActiveInActionUser = async () => {
    try {
      const res = await ActiveUserList()
      const newData = res.data.user
      setUserData(newData)
      setIsLoading(false)
    } catch (err) {
      if (!err.response.data.success) {
        if (err.response.data.status === 401) {
          toast.error(err.response.data.message)
        } else {
          toast.error(err.response.data, 'else')
        }
      }
    }
  }
  const getCategoryChart = async () => {
    try {
      const res = await getCategoryWiseNews()
      const newData = res.data.data
      setCategoryNewsCount(newData)
      setIsLoading(false)
    } catch (err) {
      if (!err.response.data.success) {
        if (err.response.data.status === 401) {
          toast.error(err.response.data.message)
        } else {
          toast.error(err.response.data, 'else')
        }
      }
    }
  }

  const getLanguageChart = async () => {
    try {
      const res = await getLanguageWiseNews()
      const newData = res.data.data
      setLanguageNewsCount(newData)
    } catch (err) {
      if (!err.response.data.success) {
        if (err.response.data.status === 401) {
          toast.error(err.response.data.message)
        } else {
          toast.error(err.response.data, 'else')
        }
      }
    }
  }

  useEffect(() => {
    getCategoryChart()
    getLanguageChart()
    getActiveInActionUser()
  }, [])

  return (
    <>
      {isLoading ? (
        <>
          <CSpinner component="span" size="sm" aria-hidden="true" style={{ textAlign: 'center' }} />
          Loading...
        </>
      ) : (
        <>
          <ToastContainer />
          <WidgetsDropdown />
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={4}>
                  <CCard className="mb-4" style={{ height: '96%' }}>
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
                <CCol xs={12} md={6} xl={8}>
                  <CCard className="mb-4">
                    <CCardHeader>Active Users</CCardHeader>
                    <CCardBody>
                      <UserTable />
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
              <CRow>
                <CCol md={8}>
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
                <CCol md={4}>
                  <CCard className="mb-4">
                    <CCardHeader>Active InActive User</CCardHeader>
                    <CCardBody>
                      {userData && (
                        <CChartDoughnut
                          data={{
                            labels: ['Active Users', 'Inactive Users'],
                            datasets: [
                              {
                                backgroundColor: ['#41B883', '#E46651'],
                                data: [userData.activeCount, userData.inactiveCount],
                              },
                            ],
                          }}
                        />
                      )}
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </>
      )}
    </>
  )
}

export default Dashboard
