import React from 'react'

import {render} from 'react-dom'

import App from './App'
import AuthProvider from './providers/AuthProvider'

render(
    <AuthProvider>
        <App />
    </AuthProvider>
, document.getElementById('app')
);