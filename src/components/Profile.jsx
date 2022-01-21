import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import ProfileJumbotron from "./ProfileJumbotron";
import RightComponent from "./RightComponent";
import ExperiencesList from "./ExperiencesList";
import Dashboard from "./Dashboard";
import SkillDropDown from './SkillDropDown'

const Profile = () => {

  const { userName } = useParams()

  return (
    <>
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <ProfileJumbotron userName={userName} />
            { userName === 'test123' &&  <Dashboard /> }
            <ExperiencesList userName={userName} />
            <SkillDropDown />
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
