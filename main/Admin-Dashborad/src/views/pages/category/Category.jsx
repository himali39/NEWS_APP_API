import { Button, Switch } from '@mui/material'
import MUIDataTable from 'mui-datatables'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllCategory } from 'src/redux/api/api'
import * as Icons from '@mui/icons-material'
import { ToastContainer, toast } from 'react-toastify'
import swal from 'sweetalert'

const Category = () => {
  const navigate = useNavigate()
  const [dataTableData, setDataTable] = useState([])

  const categoryList = async () => {
    await getAllCategory()
      .then((res) => {
        console.log(res.data.category)
        const transformedData = res.data.category.map((category) => ({
          ...category,
          languages: category.languages.map((language) => language.languagesName),
        }))

        setDataTable(transformedData)
        // setDataTable(res.data.category)
        //  setBaseUrl(`${process.env.REACT_APP_LANGUAGES_IMAGE_PATH}`)
      })
      .catch((err) => {
        console.log(err)
        // if (!err.response.data.success) {
        //   if (err.response.data.status === 401) {
        //     toast.error(err.response.data.message)
        //   } else {
        //     console.log(err.response.data, 'else')
        //   }
        // }
      })
  }
  useEffect(() => {
    categoryList()
  }, [])

  const columns = [
    {
      name: 'categoryName',
      label: 'categoryName',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'languages',
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
        filter: true,
        sort: false,
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
                // updateLanguage(data, _id)
                //   .then(() => {
                //     toast.success('status changed successfully!', {
                //       key: data._id,
                //     })
                //     list()
                //   })
                //   .catch(() => {
                //     toast.error('something went wrong!', {
                //       key: data._id,
                //     })
                //   })
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
                // onClick={() => {
                //   const editdata = dataTableData.find((data) => data._id === value)
                //   console.log(editdata)
                //   navigate('/language-form', { state: { editdata: editdata, imageUrl: baseUrl } })
                // }}
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

                  // if (confirm) {
                  //   deleteLanguage(value)
                  //     .then(() => {
                  //       toast.success('deleted successfully!', {
                  //         key: value,
                  //       })
                  //       console.log(value)
                  //       list()
                  //     })
                  //     .catch(() => {
                  //       toast.error('something went wrong!', {
                  //         key: value,
                  //       })
                  //     })
                  // }
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
