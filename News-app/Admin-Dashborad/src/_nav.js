import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDrop,
  cilPencil,
  cilLanguage,
  cilSpeedometer,
  cilTag,
  cilNewspaper,
  cilLocationPin,
  cilUser,
  cilPuzzle,
  cilSettings,
  cilSpeech,
  cilCommentSquare,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/Dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Category',
    to: '/Category',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'SubCategory',
    to: '/Sub-category',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Tag',
    to: '/Tag',
    icon: <CIcon icon={cilTag} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'News',
    to: '/News',
    icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Language',
    to: '/Language',
    icon: <CIcon icon={cilLanguage} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Location',
    to: '/Location',
    icon: <CIcon icon={cilLocationPin} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'User',
    to: '/User',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Settings',
    to: '/Settings',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'FAQs',
        to: '/Faqs',
        icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Feedback',
        to: '/Feedback',
        icon: <CIcon icon={cilSpeech} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Notification',
        to: '/Notification',
        icon: <CIcon icon={cilCommentSquare} customClassName="nav-icon" />,
      },
    ],
  },
  // {
  //   component: CNavItem,
  //   name: 'Docs',
  //   href: 'https://coreui.io/react/docs/templates/installation/',
  //   icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  // },
]

export default _nav
