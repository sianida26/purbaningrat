import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

import zIndexes from '../zIndexes'

export default function App() {

    const [sidebarOpen, setSidebarOpen] = React.useState(false)

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    return (
        <div className="tw-w-screen tw-min-h-screen tw-relative tw-flex tw-flex-col" style={{zIndex: zIndexes.base}}>
            <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
            <Header toggleSidebar={toggleSidebar} />
            <div className="tw-w-full tw-h-full tw-overflow-x-hidden tw-overflow-y-auto tw-p-8 tw-bg-gray-100 tw-flex-grow tw-flex tw-flex-col">
                <Outlet />
            </div>
        </div>
    )
}
