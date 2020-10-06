import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import Header from '../Header/Header'
import * as BsIcons from 'react-icons/bs'
import * as BiIcons from 'react-icons/bi'
import * as MdIcons from 'react-icons/md'
import './Layout.css'

export default function Layout(props) {

    return (
    <>
        <Header />
        {
         props.sidebar ?
         <Container fluid>
          <Row>
            <Col md={2} className="sidebar">
              <ul>
                <li><NavLink exact to={`/`}><BsIcons.BsFillHouseFill /><span>Home</span></NavLink></li>
                <li><NavLink to={`/category`}><BiIcons.BiBook /><span>Category</span></NavLink></li>
                <li><NavLink to={`/services`}><MdIcons.MdRoomService /><span>Service</span></NavLink></li>
                <li><NavLink to={`/orders`}><BiIcons.BiCartAlt /><span>Orders</span></NavLink></li>
              </ul>
            </Col>
            <Col md={10} style={{ marginLeft: 'auto', paddingTop: '60px' }}>
              {props.children}
            </Col>
          </Row>
        </Container>
        :
        props.children
       }
    </>
    )
}