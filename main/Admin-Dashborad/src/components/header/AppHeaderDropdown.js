import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import avatar8 from './../../assets/images/avatars/8.jpg'
import Cookies from 'js-cookie'
import { LOGOUT } from 'src/redux/actions/action'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function Logout(dispatch, navigate) {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    Cookies.remove('admin')
    dispatch({ type: LOGOUT })
    navigate('/')
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>

        <CDropdownItem href="">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="">
          <CIcon icon={cilLockLocked} className="me-2" onClick={() => Logout(dispatch, navigate)}>
            Logout
          </CIcon>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
