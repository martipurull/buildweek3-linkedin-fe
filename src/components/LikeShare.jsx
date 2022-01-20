import { Button, OverlayTrigger, Row, Tooltip } from "react-bootstrap";

const LikeShare = () => {
  return (
    <Row className="d-flex justify-content-around">
      <Button variant="outline-secondary" className="like">
        <i className="far fa-thumbs-up likeshare"></i> Like
          </Button>
      <Button className="like" variant="outline-secondary">
        <i className="far fa-comment likeshare"></i> Comment
      </Button>
      <Button className="like" variant="outline-secondary">
        <i className="fas fa-share likeshare"></i> Share
      </Button>
      <Button className="like" variant="outline-secondary">
        <i className="fas fa-paper-plane likeshare"></i> Send
      </Button>
    </Row>
  );
};

export default LikeShare;
