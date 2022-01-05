import React from 'react';

import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';

import config from './config';

const routes = [
    {name: 'dashboard', url: 'dashboard', component: Dashboard },
    {name: 'logout', url: 'logout', component: Logout },
]

export default routes

export function getUrl(routeName: string){
    const route = routes.find(r => r.name === routeName)
    return route ? config.rootURL+'/'+route.url : ''
}

