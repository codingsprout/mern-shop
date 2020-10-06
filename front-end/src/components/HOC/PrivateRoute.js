import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export default function PrivateRoute({ component: Component, ...remaining }) {
    
    return (
        <Route {...remaining} component={(props) => {

            const token = window.localStorage.getItem('token')
            if(token) { return <Component {...props} /> } 
            else { return <Redirect to={'/login'} /> }

        }} />
    )
}
