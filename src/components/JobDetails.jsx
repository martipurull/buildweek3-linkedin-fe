import { Button, Card, Col, Container, Row } from "react-bootstrap"
import useFetch from '../hooks/useFetch'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function JobDetails() {
    
    const { jobId } = useParams()
    const { data } = useFetch(`jobs/${jobId}`)

    const [job, setJob] = useState(null)

    let currencyFormatter = new Intl.NumberFormat(undefined, {
        currency: 'GBP',
        style: 'currency',
        minimumFractionDigits: 0
    })

    useEffect(() => {
        setJob(data)
    }, [data])


    return (
        <Container>
            <Row>
                <Col xs="12">
                    <Card className="mt-4 p-3">
                        { job && 
                        <>
                            <h3>{job.title}</h3>
                            <p className="text-muted mb-2">{job.company} &#8901; {job.area}</p>
                            <p className="text-muted mb-2">{job.type} - {currencyFormatter.format(job.salary)}</p>
                            <p className="text-muted mb-3">{job.applicants.length} person applied</p>
                            <p className="mb-2">Description:</p>
                            <p className="mb-4">{job.description}</p>
                        </>
                        }
                        <Button>Apply Now</Button>
                    </Card>    
                </Col>
            </Row>
        </Container>
    )
}
