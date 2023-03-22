import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import { apiRequest, setAuthToken } from '../../utils/api'

const columns = [
    { field: 'token', headerName: 'API TOKEN', width: 250, editable: true },
    {
        field: 'session_name',
        headerName: 'NAMA KONEKSI',
        width: 100,
        editable: true,
    },
    {
        field: 'connnet',
        headerName: 'STATUS',
        width: 150,
        editable: true,
    },
    {
        field: 'phone',
        headerName: 'NO TELP',
        type: 'number',
        width: 150,
        editable: true,
    },
]

export default function DataGridDemo({ update }) {
    const [rowGrid, setRowGrid] = React.useState([])

    useEffect(() => {
        xSession()
    }, [update])

    const xSession = async () => {
        const token = JSON.parse(localStorage.getItem('userToken')) // token bisa didapat dari localStorage atau tempat penyimpanan yang sesuai
        setAuthToken(token?.token) // set header Authorization Bearer menggunakan token yang disimpan
        apiRequest
            .get('http://localhost:5000/get-session')
            .then((response) => {
                const data = response?.data?.data
                setRowGrid(data)
                // console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rowGrid}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 4,
                        },
                    },
                }}
                pageSizeOptions={[4]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    )
}
