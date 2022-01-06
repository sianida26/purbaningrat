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
        <div className="tw-w-screen tw-min-h-screen tw-relative" style={{zIndex: zIndexes.base}}>
            <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
            <Header toggleSidebar={toggleSidebar} />
            <Outlet />
        </div>
    )
}
