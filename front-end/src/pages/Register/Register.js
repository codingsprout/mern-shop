import React, { useState } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from '../../action/Action'
import Layout from '../../components/Layout/Layout'
import Input from '../../components/UI/input/Input'

export default function Register() {

    const dispatch = useDispatch()
    
    const auth = useSelector(state => state.auth)
    const user = useSelector(state => state.user)
    
    const [firstName, setFirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const userRegister = (event) => {
        event.preventDefault()
        const user = {firstName, lastName, email, password}
        dispatch(register(user))
    }

    if(auth.authenticate) { return <Redirect to={'/'}/> }

    if(user.loading) {return <p>Page is loading...</p>}

    return (
        <Layout>
            <Container>
                { user.message }
                <Row style={{ marginTop: '50px'}}>
                    <Col md={{span: 6, offset: 3}}>
                        <Form onSubmit={userRegister}>
                            <Row>
                                <Col md={6}>
                                    <Input 
                                        label="First Name"
                                        placeholder="First Name"
                                        value={firstName}
                                        type="text"
                                        onChange={(event) => setFirstName(event.target.value)}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input 
                                        label="Last Name"
                                        placeholder="Last Name"
                                        value={lastName}
                                        type="text"
                                        onChange={(event) => setlastName(event.target.value)}
                                    />
                                </Col>
                            </Row>
                           
                                <Input 
                                    label="Email"
                                    placeholder="Email"
                                    value={email}
                                    type="email"
                                    onChange={(event) => setEmail(event.target.value)}
                                />

                                <Input 
                                    label="Password"
                                    placeholder="Password"
                                    value={password}
                                    type="password"
                                    onChange={(event) => setPassword(event.target.value)}
                                />  
                            
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}
