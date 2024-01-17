import { Button, Switch } from '@mui/material'
import MUIDataTable from 'mui-datatables'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Icons from '@mui/icons-material'
import { ToastContainer, toast } from 'react-toastify'
import { deleteLanguage, getAllLanguage, updateLanguage } from 'src/redux/api/api'
import swal from 'sweetalert'
import defaultImg from '../../../../src/assets/images/default.png'

const Language = () => {
  const [dataTableData, setDataTable] = useState([])
  const navigate = useNavigate()
  const [baseUrl, setBaseUrl] = useState([])

  const list = async () => {
    await getAllLanguage()
      .then((res) => {
        setDataTable(res.data.language)
        setBaseUrl(`${process.env.REACT_APP_LANGUAGES_IMAGE_PATH}`)
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
    list()
  }, [])

  const columns = [
    {
      name: 'languagesName',
      label: 'Languages',
      options: {
        filter: true,
        sort: true,
        align: 'center',
      },
    },
    {
      name: 'displayName',
      label: 'Display Name',
    },
    {
      name: 'code',
      label: 'Code',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'flagImage',
      label: 'Flag',
      options: {
        customBodyRender: (flagImage) =>
          flagImage ? (
            <img
              src={`${process.env.REACT_APP_LANGUAGES_IMAGE_PATH}${flagImage}`}
              alt={flagImage}
              style={{ height: '50px', width: '50px' }}
            />
          ) : (
            <img src={defaultImg} alt={defaultImg} style={{ height: '50px', width: '50px' }}></img>
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
                updateLanguage(data, _id)
                  .then(() => {
                    toast.success('status changed successfully!', {
                      key: data._id,
                    })
                    list()
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
                  navigate('/language-form', { state: { editdata: editdata, imageUrl: baseUrl } })
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
                    deleteLanguage(value)
                      .then(() => {
                        toast.success('deleted successfully!', {
                          key: value,
                        })
                        console.log(value)
                        list()
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
      <div className="right-text">
        <Button
          variant="contained"
          size="medium"
          className="AddButton"
          onClick={() => navigate('/language-form')}
        >
          Add Language
        </Button>
      </div>
      <ToastContainer />
      <MUIDataTable
        title={'Language List'}
        data={dataTableData}
        columns={columns}
        options={options}
      />
    </>
  )
}

export default Language
