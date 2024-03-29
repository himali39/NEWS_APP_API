import { Button, Switch, IconButton } from '@mui/material'
import MUIDataTable from 'mui-datatables'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteMultipleNews, deleteNews, getAllNews, updateNewsStatus } from 'src/redux/api/api'
import * as Icons from '@mui/icons-material'
import { ToastContainer, toast } from 'react-toastify'
import swal from 'sweetalert'
import defaultImg from '../../../../src/assets/images/defaultImg.png'

const News = () => {
  const navigate = useNavigate()
  const [dataTableData, setDataTable] = useState([])
  const [baseUrl, setBaseUrl] = useState([])

  const newsList = async () => {
    await getAllNews()
      .then((res) => {
        console.log(res.data.news)
        const transformedData = res.data.news.map((news) => ({
          ...news,
          languagesName: news.languages == null ? '' : news.languages.languagesName,
          categoryName: news.category == null ? '' : news.category.categoryName,
          subCategoryName: news.subcategory == null ? '' : news.subcategory.subCategoryName,
          tagName: news.tag == null ? '' : news.tag.tagName,
          locationName: news.location == null ? '' : news.location.locationName,
        }))
        setDataTable(transformedData)
        setBaseUrl(`${process.env.REACT_APP_NEWS_IMAGE_PATH}`)
      })
      .catch((err) => {
        if (!err.response.data.success) {
          if (err.response.data.status === 401) {
            toast.error(err.response.data.message)
          } else {
            toast.error(err.response.data, 'else')
          }
        }
      })
  }
  useEffect(() => {
    newsList()
  }, [])

  const columns = [
    {
      name: 'index',
      label: 'No',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return tableMeta.rowIndex + 1
        },
      },
    },
    {
      name: 'categoryName',
      label: 'Category',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'subCategoryName',
      label: 'sub category',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'title',
      label: 'title',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'newsImage',
      label: 'Image',
      options: {
        customBodyRender: (newsImage) =>
          newsImage ? (
            <img
              src={`${process.env.REACT_APP_NEWS_IMAGE_PATH}${newsImage}`}
              alt={newsImage}
              style={{ height: '50px', width: '50px' }}
            />
          ) : (
            <img src={defaultImg} alt={newsImage} style={{ height: '50px', width: '50px' }} />
          ),
      },
    },
    {
      name: 'languagesName',
      label: 'language',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'tagName',
      label: 'Tag',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'locationName',
      label: 'Location',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'expiry_date',
      label: 'Date',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          if (!value) return '' // Handle null or undefined values
          const dateObject = new Date(value)
          const day = dateObject.getDate().toString().padStart(2, '0')
          const month = (dateObject.getMonth() + 1).toString().padStart(2, '0') // Months are 0-indexed
          const year = dateObject.getFullYear()
          return `${day}/${month}/${year}`
        },
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
                updateNewsStatus(data, _id)
                  .then(() => {
                    toast.success('status changed successfully!', {
                      key: data._id,
                    })
                    newsList()
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
                  const editData = dataTableData.find((data) => data._id === value)
                  console.log(editData)
                  navigate('/News-form', { state: { editData: editData, imageUrl: baseUrl } })
                }}
              ></Icons.EditRounded>
              <Icons.DeleteRounded
                className="deleteButton"
                onClick={async () => {
                  const confirm = await swal({
                    title: 'Are you sure?',
                    text: 'Are you sure? Want to delete Location? All related data will also be deleted',
                    icon: 'warning',
                    buttons: ['No, cancel it!', 'Yes, I am sure!'],
                    dangerMode: true,
                  })
                  if (confirm) {
                    deleteNews(value)
                      .then(() => {
                        toast.success('deleted successfully!', {
                          key: value,
                        })
                        newsList()
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

  const deleteMultiple = async (index) => {
    const ids = index.data.map(
      (index1) => dataTableData.find((data, ind) => ind === index1.dataIndex && data._id)._id,
    )

    const confirm = await swal({
      title: 'Are you sure?',
      text: 'Are you sure that you want to delete selected News?',
      icon: 'warning',
      buttons: ['No, cancel it!', 'Yes, I am sure!'],
      dangerMode: true,
    })

    if (confirm) {
      deleteMultipleNews(ids)
        .then(() => {
          console.log(ids)
          newsList()
          toast.success('Deleted successfully!', {
            key: ids.join(','),
          })
        })
        .catch(() => {
          toast.error('Something went wrong!', {
            key: ids.join(','),
          })
        })
    }
  }

  const SelectedRowsToolbar = (data) => {
    return (
      <div>
        <IconButton onClick={() => deleteMultiple(data)}>
          <Icons.Delete />
        </IconButton>
      </div>
    )
  }

  const options = {
    customToolbarSelect: (selectedRows, data) => (
      <SelectedRowsToolbar
        selectedRows={selectedRows}
        data={data}
        columns={columns}
        datatableTitle="test"
      />
    ),
  }

  return (
    <>
      <ToastContainer />
      <div className="right-text">
        <Button
          variant="contained"
          size="medium"
          className="AddButton"
          onClick={() => navigate('/News-form')}
        >
          Add News
        </Button>
      </div>
      <MUIDataTable title={'News List'} data={dataTableData} columns={columns} options={options} />
    </>
  )
}

export default News
