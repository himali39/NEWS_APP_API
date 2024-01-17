import { Button, Switch } from '@mui/material'
import MUIDataTable from 'mui-datatables'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Icons from '@mui/icons-material'
import { ToastContainer, toast } from 'react-toastify'
import swal from 'sweetalert'
import { deleteSubCategory, getAllSubCategory, updateSubCategory } from 'src/redux/api/api'

const SubCategory = () => {
  const navigate = useNavigate()
  const [dataTableData, setDataTable] = useState([])

  const subCategoryList = async () => {
    await getAllSubCategory()
      .then((res) => {
        console.log(res.data.subCategory)
        const transformedData = res.data.subCategory.map((subCategory) => ({
          ...subCategory,
          languages: subCategory.languages?.map((language) => language.languagesName),
          categoryName: subCategory.categoryName?.map((category) => category.categoryName),
        }))

        setDataTable(transformedData)
        //  setBaseUrl(`${process.env.REACT_APP_LANGUAGES_IMAGE_PATH}`)
      })
      .catch((err) => {
        console.log(err)
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
    subCategoryList()
  }, [])

  const columns = [
    {
      name: 'subCategoryName',
      label: 'sub Category ',
      options: {
        filter: true,
        sort: true,
        toUpperCase: true,
      },
    },

    {
      name: 'categoryName',
      label: 'category',
      options: {
        filter: true,
        sort: false,
        toUpperCase: true,
      },
    },
    {
      name: 'languages',
      label: 'Language',
      options: {
        filter: true,
        sort: false,
        toUpperCase: true,
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
                updateSubCategory(data, _id)
                  .then(() => {
                    toast.success('status changed successfully!', {
                      key: data._id,
                    })
                    subCategoryList()
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
                  console.log(editdata)
                  navigate('/sub-category-form', {
                    state: { editdata: editdata },
                  })
                }}
              ></Icons.EditRounded>
              <Icons.DeleteRounded
                className="deleteButton"
                onClick={async () => {
                  const confirm = await swal({
                    title: 'Are you sure?',
                    text: 'Are you sure that you want to delete Language? All related data(Categories,Subcategories,News,Breaking news,Tags) will also be deleted',
                    icon: 'warning',
                    buttons: ['No, cancel it!', 'Yes, I am sure!'],
                    dangerMode: true,
                  })
                  if (confirm) {
                    deleteSubCategory(value)
                      .then(() => {
                        toast.success('deleted successfully!', {
                          key: value,
                        })
                        subCategoryList()
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
          onClick={() => navigate('/sub-category-form')}
        >
          Add SubCategory
        </Button>
      </div>
      <MUIDataTable
        title={'Sub Category List'}
        data={dataTableData}
        columns={columns}
        options={options}
      />
    </>
  )
}

export default SubCategory
