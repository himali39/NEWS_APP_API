import { Button, Switch, IconButton } from '@mui/material'
import MUIDataTable from 'mui-datatables'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Icons from '@mui/icons-material'
import { ToastContainer, toast } from 'react-toastify'
import swal from 'sweetalert'
import { deleteMultipleTag, deleteTag, getAllTag, updateTagStatus } from 'src/redux/api/api'

const Tag = () => {
  const navigate = useNavigate()
  const [dataTableData, setDataTable] = useState([])

  const tagList = async () => {
    await getAllTag()
      .then((res) => {
        const transformedData = res.data.tag.map((tag) => ({
          ...tag,
          languagesName: tag.languages == null ? '' : tag.languages.languagesName,
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
      name: 'languagesName',
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
                updateTagStatus(data, _id)
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
                  const editData = dataTableData.find((data) => data._id === value)
                  console.log(editData)
                  navigate('/Tag-form', {
                    state: { editData: editData },
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

  const deleteMultiple = async (index) => {
    const ids = index.data.map(
      (index1) => dataTableData.find((data, ind) => ind === index1.dataIndex && data._id)._id,
    )

    const confirm = await swal({
      title: 'Are you sure?',
      text: 'Are you sure that you want to delete selected Tag?',
      icon: 'warning',
      buttons: ['No, cancel it!', 'Yes, I am sure!'],
      dangerMode: true,
    })

    if (confirm) {
      deleteMultipleTag(ids)
        .then(() => {
          console.log(ids)
          tagList()
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
          onClick={() => navigate('/Tag-form')}
        >
          Add Tag
        </Button>
      </div>
      <MUIDataTable title={'Tag List'} data={dataTableData} columns={columns} options={options} />
    </>
  )
}

export default Tag
