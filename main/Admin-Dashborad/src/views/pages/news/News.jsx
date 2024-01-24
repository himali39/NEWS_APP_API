import { Button, Switch } from '@mui/material'
import MUIDataTable from 'mui-datatables'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteNews, getAllNews, updateNews } from 'src/redux/api/api'
import * as Icons from '@mui/icons-material'
import { ToastContainer, toast } from 'react-toastify'
import swal from 'sweetalert'

const News = () => {
  const navigate = useNavigate()
  const [dataTableData, setDataTable] = useState([])
  const [baseUrl, setBaseUrl] = useState([])

  const newsList = async () => {
    await getAllNews()
      .then((res) => {
        console.log(res)
        const transformedData = res.data.news.map((news) => ({
          ...news,
          languages: news.languages.map((language) => language.languagesName),
          tag: news.tag.map((tag) => tag.tagName),
          location: news.location.map((location) => location.locationName),
          category: news.category.map((category) => category.categoryName),
          subcategory: news.subcategory.map((subcategory) => subcategory.subCategoryName),
        }))
        setDataTable(transformedData)
        setBaseUrl(`${process.env.REACT_APP_NEWS_IMAGE_PATH}`)
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
    newsList()
  }, [])

  const columns = [
    {
      name: 'category',
      label: 'Category',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'subcategory',
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
            ''
          ),
      },
    },
    {
      name: 'languages',
      label: 'languages',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'tag',
      label: 'Tag',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'location',
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
                updateNews(data, _id)
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
                  const editdata = dataTableData.find((data) => data._id === value)
                  console.log(editdata)
                  navigate('/news-form', { state: { editdata: editdata, imageUrl: baseUrl } })
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
          onClick={() => navigate('/news-form')}
        >
          Add News
        </Button>
      </div>
      <MUIDataTable title={'News List'} data={dataTableData} columns={columns} options={options} />
    </>
  )
}

export default News
