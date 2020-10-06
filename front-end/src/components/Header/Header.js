import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import { logout } from '../../action/Action'

export default function Header() {

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    
    const LOGOUT = () => { dispatch(logout()) }

    const renderLinksForGuest = () => {
        return (
            <Nav>
                <li className='nav-item'>
                    <NavLink to='/login' className='nav-link'>Log In</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink to='/register' className='nav-link'>Register</NavLink>
                </li>
            </Nav>
        )
    }

    const renderLinksForUser = () => {
        return(
            <Nav>
                <li className='nav-item'>
                    <span className='nav-link' onClick={LOGOUT}>Log out</span>
                </li>
            </Nav>
        )
    }

    return (
        <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark" style={{ zIndex: 1 }}>
        <Container fluid>
            <Link to="/" className="navbar-brand">Admin Dashboard</Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"></Nav>
                {auth.authenticate ? renderLinksForUser() : renderLinksForGuest()}
            </Navbar.Collapse>
        </Container>
    </Navbar>
)
}

