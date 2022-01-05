import React from 'react'
import { useNavigate } from 'react-router-dom'

import DB from '../DB'
import config from '../config'

import { useAuth } from '../providers/AuthProvider'

export default function Logout() {

    const db = new DB()
    const navigate = useNavigate()
    
    const { setAuthState } = useAuth()

    React.useEffect(() => {

        //delete from db
        db.auth.put({key: 'auth_token', value: ''})
        //sengaja hanya auth token saja yang dihapus agar dapat melihat siapa terakhir login

        //remove from context
        setAuthState({
            name: '',
            username: '',
            token: ''
        })
        navigate(`${config.rootURL}/login`)
    }, [])

    return (
        <div>
            {/* Mencoba logout... */}
        </div>
    )
}
