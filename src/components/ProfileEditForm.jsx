import '../styles/profile-edit-form.css'
import { PencilFill, InfoSquareFill, PlusLg } from 'react-bootstrap-icons'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'


const ProfileEditForm = ({ profileDetails }) => {

    const [updatedProfile, setUpdatedProfile] = useState(profileDetails)
    const [showEducation, setShowEducation] = useState(true)
    const [formData, setFormData] = useState(null)

    const [show, setShow]  = useState(false)

    const handleInput = (field, value) => {
        setUpdatedProfile({
            ...updatedProfile,
            [field]: value
        })
    }

    const uploadProfileImage = () => {

    }

    const handleSubmit = () => {

    }

    return (
        <>
            <PencilFill
                size={20}
                id="pencil-icon-open-edit-form"
                onClick={() => setShow(true)}
            />
            <Modal id="profile-edit-form-modal" show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Edit intro
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p id="edit-profile-form-required-notice">*Indicates required</p>
                    <Form>
                        <Form.Group controlId="firstName">
                            <Form.Label>First name*</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={updatedProfile.name}
                                onChange={(e) => handleInput("name", e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="lastName">
                            <Form.Label>Last name*</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={updatedProfile.surname}
                                onChange={(e) => handleInput("surname", e.target.value)}
                            />
                        </Form.Group>
                        <p className="profile-form-small-notice" >Name pronunciation</p>
                        <InfoSquareFill /> <span>This can only be added using our mobile app</span>
                        <Form.Group controlId="profile-edit-form-pronouns">
                            <Form.Label>Pronouns</Form.Label>
                            <Form.Control as="select" placeholder="Please select">
                                <option>She/Her</option>
                                <option>He/Him</option>
                                <option>They/Them</option>
                                <option>Custom</option>
                            </Form.Control>
                            <p className="profile-form-small-notice" >Let others know how to refer to you.</p>
                            <p><Link to="/">Learn more</Link></p>
                        </Form.Group>
                        <div id="showEducation" className="mb-3">
                            <input
                                type="checkbox"
                                id="showEducationCheckbox"
                                name="showEducationCheckbox"
                                onChange={(e) => setShowEducation(e.target.checked)}
                                checked={showEducation}
                            />
                            <label for="showEducationCheckbox" className="ml-2 mt-3">
                                Show education in my intro
                            </label>
                        </div>
                        <Form.Group controlId="location">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ex: London, United Kingdom"
                                required
                                value={updatedProfile.area}
                                onChange={(e) => handleInput("area", e.target.value)}
                            />
                            <Form.Control
                                type="text"
                                placeholder="enter your postcode"
                                value={updatedProfile.bio}
                                onChange={(e) => handleInput("bio", e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Contact info</Form.Label>
                            <p>Edit your email address</p>
                            <Form.Control
                                type="text"
                                value={updatedProfile.email || ''}
                                onChange={(e) => handleInput("email", e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <div className="form-label">
                                <p>Profile Picture</p>
                                <p>Add a new profile picture</p>
                            </div>
                            <Form.Label
                                id="choose-file-label"
                                className="mt-3 btn btn-outline-primary"
                                for="choose-file-btn">
                                <PlusLg id="plus-icon-add-media" size={18} /> Select new profile image
                            </Form.Label>
                            <Form.Control
                                id="choose-file-btn"
                                type="file"
                                onChange={(event) => {
                                    setFormData(event.target.files[0]);
                                }}
                            />
                        </Form.Group>
                        <Button className="save-profile-btn btn-sm" onClick={uploadProfileImage}>Upload image</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer className={"d-flex justify-content-end"}>
                    <Button
                        id="save-profile-btn"
                        className="px-3 py-1"
                        onClick={handleSubmit}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ProfileEditForm