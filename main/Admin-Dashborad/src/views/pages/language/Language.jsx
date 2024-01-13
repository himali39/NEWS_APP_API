import MUIDataTable from 'mui-datatables'
import React, { useEffect, useState } from 'react'
import { getAllLanguage } from 'src/redux/api/api'

const Language = () => {
  const [datatableData, setdatatableData] = useState([])

  const list = async () => {
    // setIsLoading(true)
    await getAllLanguage()
      .then((res) => {
        console.log(res.data.language)
        // setIsLoading(false)
        setdatatableData(res.data.language)
      })
      .catch((err) => {
        console.log(err)
        // if (!err.response.data.isSuccess) {
        //   if (err.response.data.status === 401) {
        //     toast.error(err.response.data.message)
        //     setIsLoading(false)
        //   } else {
        //     console.log(err.response.data, 'else')
        //   }
        // }
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
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
      },
    },
    // {
    //   name: '_id',
    //   label: 'Action',
    // },
  ]

  const options = {
    filterType: 'checkbox',
  }

  return (
    <MUIDataTable
      title={'Language List'}
      data={datatableData}
      columns={columns}
      options={options}
    />
  )
}

export default Language
