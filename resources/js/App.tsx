import React from 'react'

import AppRouter from './components/routers/AppRouter'
import DB from './DB'
import Splash from './pages/Splash'

import { useAuth } from './providers/AuthProvider'


export default function App() {

    const db = new DB()

    const { setAuthState } = useAuth()

    const [isBooting, setBooting] = React.useState(true)

    React.useEffect(() => {
        boot()
    }, [])

    const boot = () => {
        db.auth.bulkGet(['auth_token', 'name', 'username', 'role'])
            .then(([token, name, username]) => {
                setAuthState({
                    name: name?.value || '',
                    username: username?.value || '',
                    token: token?.value || ''
                })
                setBooting(false)
            })
    }

    return isBooting ? <Splash /> : (
        <AppRouter />
    )
}
