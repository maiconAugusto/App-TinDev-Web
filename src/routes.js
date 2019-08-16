import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from '../src/pages/Login'
import Main from './pages/Main';

export default function Router(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={Login}/>
            <Route path="/dev/:id" component={Main}/>
        </BrowserRouter>
    )
}