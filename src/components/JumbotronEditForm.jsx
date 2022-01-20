import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { PencilFill } from "react-bootstrap-icons";
import { Link } from "react-bootstrap-icons";

const JumbotronEditForm = () => {
  

  return (
    <>
      <PencilFill variant="primary" onClick={() => setShow(true)}></PencilFill>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-100w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Edit Intro
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="type your first name here"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="type your last name here"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Additional Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="type your additional name here"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Profile Photo</Form.Label>
              <Form.Control
                type="file"
                onChange={(event) => {
                  setFormData(event.target.files[0]);
                }}
              />
            </Form.Group>
            <Button variant="primary" onClick={uploadProfileImage}>
              Upload
            </Button>

            <Form.Group>
              <Form.Label>Pronouns</Form.Label>
              <Form.Control as="select">
                <option>He/Him</option>
                <option>She/Her</option>
              </Form.Control>
              <p className="text-muted">Let others know how to refer to you</p>
              <Link to="/"> Learn more</Link>
            </Form.Group>

            <Form.Group>
              <Form.Label>Headline</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Industry</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Education</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default JumbotronEditForm;
