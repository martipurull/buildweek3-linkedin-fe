import { Container, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useParams } from "react-router";
import ProfileJumbotron from "./ProfileJumbotron";
import RightComponent from "./RightComponent";
import ExperiencesList from "./ExperiencesList";

const Profile = () => {
  
  const { userName } = useParams()

  return (
    <>
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <ProfileJumbotron userName={userName} />
            {/* <ExperiencesList />
          </Col>
          <Col xs={12} md={4}>
            <RightComponent /> */}
          </Col> 
        </Row>
      </Container>
    </>
  );
};

export default Profile;
