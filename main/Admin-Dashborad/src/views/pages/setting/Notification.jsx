import { Button, Switch } from '@mui/material'
import MUIDataTable from 'mui-datatables'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Icons from '@mui/icons-material'
import { ToastContainer, toast } from 'react-toastify'
import swal from 'sweetalert'
import { deleteNotification, getNotification, updateNotification } from 'src/redux/api/api'

const Notification = () => {
  const navigate = useNavigate()
  const [dataTableData, setDataTable] = useState([])

  const notificationList = async () => {
    await getNotification()
      .then((res) => {
        const transformedData = res.data.notification.map((notification) => ({
          ...notification,
          languagesName: notification.languages == null ? '' : notification.languages.languagesName,
        }))
        console.log(res.data.notification)
        setDataTable(transformedData)
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
    notificationList()
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
      name: 'languagesName',
      label: 'Languages ',
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: 'title',
      label: 'Title',
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
                updateNotification(data, _id)
                  .then(() => {
                    toast.success('status changed successfully!', {
                      key: data._id,
                    })
                    notificationList()
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
                  navigate('/notification-form', {
                    state: { editData: editData },
                  })
                }}
              ></Icons.EditRounded>
              <Icons.DeleteRounded
                className="deleteButton"
                onClick={async () => {
                  const confirm = await swal({
                    title: 'Are you sure?',
                    text: 'Are you sure? Want to delete FAQS?',
                    icon: 'warning',
                    buttons: ['No, cancel it!', 'Yes, I am sure!'],
                    dangerMode: true,
                  })
                  if (confirm) {
                    deleteNotification(value)
                      .then(() => {
                        toast.success('deleted successfully!', {
                          key: value,
                        })
                        notificationList()
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
    selectableRows: 'none',
    // sort: false,
  }

  return (
    <>
      <ToastContainer />
      <div className="right-text">
        <Button
          variant="contained"
          size="medium"
          className="AddButton"
          onClick={() => navigate('/faqs-form')}
        >
          Add Notification
        </Button>
      </div>
      <MUIDataTable
        title={'Notification List'}
        data={dataTableData}
        columns={columns}
        options={options}
      />
    </>
  )
}

export default Notification
