import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Profile = React.lazy(() => import('./views/pages/auth/profile'))
const ChangePassword = React.lazy(() => import('./views/pages/auth/ChangePassword'))
const EditProfile = React.lazy(() => import('./views/pages/auth/EditProfile'))
const Category = React.lazy(() => import('./views/pages/category/Category'))
const CategoryForm = React.lazy(() => import('./views/pages/category/CategoryForm'))
const subCategory = React.lazy(() => import('./views/pages/subCategory/SubCategory'))
const subCategoryForm = React.lazy(() => import('./views/pages/subCategory/SubCategoryForm'))
const Language = React.lazy(() => import('./views/pages/language/Language'))
const LanguageForm = React.lazy(() => import('./views/pages/language/LanguageForm'))
const Tag = React.lazy(() => import('./views/pages/tag/Tag'))
const TagForm = React.lazy(() => import('./views/pages/tag/TagForm'))
const Location = React.lazy(() => import('./views/pages/location/Location'))
const LocationForm = React.lazy(() => import('./views/pages/location/LocationForm'))
const News = React.lazy(() => import('./views/pages/news/News'))
const NewsForm = React.lazy(() => import('./views/pages/news/NewsForm'))
const User = React.lazy(() => import('./views/pages/user/User'))
const UserForm = React.lazy(() => import('./views/pages/user/UserForm'))
const Faqs = React.lazy(() => import('./views/pages/setting/Faqs'))
const FaqsForm = React.lazy(() => import('./views/pages/setting/FaqsForm'))
const Feedback = React.lazy(() => import('./views/pages/setting/Feedback'))
const Notification = React.lazy(() => import('./views/pages/setting/Notification'))
const NotificationForm = React.lazy(() => import('./views/pages/setting/NotificationForm'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/Dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/Profile', name: 'Profile', element: Profile },
  { path: '/Change-password', name: 'Change-password', element: ChangePassword },
  { path: '/Edit-profile', name: 'Edit-profile', element: EditProfile },
  { path: '/Category', name: 'Category', element: Category },
  { path: '/Category-form', name: 'Category-form', element: CategoryForm },
  { path: '/Sub-category', name: 'Sub-category', element: subCategory },
  { path: '/Sub-category-form', name: 'Sub-category-form', element: subCategoryForm },
  { path: '/Language', name: 'Language', element: Language },
  { path: '/Language-form', name: 'Language-form', element: LanguageForm },
  { path: '/Tag', name: 'Tag', element: Tag },
  { path: '/Tag-form', name: 'Tag-form', element: TagForm },
  { path: '/Location', name: 'Location', element: Location },
  { path: '/Location-form', name: 'Location-form', element: LocationForm },
  { path: '/News', name: 'News', element: News },
  { path: '/News-form', name: 'News-form', element: NewsForm },
  { path: '/User', name: 'User', element: User },
  { path: '/User-form', name: 'User-form', element: UserForm },
  { path: '/Faqs', name: 'Faqs', element: Faqs },
  { path: '/Faqs-form', name: 'Faqs-form', element: FaqsForm },
  { path: '/Feedback', name: 'Feedback', element: Feedback },
  { path: '/Notification', name: 'Notification', element: Notification },
  { path: '/Notification-form', name: 'Notification-form', element: NotificationForm },
]

export default routes
