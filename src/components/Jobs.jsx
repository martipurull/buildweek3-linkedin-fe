import { useState, useEffect } from "react"
import useFetch from "../hooks/useFetch"
import SingleJob from "./SingleJob"
import { Container, Row, Col } from 'react-bootstrap'
import LeftComponent from "./LeftComponent"
import RightComponent from "./RightComponent"

export default function Jobs() {

    const [refreshNum, setRefreshNum] = useState(0)
    const [jobs, setJobs] = useState(null)

    const { data } = useFetch('jobs', refreshNum)

    useEffect(() => {
        setJobs(data)
    }, [data, refreshNum])

    return (
        <Container>
            <Row>
                <Col xs="3">
                    <LeftComponent />
                </Col>
                <Col xs="6" className="mt-5">
                {
                    jobs && jobs.jobs.map(job => (
                        <Col xs="12" className="my-2">
                            <SingleJob key={job._id} job={job} />
                        </Col>
                    ))
                }
                </Col>
                <Col xs="3">
                    <RightComponent />
                </Col>
            </Row>
        </Container>
    )
}
