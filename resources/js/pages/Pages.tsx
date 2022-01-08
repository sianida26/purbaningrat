import React from 'react'

import IconButton from '@mui/material/IconButton'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Tooltip from '@mui/material/Tooltip'

import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'

import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import { BsPlusLg } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { getUrl } from '../routes'

export default function Pages() {

    const [tabValue, setTabValue] = React.useState(0)

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 50},
        {field: 'title', headerName: 'Judul', flex: 1},
        {field: 'views', headerName: 'Views', width: 100},
        {field: 'modified_at', headerName: 'Perubahan terakhir', width: 200},
        {
            field: 'action', 
            headerName: 'Aksi', 
            width: 100, 
            renderCell: (params: GridRenderCellParams<number>) => (
                <div className="tw-flex tw-gap-2">
                    {/* lihat */}
                    <Tooltip title="Lihat">
                        <IconButton onClick={() => {}} color='success'>
                            <VisibilityIcon />
                        </IconButton>
                    </Tooltip>

                    {/* edit */}
                    <Tooltip title="Edit">
                        <IconButton onClick={() => {}} color='warning'>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            )
        }
    ]

    const rows: {id:number, title: string, views: number, modified_at: string}[] = [
        // {id: 1, title: 'Judul 1', views: 100, modified_at: '2020-01-01'},
        // {id: 2, title: 'Judul 2', views: 200, modified_at: '2020-01-02'},
        // {id: 3, title: 'Judul 3', views: 300, modified_at: '2020-01-03'},
        // {id: 4, title: 'Judul 4', views: 400, modified_at: '2020-01-04'},
        // {id: 5, title: 'Judul 5', views: 500, modified_at: '2020-01-05'},
        // {id: 6, title: 'Judul 6', views: 600, modified_at: '2020-01-06'},
        // {id: 7, title: 'Judul 7', views: 700, modified_at: '2020-01-07'},
        // {id: 8, title: 'Judul 8', views: 800, modified_at: '2020-01-08'},
        // {id: 9, title: 'Judul 9', views: 900, modified_at: '2020-01-09'},
        // {id: 10, title: 'Judul 10', views: 1000, modified_at: '2020-01-10'},
    ]

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue)
    }

    return (
        <div className="tw-w-full tw-px-4 tw-flex-grow">
            {/* title */}
            <h1 className="tw-text-3xl tw-font-semibold">Halaman Anda</h1>

            {/* card */}
            <div className="tw-w-full tw-rounded-md tw-shadow-lg tw-py-4 tw-px-4 tw-bg-white tw-mt-4 tw-h-full">

                {/* add button */}
                <Link to={getUrl('pages.create')} className="tw-px-3 tw-py-2 tw-bg-green-600 tw-text-white tw-rounded-md tw-inline-flex tw-gap-2 tw-items-center tw-text-sm tw-font-medium tw-shadow-md focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-green-600 focus:tw-ring-offset-1">
                    <BsPlusLg className="" />
                    TAMBAH HALAMAN
                </Link>

                {/* tabs */}
                <div className="tw-border-b tw-border-gray-300">
                    <Tabs value={tabValue} onChange={handleTabChange}>
                        <Tab label="Terpublish" />
                        <Tab label="Draf" />
                    </Tabs>
                </div>

                <div className="tw-max-w-full tw-h-96 tw-mt-4">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5,10]}
                    />
                </div>
            </div>
        </div>
    )
}
