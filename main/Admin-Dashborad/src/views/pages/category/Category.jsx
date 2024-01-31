import { Button, Switch } from '@mui/material'
import MUIDataTable from 'mui-datatables'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteCategory, getAllCategory, updateCategoryStatus } from 'src/redux/api/api'
import * as Icons from '@mui/icons-material'
import { ToastContainer, toast } from 'react-toastify'
import swal from 'sweetalert'

const Category = () => {
  const navigate = useNavigate()
  const [dataTableData, setDataTable] = useState([])
  const [baseUrl, setBaseUrl] = useState([])

  const categoryList = async () => {
    await getAllCategory()
      .then((res) => {
        const transformedData = res.data.category.map((category) => ({
          ...category,
          languagesName: category.languages == null ? '' : category.languages.languagesName,
        }))

        setDataTable(transformedData)
        setBaseUrl(`${process.env.REACT_APP_LANGUAGES_IMAGE_PATH}`)
      })
      .catch((err) => {
        if (!err.response.data.success) {
          if (err.response.data.status === 401) {
            toast.error(err.response.data.message)
          } else {
            console.log(err.response.data, 'else')
          }
        }
      })
  }
  useEffect(() => {
    categoryList()
  }, [])

  const columns = [
    {
      name: 'categoryName',
      label: 'Category',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'languagesName',
      label: 'Language',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'categoryImage',
      label: 'Image',
      options: {
        customBodyRender: (categoryImage) =>
          categoryImage ? (
            <img
              src={`${process.env.REACT_APP_CATEGORY_IMAGE_PATH}${categoryImage}`}
              alt={categoryImage}
              style={{ height: '50px', width: '50px' }}
            />
          ) : (
            ''
          ),
      },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (_, { rowIndex }) => {
          const { status, _id } = dataTableData[rowIndex]
          return (
            <Switch
              checked={status}
              onChange={() => {
                const data = { id: _id, status: !status }
                updateCategoryStatus(data, _id)
                  .then(() => {
                    toast.success('status changed successfully!', {
                      key: data._id,
                    })
                    categoryList()
                  })
                  .catch(() => {
                    toast.error('something went wrong!', {
                      key: data._id,
                    })
                  })
              }}
            />
          )
        },
      },
    },
    {
      name: '_id',
      label: 'Action',
      options: {
        customBodyRender: (value) => {
          return (
            <div>
              <Icons.EditRounded
                className="editButton"
                onClick={() => {
                  const editdata = dataTableData.find((data) => data._id === value)
                  navigate('/category-form', { state: { editdata: editdata, imageUrl: baseUrl } })
                }}
              ></Icons.EditRounded>
              <Icons.DeleteRounded
                className="deleteButton"
                onClick={async () => {
                  const confirm = await swal({
                    title: 'Are you sure?',
                    text: 'Are you sure? Want to delete Category? All related data will also be deleted',
                    icon: 'warning',
                    buttons: ['No, cancel it!', 'Yes, I am sure!'],
                    dangerMode: true,
                  })
                  if (confirm) {
                    deleteCategory(value)
                      .then(() => {
                        toast.success('deleted successfully!', {
                          key: value,
                        })
                        console.log(value)
                        categoryList()
                      })
                      .catch(() => {
                        toast.error('something went wrong!', {
                          key: value,
                        })
                      })
                  }
                }}
              ></Icons.DeleteRounded>
            </div>
          )
        },
      },
    },
  ]

  const options = {
    filterType: 'checkbox',
  }

  return (
    <>
      <ToastContainer />
      <div className="right-text">
        <Button
          variant="contained"
          size="medium"
          className="AddButton"
          onClick={() => navigate('/category-form')}
        >
          Add Category
        </Button>
      </div>
      <MUIDataTable
        title={'Category List'}
        data={dataTableData}
        columns={columns}
        options={options}
      />
    </>
  )
}

export default Category
