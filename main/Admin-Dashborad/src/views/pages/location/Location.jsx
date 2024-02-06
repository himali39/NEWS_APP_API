import { ToastContainer, toast } from 'react-toastify'
import { Button, Switch } from '@mui/material'
import MUIDataTable from 'mui-datatables'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Icons from '@mui/icons-material'
import { deleteLocation, getAllLocation, updateLocation } from 'src/redux/api/api'
import swal from 'sweetalert'

const Location = () => {
  const [dataTableData, setDataTable] = useState([])
  const navigate = useNavigate()

  const locationList = async () => {
    await getAllLocation()
      .then((res) => {
        setDataTable(res.data.location)
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
    locationList()
  }, [])

  const columns = [
    {
      name: 'locationName',
      label: 'Location',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'latitude',
      label: 'Latitude',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'longitude',
      label: 'Longitude',
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
                updateLocation(data, _id)
                  .then(() => {
                    toast.success('status changed successfully!', {
                      key: data._id,
                    })
                    locationList()
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
                  navigate('/Location-form', { state: { editData: editData } })
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
                    deleteLocation(value)
                      .then(() => {
                        toast.success('deleted successfully!', {
                          key: value,
                        })
                        console.log(value)
                        locationList()
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
    // selectableRows: 'none',
  }

  return (
    <>
      <ToastContainer />
      <div className="right-text">
        <Button
          variant="contained"
          size="medium"
          className="AddButton"
          onClick={() => navigate('/Location-form')}
        >
          Add Language
        </Button>
      </div>
      <MUIDataTable
        title={'Location List'}
        data={dataTableData}
        columns={columns}
        options={options}
      />
    </>
  )
}

export default Location
