import React, { useEffect, useState } from 'react'
import MUIDataTable from 'mui-datatables'
import { ActiveUserList } from 'src/redux/api/api'
import { toast, ToastContainer } from 'react-toastify'
import defaultImg from '../../assets/images/default.png'

const UserTable = () => {
  const [dataTableData, setDataTable] = useState([])

  const activeUserList = async () => {
    await ActiveUserList()
      .then((res) => {
        const setData = res.data.user.activeUsers
        setDataTable(setData)
      })
      .catch((err) => {
        if (!err.response.data.success) {
          if (err.response.data.status === 402) {
            toast.error(err.response.data.message)
          } else {
            toast.error(err.response.data, 'else')
          }
        }
      })
  }
  useEffect(() => {
    activeUserList()
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
      name: 'userName',
      label: 'userName',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'email',
      label: 'email',
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
              style={{ height: '50px', width: '50px', borderRadius: '50%' }}
            />
          ) : (
            <img
              src={defaultImg}
              alt={ProfileImg}
              style={{ height: '50px', width: '50px', borderRadius: '50%' }}
            />
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
          const { status } = dataTableData[rowIndex]
          return (
            <div>
              {status ? (
                <p className="activeUser">Active</p>
              ) : (
                <p className="deactiveUser">De-Active</p>
              )}
            </div>
          )
        },
      },
    },
  ]

  const options = {
    selectableRows: 'none',
    print: false,
    download: false,
    viewColumns: false,
    filter: false,
    rowsPerPage: 3,
  }

  return (
    <>
      <ToastContainer />
      <MUIDataTable data={dataTableData} columns={columns} options={options} />
    </>
  )
}

export default UserTable
