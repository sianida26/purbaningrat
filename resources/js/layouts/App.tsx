import React from 'react'
import { Outlet } from 'react-router-dom'

export default function App() {
    return (
        <div>
            <p>Aku header</p>
            <Outlet />
        </div>
    )
}
