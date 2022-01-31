import React from 'react'
import { SnackbarProvider } from 'notistack';

import {render} from 'react-dom'

import App from './App'
import AuthProvider from './providers/AuthProvider'
import AxiosProvider from './providers/AxiosProvider'
import ConfigProvider from './providers/ConfigProvider'

render(
    <React.StrictMode>
        <SnackbarProvider>
            <AuthProvider>
                <AxiosProvider>
                    <ConfigProvider>
                        <App />
                    </ConfigProvider>
                </AxiosProvider>
            </AuthProvider>
        </SnackbarProvider>
    </React.StrictMode>
, document.getElementById('app')
);