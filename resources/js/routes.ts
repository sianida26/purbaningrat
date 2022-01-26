import React from 'react';

import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import Pages from './pages/Pages';
import CreatePage from './pages/CreatePage';

import config from './config';

const routes = [
    {name: 'dashboard', url: 'dashboard', component: Dashboard },
    {name: 'logout', url: 'logout', component: Logout },
    {name: 'pages', url: 'halaman', component: Pages},
    {name: 'pages.create', url: 'halaman/tambah', component: CreatePage},
    {name: 'pages.edit', url: 'halaman/edit', component: CreatePage},
    {name: 'profile', url: 'profil', component: Pages},
]

export default routes

export function getUrl(routeName: string){
    const route = routes.find(r => r.name === routeName)
    return route ? config.rootURL+'/'+route.url : ''
}

