import { Button, Switch, IconButton } from '@mui/material'
import MUIDataTable from 'mui-datatables'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Icons from '@mui/icons-material'
import { ToastContainer, toast } from 'react-toastify'
import {
  deleteLanguage,
  deleteMultipleLanguages,
  getAllLanguage,
  updateLanguage,
} from 'src/redux/api/api'
import swal from 'sweetalert'
import defaultImg from '../../../assets/images/defaultImg.png'

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
            toast.error(err.response.data, 'else')
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
      label: 'Language',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'displayName',
      label: 'Display Name',
      options: {
        filter: true,
        sort: true,
      },
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
            <img src={defaultImg} alt={flagImage} style={{ height: '50px', width: '50px' }} />
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
                  const editData = dataTableData.find((data) => data._id === value)
                  console.log(editData)
                  navigate('/Language-form', { state: { editData: editData, imageUrl: baseUrl } })
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
      deleteMultipleLanguages(ids)
        .then(() => {
          list()
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
      <div className="right-text">
        <Button
          variant="contained"
          size="medium"
          className="AddButton"
          onClick={() => navigate('/Language-form')}
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
