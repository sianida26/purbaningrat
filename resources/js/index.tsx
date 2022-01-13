import React from 'react'

import {render} from 'react-dom'

import App from './App'
import AuthProvider from './providers/AuthProvider'
import AxiosProvider from './providers/AxiosProvider'

render(
    <React.StrictMode>
        <AuthProvider>
            <AxiosProvider>
                <App />
            </AxiosProvider>
        </AuthProvider>
    </React.StrictMode>
, document.getElementById('app')
);