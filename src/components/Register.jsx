import { useState } from "react";
import { Container, Form, Row, Button, Col } from "react-bootstrap"
import { PencilFill, PlusLg } from "react-bootstrap-icons"
import useCreateOrUpdate from "../hooks/useCreateOrUpdate";
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Register() {

    const { signup } = useAuth()

    const { performCreateOrUpdate } = useCreateOrUpdate()

    const navigate = useNavigate()

    const [selectedFile, setSelectedFile] = useState(null)
    const [userDetails, setUserDetails] = useState({
        name: '',
        surname: '',
        title: 'Mr',
        area: '',
        username: '',
        bio: '',
        email: ''
    })
    const [password, setPassword] = useState()

    const handleChange = (field, value) => {
        setUserDetails({
            ...userDetails,
            [field]: value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('profileImage', selectedFile || '')
        formData.append('name', userDetails.name)
        formData.append('surname', userDetails.surname)
        formData.append('title', userDetails.title)
        formData.append('area', userDetails.area)
        formData.append('username', userDetails.username)
        formData.append('bio', userDetails.bio)
        formData.append('email', userDetails.email)
        performCreateOrUpdate('profiles', 'POST', formData)
        await signup(userDetails.email, password)
        navigate('/')
    }


    return (
        <Container>
            <Row className="d-flex flex-direction-column align-items-center justify-content-center mt-5">
                <Form className=" w-75 " onSubmit={handleSubmit}>

                    <Row>
                        <Col xs="2">
                            <Form.Label>Title</Form.Label>
                                <Form.Control as="select">
                                <option>Mr</option>
                                <option>Mrs</option>
                                <option>Ms</option>
                                <option>None</option>
                            </Form.Control>
                        </Col>
                        <Col xs="5">
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Name" value={userDetails.name} onChange={e => handleChange('name', e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col xs="5">
                            <Form.Group>
                                <Form.Label>Surname</Form.Label>
                                <Form.Control type="text" placeholder="Enter Surname" value={userDetails.surname} onChange={e => handleChange('surname', e.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" value={userDetails.username} onChange={e => handleChange('username', e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Area</Form.Label>
                                <Form.Control type="text" placeholder="Enter Area" value={userDetails.area} onChange={e => handleChange('area', e.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={userDetails.email} onChange={e => handleChange('email', e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group>
                        <div className="form-label">
                            <p>Profile Image</p>
                        </div>
                        <Form.Label
                            id="choose-file-label"
                            className="mt-3 btn btn-outline-primary"
                            htmlFor="choose-file-btn"
                        >
                            <PlusLg id="plus-icon-add-media" size={18} /> Add Profile Picture
                        </Form.Label>
                        <Form.Control
                            id="choose-file-btn"
                            type="file"
                            onChange={(event) => setSelectedFile(event.target.files[0])}
                        />
                        </Form.Group>

                    <Form.Group>
                        <Form.Label>Bio</Form.Label>
                        <Form.Control as="textarea" rows={2} type="text" placeholder="Enter Bio" value={userDetails.bio} onChange={e => handleChange('bio', e.target.value)}/>
                    </Form.Group>


                    <Button variant="primary" type="submit">Register</Button>
                </Form>
            </Row>
        </Container>
    )
}
