import { useState } from "react";
import { Container, Form, Row, Button, Col } from "react-bootstrap"
import { PencilFill, PlusLg } from "react-bootstrap-icons"
import useCreateOrUpdate from "../hooks/useCreateOrUpdate";
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {

    // const { login } = useAuth()

    const navigate = useNavigate()

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = async e => {
        e.preventDefault()
        // await login(email, password)
        navigate('/')
    }


    return (
        <Container>
            <Row className="d-flex flex-direction-column align-items-center justify-content-center mt-5">
                <Form className=" w-75 " onSubmit={handleSubmit}>

                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>

                    <div className="d-flex justify-content-between">
                        <Button variant="primary" type="submit">Login</Button>
                        <Link to='/register'>Register</Link>
                    </div>
                </Form>
            </Row>
        </Container>
    )
}
