import React, { createContext, useContext, useState, FC, useEffect } from "react";

export interface IAuth {
    name?       : string
    username?   : string
    token?      : string
}

type AuthContextState = {
    auth: IAuth
    setAuthState: (newState: IAuth) => void
}

const authDefaultValues: AuthContextState = {
    auth: {
        name: '',
        username: '',
        token: '',
    },
    setAuthState: () => {}
}

export const AuthContext = createContext<AuthContextState>(authDefaultValues)
export const useAuth = () => useContext(AuthContext)

const AuthProvider: FC = ({children}) => {
    const [auth, _setState] = useState<IAuth>(authDefaultValues.auth)
    
    let token = auth.token
    

    const setAuthState = (newState: IAuth) => _setState(state => {
        return {
            ...state,
            ...newState,
        }
    })

    return (
        <AuthContext.Provider 
        value={{
            auth,
            setAuthState
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider