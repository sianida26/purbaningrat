import React from 'react'

import axios, { AxiosInstance } from 'axios'

import { useAuth } from './AuthProvider'

interface AxiosContextState {
    axios: AxiosInstance
}

const AxiosContext = React.createContext<AxiosContextState>({
    axios: axios.create()
})
const useAxios = () => React.useContext(AxiosContext)

const AxiosProvider: React.FC = ({children}) => {

    const { auth } = useAuth()

    const instance = axios.create({
        baseURL : '/api/admin',
        timeout: 20000,
    })

    instance.interceptors.request.use(
        (config) => {
            config.headers = {
                accept: 'application/json',
                Authorization: 'Bearer ' + auth.token
            }
            return config
        }
    )

    return <AxiosContext.Provider
        value={{
            axios: instance
        }}    
    >
        {children}
    </AxiosContext.Provider>
}

export {
    AxiosContext,
    useAxios,
}

export default AxiosProvider
