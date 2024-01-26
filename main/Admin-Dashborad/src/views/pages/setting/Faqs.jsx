import { Button, Switch } from '@mui/material'
import MUIDataTable from 'mui-datatables'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Icons from '@mui/icons-material'
import { ToastContainer, toast } from 'react-toastify'
import swal from 'sweetalert'
import { deleteSubCategory, getAllSubCategory, getFaqs, updateSubCategory } from 'src/redux/api/api'

const Faqs = () => {
  const navigate = useNavigate()
  const [dataTableData, setDataTable] = useState([])

  const faqsList = async () => {
    await getFaqs()
      .then((res) => {
        console.log(res.data.faqs)
        setDataTable(res.data.faqs)
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
    faqsList()
  }, [])

  const columns = [
    {
      name: 'question',
      label: 'Question ',
      options: {
        filter: true,
        sort: true,
        toUpperCase: true,
      },
    },

    {
      name: 'answer',
      label: 'Answer',
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
                    faqsList()
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
                    text: 'Are you sure? Want to delete Location? All related data will also be deleted',
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
                        faqsList()
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

export default Faqs
