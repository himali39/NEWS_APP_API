import React, { useEffect, useState } from 'react'
import { CRow, CCol, CWidgetStatsF, CLink } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowRight, cil3d, cilLanguage, cilUser, cilNewspaper } from '@coreui/icons'
import { getDashboradCount } from 'src/redux/api/api'
import { toast } from 'react-toastify'

const WidgetsDropdown = () => {
  const [allCount, setAllCount] = useState(null)

  const getAllCount = async () => {
    try {
      const res = await getDashboradCount()
      const newCount = res.data.data
      setAllCount(newCount)
    } catch (err) {
      if (!err.response.data.success) {
        if (err.response.data.status === 401) {
          toast.error(err.response.data.message)
        } else {
          console.log(err.response.data, 'else')
        }
      }
    }
  }

  useEffect(() => {
    getAllCount()
  }, [])

  return (
    <>
      <CCol>
        <CRow>
          <CCol sm={6} lg={3}>
            <CWidgetStatsF
              className="mb-3 hover-card"
              style={{ backgroundColor: 'rgb(142 185 185)', color: 'white' }}
              icon={
                <div className="icon-container">
                  <CIcon width={38} icon={cil3d} size="xl" className="custom-icon" />
                </div>
              }
              value={
                <>
                  <div style={{ fontSize: '16px' }}>Total Category</div>
                  <h2 className=" fw-bold" style={{ textAlign: 'center' }}>
                    {allCount?.categoryData}
                  </h2>
                </>
              }
              footer={
                <CLink
                  className="font-weight-bold font-xs text-medium-emphasis"
                  href="http://localhost:3000/category"
                >
                  View more
                  <CIcon icon={cilArrowRight} className="float-end" width={16} />
                </CLink>
              }
            />
          </CCol>
          <CCol sm={6} lg={3}>
            <CWidgetStatsF
              className="mb-3 hover-card"
              style={{ backgroundColor: '#6b90b5', color: 'white' }}
              icon={
                <div className="icon-container">
                  <CIcon width={38} icon={cilNewspaper} size="xl" className="custom-icon" />
                </div>
              }
              value={
                <>
                  <div style={{ fontSize: '16px' }}>Total News</div>
                  <h2 className=" fw-bold" style={{ textAlign: 'center' }}>
                    {allCount?.newsData}
                  </h2>
                </>
              }
              footer={
                <CLink
                  className="font-weight-bold font-xs text-medium-emphasis"
                  href="http://localhost:3000/category"
                >
                  View more
                  <CIcon icon={cilArrowRight} className="float-end" width={16} />
                </CLink>
              }
            />
          </CCol>
          <CCol sm={6} lg={3}>
            <CWidgetStatsF
              className="mb-3 hover-card"
              style={{ backgroundColor: '#acb3b0', color: 'white' }}
              icon={
                <div className="icon-container">
                  <CIcon width={38} icon={cilUser} size="xl" className="custom-icon" />
                </div>
              }
              value={
                <>
                  <div style={{ fontSize: '16px' }}>All Users</div>
                  <h2 className=" fw-bold" style={{ textAlign: 'center' }}>
                    {allCount?.userData}
                  </h2>
                </>
              }
              footer={
                <CLink
                  className="font-weight-bold font-xs text-medium-emphasis"
                  href="http://localhost:3000/category"
                >
                  View more
                  <CIcon icon={cilArrowRight} className="float-end" width={16} />
                </CLink>
              }
            />
          </CCol>
          <CCol sm={6} lg={3}>
            <CWidgetStatsF
              className="mb-3 hover-card"
              style={{ backgroundColor: '#77d6d6', color: 'white' }}
              icon={
                <div className="icon-container">
                  <CIcon width={38} icon={cilLanguage} size="xl" className="custom-icon" />
                </div>
              }
              value={
                <>
                  <div style={{ fontSize: '16px' }}>Total Language</div>
                  <h2 className=" fw-bold" style={{ textAlign: 'center' }}>
                    {allCount?.languageData}
                  </h2>
                </>
              }
              footer={
                <CLink
                  className="font-weight-bold font-xs text-medium-emphasis"
                  href="http://localhost:3000/category"
                >
                  View more
                  <CIcon icon={cilArrowRight} className="float-end" width={16} />
                </CLink>
              }
            />
          </CCol>
        </CRow>
      </CCol>
    </>
  )
}

export default WidgetsDropdown
