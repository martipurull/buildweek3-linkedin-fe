import { Container, Row, Col } from "react-bootstrap";
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
            <ExperiencesList userName={userName} />
          </Col>
          <Col xs={12} md={4}>
            <RightComponent />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
