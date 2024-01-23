import { Button, Switch } from '@mui/material'
import MUIDataTable from 'mui-datatables'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Icons from '@mui/icons-material'
import { ToastContainer, toast } from 'react-toastify'
import { deleteUser, getAllUser, updateUser } from 'src/redux/api/api'
import swal from 'sweetalert'
import defaultImg from '../../../../src/assets/images/default.png'

const Language = () => {
  const [dataTableData, setDataTable] = useState([])
  const navigate = useNavigate()
  const [baseUrl, setBaseUrl] = useState([])

  const list = async () => {
    await getAllUser()
      .then((res) => {
        console.log(res.data.user)
        setDataTable(res.data.user)
        setBaseUrl(`${process.env.REACT_APP_USER_PROFILE_PATH}`)
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
      name: 'fullName',
      label: 'Full Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'email',
      label: 'Email',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'mobile',
      label: 'Mobile',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'ProfileImg',
      label: 'Profile',
      options: {
        customBodyRender: (ProfileImg) =>
          ProfileImg ? (
            <img
              src={`${process.env.REACT_APP_USER_PROFILE_PATH}${ProfileImg}`}
              alt={ProfileImg}
              style={{ height: '50px', width: '50px' }}
            />
          ) : (
            <img src={defaultImg} alt={defaultImg} style={{ height: '50px', width: '50px' }} />
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
                updateUser(data, _id)
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
                  navigate('/user-form', { state: { editdata: editdata, imageUrl: baseUrl } })
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
                    deleteUser(value)
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
    // filterType: 'checkbox',
  }

  return (
    <>
      <div className="right-text">
        <Button
          variant="contained"
          size="medium"
          className="AddButton"
          onClick={() => navigate('/user-form')}
        >
          Add User
        </Button>
      </div>
      <ToastContainer />
      <MUIDataTable title={'User List'} data={dataTableData} columns={columns} options={options} />
    </>
  )
}

export default Language
