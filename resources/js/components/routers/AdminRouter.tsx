import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import Layout from '../../layouts/App'

import config from '../../config'
import routes, {getUrl} from '../../routes'


export default function AdminRouter() {

    const rootURL = config.rootURL

    return (
        <Routes>
            <Route path={rootURL} element={<Layout />}>
                <Route index element={<Navigate to={getUrl('dashboard')} replace />} />
                {
                    routes.map(route => {
                        return <Route
                            key={route.url}
                            path={`${route.url}`}
                            element={<route.component />}
                        />
                    })
                }
            </Route>
            <Route path={`${rootURL}/*`} element={<Navigate to={getUrl('dashboard')} replace />} />
        </Routes>
    )
}
