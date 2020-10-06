import React, { useState } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import Layout from '../../components/Layout/Layout'
import Input from '../../components/UI/input/Input'
import { login } from '../../action/Action'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

export default function Login() {

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const userLogin = (event) => {

        event.preventDefault()
        const user = { email, password }
        dispatch(login(user))
        
    }

    if(auth.authenticate) { return <Redirect to={'/'}/> }

    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '100px'}}>
                    <Col md={{span: 6, offset: 3}}>
                        <Form onSubmit={userLogin}>
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
