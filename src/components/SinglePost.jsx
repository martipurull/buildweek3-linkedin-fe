import "../App.css";
import { useEffect, useState } from "react";
import { Col, Form, Row, Image } from "react-bootstrap";
import LikeShare from "./LikeShare";

const SinglePost = ({ post }) => {

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
            src={post.user.image}
            width={49}
            height={49}
            style={{ borderRadius: "50%" }}
          />
        </Col>
        <Col className="pl-0">
          <h6 className="m-0 ">{post.user.name}</h6>
          <p className="text-muted " style={{ fontSize: "11px" }}>
            {" "}
            {post.user.bio}
            <br />
            {/* {timeSince(new Date(Date.now() - aDay))} */}
            <i className="fas fa-globe-europe"></i>
          </p>
        </Col>
        <Col className="d-flex justify-content-end p-0 pr-4">
          <i className="fas fa-ellipsis-h"></i>
        </Col>
      </Row>
      <Row className="mt-2 mx-1">
        <p>{post.text}</p>
        {post.image && <Image src={post.image} style={{ width: "100%" }} />}
      </Row>
      <hr />
      <LikeShare />
      <Row className=" d-flex justify-content-between align-items-center p-0 m-1">
        <Col className="p-0" xs="auto">
          <Image
            src={post.user.image}
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
    </div>
  );
};

export default SinglePost;
