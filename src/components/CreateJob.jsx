import { Form, Container, Button } from "react-bootstrap"
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function CreateJob() {

    const navigate = useNavigate()

    const [jobDetails, setJobDetails] = useState({
        "title": "",
        "company": "",
        "area": "",
        "description": "",
        "salary": 20000,
        "type": "full-time",
    })

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const response = await axios({
                url: `http://localhost:3001/jobs`,
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                data: JSON.stringify(jobDetails)
            })
            navigate(`/jobs/${response.data._id}`)
            // const response = await fetch(`http://localhost:3001/jobs`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(jobDetails)
            // })
            // if (!response.ok) throw new Error('POST FAILED')
            // const result = await response.json()
            // navigate(`/jobs/${result._id}`)
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (field, value) => {
        setJobDetails({
            ...jobDetails,
            [field]: value
        })
    }

    return (
        <Container className="card-bg-white rounded p-3 mt-5">
            <Form onSubmit={handleSubmit}>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Job Title</Form.Label>
                    <Form.Control type="text" placeholder="CEO" value={jobDetails.title} onChange={e => handleChange('title', e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Company</Form.Label>
                    <Form.Control type="text" placeholder="LinkedIn" value={jobDetails.company} onChange={e => handleChange('company', e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Area</Form.Label>
                    <Form.Control type="text" placeholder="Manchester" value={jobDetails.area} onChange={e => handleChange('area', e.target.value)} />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Type</Form.Label>
                    <Form.Control as="select" value={jobDetails.type} onChange={e => handleChange('type', e.target.value)}>
                    <option>full-time</option>
                    <option>part-time</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Salary</Form.Label>
                    <Form.Control type="number" min="0" value={jobDetails.salary} onChange={e => handleChange('salary', e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        as="textarea" rows={3} type="text" placeholder="This job involves..." 
                        value={jobDetails.description} onChange={e => handleChange('description', e.target.value)} 
                    />
                </Form.Group>
                
                <Button variant="primary" type="submit">Create</Button>
            </Form>
        </Container>
    )
}