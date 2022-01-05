import React from 'react'

import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom'


import AppConfig from '../../config'

import Splash from '../../pages/Splash'
import GuestRouter from './GuestRouter'

import { useAuth } from '../../providers/AuthProvider'

export default function AppRouter() {

    const { auth } = useAuth()
    
    const AdminRouter = React.lazy(() => import('./AdminRouter'))

    return (
        <Router>
            <React.Suspense fallback={<Splash />}>
                {
                    auth.token ? <AdminRouter /> : <GuestRouter /> 
                }
            </React.Suspense>
        </Router>
    )
}
