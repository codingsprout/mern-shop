import React from 'react'
import Header from '../Header/Header'
import Menu from '../Menu/Menu'

export default function Layout(props) {
    return (
        <>
            <Header />
            <Menu />
            {props.children}
        </> 
    )
}
