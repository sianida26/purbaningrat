import React from 'react'

import {render} from 'react-dom'

import App from './App'
import AuthProvider from './providers/AuthProvider'
import AxiosProvider from './providers/AxiosProvider'
import ConfigProvider from './providers/ConfigProvider'

render(
    <React.StrictMode>
        <AuthProvider>
            <AxiosProvider>
                <ConfigProvider>
                    <App />
                </ConfigProvider>
            </AxiosProvider>
        </AuthProvider>
    </React.StrictMode>
, document.getElementById('app')
);