import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import config from '../../config'
import Login from '../../pages/Login'

export default function GuestRouter() {

    const rootURL = config.rootURL

    return (
        <Routes>
            <Route path={`${rootURL}/login`} element={<Login />} />
            <Route path={`${rootURL}/*`} element={<Navigate to={`${rootURL}/login`} replace />} />
        </Routes>
    )
}
