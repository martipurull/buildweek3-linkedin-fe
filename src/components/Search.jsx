import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import useFetch from "../hooks/useFetch";
import RightComponent from "./RightComponent";

export default function Search() {

    const [searchResults, setSearchResults] = useState(null)
    const [refreshNum, setRefreshNum] = useState(0)

    const { data } = useFetch(`search`, refreshNum)

    useEffect(() => (
        setSearchResults(data)
    ), [data])

    return (
        <Container>
            <Row>
                <Col xs="8">
                    <Card>
                        { searchResults && JSON.stringify(searchResults) }
                    </Card>
                </Col>
                <Col xs="4">
                    <RightComponent />
                </Col>
            </Row>
        </Container>   
    )
}
