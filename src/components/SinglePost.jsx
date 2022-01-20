import "../App.css";
import { useEffect, useState } from "react";
import LikeShare from "./LikeShare";
import {
  Image,
  Col,
  Row,
  Button,
  Modal,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import {
  BarChartLineFill,
  BlockquoteLeft,
  BriefcaseFill,
  CalendarDateFill,
  CaretDownFill,
  ChatLeftTextFill,
  ChatTextFill,
  FileEarmarkTextFill,
  Globe2,
  ImageFill as ImageIcon,
  Info,
  PlayBtnFill,
  ThreeDots,
} from "react-bootstrap-icons";
import useCreateOrUpdate from "../hooks/useCreateOrUpdate";

const SinglePost = ({ post }) => {

  const { performCreateOrUpdate } = useCreateOrUpdate()
  const [show, setShow] = useState(false)

  const [postImage, setPostImage] = useState(post?.image)
  const [postText, setPostText] = useState(post?.text)

  const handleSubmit = () => {
    let formData = new FormData()
    formData.append('postImage', postImage || '')
    formData.append('text', postText || '')
    performCreateOrUpdate(`posts/${ post._id }`, 'PUT', formData)
    setShow(false)
  }

  return (
    <div
      className="singlepost p-3 mt-3"
      style={{
        border: "1px solid lightgrey",
        borderRadius: "10px",
        marginBottom: "50px",
        background: "#fff",
      }}
    >
      <Row>
        <Col xs="auto" className="experience">
          <Image
            src={post?.user?.image}
            width={49}
            height={49}
            style={{ borderRadius: "50%" }}
          />
        </Col>
        <Col className="pl-0">
          <h6 className="m-0 ">{post?.user?.name}</h6>
          <p className="text-muted " style={{ fontSize: "11px" }}>
            {" "}
            {post?.user?.bio}
            <br />
            {/* {timeSince(new Date(Date.now() - aDay))} */}
            <i className="fas fa-globe-europe"></i>
          </p>
        </Col>
        <Col className="d-flex justify-content-end p-0 pr-4">
          <i className="fas fa-ellipsis-h" onClick={() => setShow(true)}></i>
        </Col>
      </Row>
      <Row className="mt-2 mx-1">
        <p>{post?.text}</p>
        {post?.image && <Image src={post?.image} style={{ width: "100%" }} />}
      </Row>
      <hr />
      <LikeShare />
      <Row className=" d-flex justify-content-between align-items-center p-0 m-1">
        <Col className="p-0" xs="auto">
          <Image
            src={post?.user?.image}
            style={{ borderRadius: "50%", width: "48px" }}
          />
        </Col>
        <Col className="pl-0">
          <Form.Control
            type="text"
            placeholder="Add a comment "
            className="m-3 pl-3 pr-2"
            style={{ borderRadius: "30px", border: "1px solid black" }}
          />
        </Col>
      </Row>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center">
            <div className="p-1">
              <Image className="newPostProfileImg" src={post?.user?.image} />
            </div>
            <div className="p-1">
              <Button
                className="newPostStartPostButton d-flex align-items-center mx-2"
                variant="outline-secondary"
              >
                <Info size={24} />
                <span>{post?.user?.name}</span>
                <CaretDownFill className="ml-2" />
              </Button>
            </div>
            <div className="p-1">
              <Button
                className="newPostStartPostButton d-flex align-items-center mx-2"
                variant="outline-secondary"
              >
                <Globe2 className="mr-2" />
                <span>Anyone</span>
                <CaretDownFill className="ml-2" />
              </Button>
            </div>
          </div>
          <Form.Group className="my-3">
            <Form.Control
              as="textarea"
              value={postText}
              placeholder="What do you want to talk about?"
              rows={3}
              onChange={(event) => setPostText(event.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Post Photo</Form.Label>
            <Form.Control
              type="file"
              onChange={(event) => {
                setPostImage(event.target.files[0]);
              }}
            />
          </Form.Group>

          <Button className="hashtagButton" variant="outline-primary">
            Add hashtag
          </Button>
          <div className="d-flex align-items-center">
            <div className="d-flex justify-content-between align-items-center mt-3 ml-2 w-100">
              <div className="newPostBottomIcons d-flex justify-content-center align-items-center text-secondary p-2">
                <ChatTextFill className="mr-2" size={20} />
                Anyone
              </div>
              <div className="newPostBottomIcons d-flex justify-content-center align-items-center text-secondary p-2">
                <Button
                  className="post-button"
                  variant="secondary"
                  onClick={handleSubmit}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SinglePost;
