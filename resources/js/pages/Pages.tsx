import React from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { BsPlusLg } from 'react-icons/bs'

import { format } from 'date-fns'
import idLocale from 'date-fns/locale/id'

import IconButton from '@mui/material/IconButton'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Tooltip from '@mui/material/Tooltip'

import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'

import { DataGrid, GridColDef, GridRenderCellParams, GridValueFormatterParams } from '@mui/x-data-grid'

import { useAxios } from '../providers/AxiosProvider'
import { useConfig } from '../providers/ConfigProvider'
import { getUrl } from '../routes'

interface Post {
    id: number,
    no: number,
    title: string,
    views: number,
    updated_at: string,
}

export default function Pages() {

    const navigate = useNavigate()
    const { axios } = useAxios()
    const { setConfig } = useConfig()

    const [draft, setDraft] = React.useState<Post[]>([])
    const [published, setPublished] = React.useState<Post[]>([])
    const [tabValue, setTabValue] = React.useState(0)

    React.useEffect(() => {
        getAllPages()
    }, [])

    const columns: GridColDef[] = [
        {field: 'no', headerName: '#', width: 50},
        {field: 'title', headerName: 'Judul', flex: 1},
        {field: 'views', headerName: 'Views', width: 100},
        {
            field: 'updated_at', 
            headerName: 'Perubahan terakhir', 
            width: 200,
            valueFormatter: (params: GridValueFormatterParams) => {
                const date = new Date(params.value as string)
                return format(date, 'dd MMM yyyy; HH:mm:ss', {locale: idLocale})
            }
        },
        {
            field: 'action', 
            headerName: 'Aksi', 
            width: 100, 
            renderCell: (params: GridRenderCellParams<number>) => {

                const handleEdit = () => {
                    setConfig({editPostID: params.row.id})
                    navigate(getUrl('pages.edit'))
                }

                return <div className="tw-flex tw-gap-2">
                    {/* lihat */}
                    <Tooltip title="Lihat">
                        <IconButton onClick={() => {/* TODO: navigate to preview */}} color='success'>
                            <VisibilityIcon />
                        </IconButton>
                    </Tooltip>

                    {/* edit */}
                    <Tooltip title="Edit">
                        <IconButton onClick={handleEdit} color='warning'>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            }
        }
    ]

    // const rows: {id:number, title: string, views: number, updated_at: string}[] = [
        
    // ]

    const getAllPages = async () => {

        try {
            const response = await axios.post('/post/getAll')
            setDraft(response.data.draft.map((post: Post, index: number) => ({
                ...post,
                no: index + 1,
            })))
            setPublished(response.data.published.map((post: Post, index: number) => ({
                ...post,
                no: index + 1,
            })))
        } catch (e) {
            console.log(e)
        }
    }

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
                        rows={tabValue === 0 ? published : draft}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5,10]}
                    />
                </div>
            </div>
        </div>
    )
}
