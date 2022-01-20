import { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useParams } from "react-router";
import SingleExperience from "./SingleExperience";
import ExperienceForm from "./ExperienceForm";
import Loading from "./Loading";
import Error from "./Error";
import useFetch from "../hooks/useFetch";

const ExperiencesList = ({ userName }) => {

  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { data, loading: expLoading, error: expError } = useFetch(`profiles/${userName}/experiences`)

  useEffect(() => {
    setExperiences(data)
    setLoading(expLoading)
    setError(expError)
  }, [data, expLoading, expError, userName])

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <Container className="singleexperience p-2">
        <Row className="p-2">
          <Col>
            <h4>Experience</h4>
          </Col>
          <Col className="d-flex justify-content-end p-0 pr-3">
            <ExperienceForm requestType={"post"} userName={userName}/>
          </Col>
        </Row>
        {experiences?.map(exp => <SingleExperience key={exp._id} experience={exp} userName={userName}/> )}
      </Container>
    </>
  );
};

export default ExperiencesList;
