import { Button, Switch } from '@mui/material'
import MUIDataTable from 'mui-datatables'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Icons from '@mui/icons-material'
import { ToastContainer, toast } from 'react-toastify'
import swal from 'sweetalert'
import { deleteTag, getAllTag, updateTag } from 'src/redux/api/api'

const Tag = () => {
  const navigate = useNavigate()
  const [dataTableData, setDataTable] = useState([])

  const tagList = async () => {
    await getAllTag()
      .then((res) => {
        const transformedData = res.data.tag.map((tag) => ({
          ...tag,
          languages: tag.languages?.map((language) => language.languagesName),
        }))

        setDataTable(transformedData)
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
    tagList()
  }, [])

  const columns = [
    {
      name: 'tagName',
      label: 'Tag',
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
                updateTag(data, _id)
                  .then(() => {
                    toast.success('status changed successfully!', {
                      key: data._id,
                    })
                    tagList()
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
                    deleteTag(value)
                      .then(() => {
                        toast.success('deleted successfully!', {
                          key: value,
                        })
                        tagList()
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
          onClick={() => navigate('/tag-form')}
        >
          Add Tag
        </Button>
      </div>
      <MUIDataTable title={'Tag List'} data={dataTableData} columns={columns} options={options} />
    </>
  )
}

export default Tag
