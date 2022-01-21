import { Row, Col, Image, Container, Modal, Button, Form } from 'react-bootstrap'
import { Trash, Pencil } from 'react-bootstrap-icons'
import useDelete from '../hooks/useDelete'
import { useState } from 'react'
import { CaretDownFill, Globe2, Info } from "react-bootstrap-icons";
import useCreateOrUpdate from "../hooks/useCreateOrUpdate"

const SingleComment = ({ comment, post }) => {

    const { performDelete } = useDelete(`posts/${ post._id }/comments/${ comment._id }`)
    const { performCreateOrUpdate } = useCreateOrUpdate()
    const [show, setShow] = useState(false)

    const [commentText, setCommentText] = useState(comment.text)

    const handleDelete = () => {
        performDelete()
        window.location.reload()
    }

    const editComment = (event) => {
        fetch(`${ process.env.REACT_APP_BASE_URL }/posts/${ post._id }/comments/${ comment._id }`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: commentText })
            })
        setShow(false)
        window.location.reload()
    }

    return (
        <Container className="w-75">
            <Row className=" d-flex justify-content-between align-items-center p-0 m-1">
                <Col className="p-0" xs="auto">
                    <Image
                        src={comment?.user?.image}
                        style={{ borderRadius: "50%", width: "32px" }}
                    />
                </Col>
                <Col className="pl-0">
                    <p className="pt-3 pl-3" style={{ color: "Gray", borderBottom: "1px solid LightGray" }}>{comment.text}</p>
                </Col>
                <Col>
                    <Trash onClick={handleDelete} />
                    <Pencil onClick={() => setShow(true)} />
                </Col>
            </Row>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex align-items-center">
                        <div className="p-1">
                            <Image className="newPostProfileImg" src={comment?.user?.image} />
                        </div>
                        <div className="p-1">
                            <Button
                                className="newPostStartPostButton d-flex align-items-center mx-2"
                                variant="outline-secondary"
                            >
                                <Info size={24} />
                                <span>{comment?.user?.username}</span>
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
                            value={commentText}
                            rows={1}
                            onChange={(event) => setCommentText(event.target.value)}
                        />
                    </Form.Group>
                    <Button
                        className="post-button"
                        variant="warning"
                        onClick={editComment}
                    >
                        Edit Comment
                </Button>
                </Modal.Body>
            </Modal>
        </Container>
    )
}

export default SingleComment