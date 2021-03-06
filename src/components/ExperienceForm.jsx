import { useState, useEffect } from "react"
import "../styles/experience-form.css"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import { PencilFill, PlusLg } from "react-bootstrap-icons"
import { Link } from "react-router-dom"
import Loading from "./Loading"
import Error from "./Error"
import useFetch from "../hooks/useFetch"
import useDelete from "../hooks/useDelete"
import useCreateOrUpdate from "../hooks/useCreateOrUpdate"

const ExperienceForm = ({ requestType, id, userName, handleChange }) => {
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [experience, setExperience] = useState({
      "role": "",
      "company": "",
      "startDate": "",
      "endDate": "",
      "description": "",
      "area": ""
  })

  const [stillWorkingAtRole, setStillWorkingAtRole] = useState(true)
  const [descriptionValueLength, setDescriptionValueLength] = useState(0)
  const [selectedFile, setSelectedFile] = useState(null)

    const url = id ? `profiles/${userName}/experiences/${id}` : `profiles/${userName}/experiences`
    const method = id ? 'PUT' : 'POST'

    const { data, loading: expLoading, error: expError } = useFetch(url)

    const { performDelete } = useDelete(`profiles/${userName}/experiences/${id}`)

    const { performCreateOrUpdate } = useCreateOrUpdate()


    useEffect(() => {
      if (requestType === 'put') {
        setExperience(data)
        setLoading(expLoading)
        setError(expError)
        setDescriptionValueLength(experience?.description?.length)
      }
    }, [data, expLoading, expError])

  const [show, setShow] = useState(false)
  const [notify, setNotify] = useState(true)

  const handleInput = (field, value) => {
    setExperience({
      ...experience,
      [field]: value
    })
  }

  const handleClose = () => setShow(false)

  const handleSubmit = async () => {
    let formData = new FormData()
    formData.append('experienceCover', selectedFile || '')
    formData.append('role', experience.role)
    formData.append('company', experience.company)
    formData.append('startDate', experience.startDate)
    formData.append('endDate', experience.endDate || '')
    formData.append('description', experience.description)
    formData.append('area', experience.area)
    performCreateOrUpdate(url, method, formData)
    handleClose()
    handleChange()
  }

  const handleDelete = () => {
    performDelete()
    handleClose()
    handleChange()
  }


  // if (loading) return <Loading />
  if (error) return <Error />

  return (
    <>
      {requestType === "post" ? (
        <PlusLg size={26} id="plus-icon-open-edit-form" onClick={() => setShow(true)} />
      ) : (
        <PencilFill
          size={20}
          id="pencil-icon-open-edit-form"
          onClick={() => setShow(true)}
        />
      )}
      {
        experience && (
          <Modal id="experience-form-modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            {requestType === "post" ? "Add Experience" : "Edit Experience"}{" "}
          </Modal.Title>
        </Modal.Header>
        <Alert variant="secondary">
          <Row>
            <Col xs={10}>
              <h6>Notify network</h6>
              <p>
                Turn on to notify your network. Job change updates can take up
                to 2 hours. <Link to="/">Learn more</Link>
              </p>
            </Col>
            <Col xs={2}>
              {notify ? (
                <ButtonGroup>
                  <Button
                    id="on-btn-enabled"
                    className="btn-sm"
                    variant="success"
                    onClick={() => setNotify(!notify)}
                  >
                    On
                  </Button>
                  <Button
                    id="off-btn-disabled"
                    className="btn-sm"
                    variant="outline-secondary"
                    disabled
                  >
                    Off
                  </Button>
                </ButtonGroup>
              ) : (
                <ButtonGroup>
                  <Button
                    id="off-btn-enabled"
                    className="btn-sm"
                    variant="secondary"
                    onClick={() => setNotify(!notify)}
                  >
                    Off
                  </Button>
                  <Button
                    id="on-btn-disabled"
                    className="btn-sm"
                    variant="outline-success"
                    disabled
                  >
                    On
                  </Button>
                </ButtonGroup>
              )}
            </Col>
          </Row>
        </Alert>
        <Modal.Body>
          <Form>
            <Form.Group controlId="title">
              <Form.Label>Title*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: Retail Sales Manager"
                required
                value={experience.role}
                onChange={(e) => handleInput("role", e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="company">
              <Form.Label>Company name*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: Microsoft"
                required
                value={experience.company}
                onChange={(e) => handleInput("company", e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: London, United Kingdom"
                required
                value={experience.area}
                onChange={(e) => handleInput("area", e.target.value)}
              />
            </Form.Group>
            <div id="stillWorkingAtRole" className="mb-3">
              <input
                type="checkbox"
                id="stillWorkingAtRoleCheckbox"
                name="stillWorkingAtRoleCheckbox"
                onChange={(e) => setStillWorkingAtRole(e.target.checked)}
                checked={stillWorkingAtRole}
              />
              <label htmlFor="stillWorkingAtRoleCheckbox" className="ml-2 mt-3">
                I am currently working at this role
              </label>
            </div>

            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="startDate">
                  <Form.Label>Start date*</Form.Label>
                  <Form.Control
                    type="date"
                    required
                    value={experience.startDate.split('T')[0]}
                    onChange={(e) => handleInput("startDate", e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                {!stillWorkingAtRole && (
                  <Form.Group controlId="endDate">
                    <Form.Label>End date*</Form.Label>
                    <Form.Control
                      type="date"
                      required
                      value={experience.endDate || ""}
                      onChange={(e) => handleInput("endDate", e.target.value)}
                    />
                  </Form.Group>
                )}
              </Col>
            </Row>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                maxLength="2000"
                value={experience.description}
                onChange={(e) => {
                  handleInput("description", e.target.value)
                  setDescriptionValueLength(e.target.value.length)
                }}
              />
              <div className="d-flex justify-content-end">
                <p id="characterCount">{descriptionValueLength}/2,000</p>
              </div>
            </Form.Group>
            <Form.Group>
              <div className="form-label">
                <p>Media</p>
                <p>
                  Add or link to external documents, photos, sites, videos, and
                  presentations. <Link to="/learn-more">Learn more</Link>{" "}
                </p>
              </div>
              <Form.Label
                id="choose-file-label"
                className="mt-3 btn btn-outline-primary"
                htmlFor="choose-file-btn"
              >
                <PlusLg id="plus-icon-add-media" size={18} /> Add media
              </Form.Label>
              <Form.Control
                id="choose-file-btn"
                type="file"
                onChange={(event) => setSelectedFile(event.target.files[0])}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer
          className={`d-flex ${
            requestType === `put`
              ? `justify-content-between`
              : `justify-content-end`
          }`}
        >
          {requestType === "put" && (
            <Button id="delete-experience-btn" onClick={handleDelete}>
              Delete experience
            </Button>
          )}

          <Button
            id="save-experience-btn"
            className="px-3 py-1"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
        )
      }
    </>
  )
}

export default ExperienceForm
