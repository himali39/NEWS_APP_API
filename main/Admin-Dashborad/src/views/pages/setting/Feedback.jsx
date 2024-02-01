import { Switch } from '@mui/material'
import MUIDataTable from 'mui-datatables'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Icons from '@mui/icons-material'
import { ToastContainer, toast } from 'react-toastify'
import swal from 'sweetalert'
import { deleteFeedback, getFeedback, updateFaqs } from 'src/redux/api/api'

const Feedback = () => {
  const navigate = useNavigate()
  const [dataTableData, setDataTable] = useState([])

  const feedbackList = async () => {
    await getFeedback()
      .then((res) => {
        console.log(res.data.feedback)
        const transformedData = res.data.feedback.map((feedback) => ({
          ...feedback,
          userId: feedback.userId == null ? '' : feedback.userId.userName,
        }))
        setDataTable(transformedData)
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
    feedbackList()
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
      name: 'userId',
      label: 'UserName ',
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: 'feedback',
      label: 'Feedback',
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
                updateFaqs(data, _id)
                  .then(() => {
                    toast.success('status changed successfully!', {
                      key: data._id,
                    })
                    feedbackList()
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
              <Icons.DeleteRounded
                className="deleteButton"
                onClick={async () => {
                  const confirm = await swal({
                    title: 'Are you sure?',
                    text: 'Are you sure? Want to delete Feedback?',
                    icon: 'warning',
                    buttons: ['No, cancel it!', 'Yes, I am sure!'],
                    dangerMode: true,
                  })
                  if (confirm) {
                    deleteFeedback(value)
                      .then(() => {
                        toast.success('deleted successfully!', {
                          key: value,
                        })
                        feedbackList()
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
    print: false, // Remove the print option
    download: false, // Remove the CSV export option
    viewColumns: false, // Remove the view columns option
    filter: false,
  }

  return (
    <>
      <ToastContainer />
      <MUIDataTable
        title={'Feedback List'}
        data={dataTableData}
        columns={columns}
        options={options}
      />
    </>
  )
}

export default Feedback
