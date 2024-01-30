import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
  CWidgetStatsF,
  CLink,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import {
  cilArrowBottom,
  cilArrowTop,
  cilOptions,
  cilArrowRight,
  cilPeople,
  cilSettings,
  cilcc,
  cil3d,
  cilLanguage,
  cilUser,
  cilNewspaper,
} from '@coreui/icons'
import { getDashboradCount } from 'src/redux/api/api'
import { ToastContainer, toast } from 'react-toastify'

const WidgetsDropdown = () => {
  const [allCount, setAllCount] = useState(null)

  const getAllCount = async () => {
    try {
      const res = await getDashboradCount()
      console.log(res.data.data)
      const newCount = res.data.data
      setAllCount(newCount)
      // setIsLoading(false);
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
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsF
          className="mb-3"
          style={{ backgroundColor: 'rgb(142 185 185)', color: 'white' }}
          icon={<CIcon width={38} icon={cil3d} size="xl" />}
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
          className="mb-3"
          style={{ backgroundColor: '#77d6d6', color: 'white' }}
          icon={<CIcon width={38} icon={cilNewspaper} size="xl" />}
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
          className="mb-3"
          style={{ backgroundColor: '#77d6d6', color: 'white' }}
          icon={<CIcon width={38} icon={cilUser} size="xl" />}
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
          className="mb-3"
          style={{ backgroundColor: '#77d6d6', color: 'white' }}
          icon={<CIcon width={38} icon={cilLanguage} size="xl" />}
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
  )
}

export default WidgetsDropdown
