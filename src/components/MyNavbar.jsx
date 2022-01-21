import "../styles/navbar-styles.css";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  BellFill,
  BriefcaseFill,
  CaretDownFill,
  ChatDotsFill,
  Grid3x3GapFill,
  HouseDoorFill,
  PeopleFill,
  Search,
} from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useAuth } from "../contexts/AuthContext";

const MyNavbar = () => {

  const navigate = useNavigate()  
  const { pathname } = useLocation()
  
  const [query, setQuery] = useState('')
  const [userProfile, setUserProfile] = useState()
  const [showPopover, setShowPopover] = useState(false)
  const { logout, currentUser } = useAuth()

  const { data } = useFetch(`profiles/${currentUser?.username}`)

  useEffect(() => {
    setUserProfile(data)
  }, [data])

  const handleSubmit = e => {
    e.preventDefault()
    navigate(`/search?query=${query}`)
    setQuery('')
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const mePopover = (
    <Popover id="popover-contained">
      <Popover.Content>
        <ListGroup.Item>
          <div className="d-flex modal-profile-container">
            <div>
              <img
                id="modal-profile-pic"
                src={userProfile?.image}
                alt="profile"
              />
            </div>
            <div className="ml-3">
              <h5>
                {userProfile?.name} {userProfile?.surname}
              </h5>
              <p>{userProfile?.title}</p>
            </div>
          </div>
          <div id="modal-view-profile-btn-container">
            <Link to={`/profile/${userProfile?.username}`}>
              <Button
                id="modal-view-profile-btn"
                variant="outline-primary"
                onClick={() => setShowPopover(false)}
              >
                View Profile
              </Button>
            </Link>
          </div>
        </ListGroup.Item>
        <ListGroup.Item>
          <h5>Account</h5>
          <p className="mb-1 text-muted">Settings &amp; Privacy</p>
          <p className="mb-1 text-muted">Help</p>
          <p className="mb-1 text-muted">Language</p>
        </ListGroup.Item>
        <ListGroup.Item>
          <h5>Manage</h5>
          <p className="mb-1 text-muted">Posts &amp; Activity</p>
          <Link to="/jobs-create" className="mb-1 text-muted">Create Job</Link>
          <p className="mb-1 text-muted">Edit Job</p>
        </ListGroup.Item>
        <ListGroup.Item onClick={handleLogout}>
          <p className="mb-1 text-muted">Log Out</p>
        </ListGroup.Item>
      </Popover.Content>
    </Popover>
  );

  return (
    <>
      <Navbar className="py-0" id="navbar-body" bg="white" expand="lg">
        <Container>
          <Link to="/">
            <img
              className="navbar-icon-container d-none d-md-block"
              id="navbar-logo"
              src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg"
              alt="LinkedIn Logo"
            />
          </Link>
          { currentUser && (
          <>
          <Form inline className="d-none d-lg-block" onSubmit={handleSubmit}>
            <Form.Group id="navbar-search-container">
              <InputGroup.Prepend>
                <Search id="navbar-search-icon" className="mx-2" size={16} />
              </InputGroup.Prepend>
              <FormControl
                id="form-control-search-form-control"
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </Form.Group>
          </Form>
          <div id="navbar-centre" className="ml-auto">
            <Link to="/" className={pathname !== '/' && "text-muted"}>
              <div className="navbar-icon-container mt-2 text-center">
                <HouseDoorFill size={22} className="navbar-icon" />
                Home
              </div>
            </Link>
            <div className="navbar-icon-container mt-2 text-center">
              <PeopleFill size={22} className="navbar-icon" />
              My Network
            </div>
            <Link to="/jobs" className={!pathname.startsWith('/jobs') && "text-muted"}>
            <div className="navbar-icon-container mt-2 text-center">
              <BriefcaseFill size={22} className="navbar-icon" />
              Jobs
            </div>
            </Link>
            <div className="navbar-icon-container mt-2 text-center">
              <ChatDotsFill size={22} className="navbar-icon" />
              Messaging
            </div>
            <div className="navbar-icon-container mt-2 text-center">
              <BellFill size={22} className="navbar-icon" />
              Notification
            </div>
            <OverlayTrigger
              trigger="click"
              rootClose
              placement="bottom"
              overlay={mePopover}
              show={showPopover}
            >
              <div
                className="navbar-icon-container text-center"
                id="shrinking-btn"
                onMouseUp={() => setShowPopover(!showPopover)}
              >
                <img
                  className="navbar-profile-pic"
                  src={userProfile?.image}
                  alt="profile"
                />
                <div>
                  Me <CaretDownFill />
                </div>
              </div>
            </OverlayTrigger>
            <div className="navbar-icon-container navbar-right-section text-center">
              <Grid3x3GapFill size={22} />
              <div>
                Work <CaretDownFill />
              </div>
            </div>
            <Link to="/premium">
              <div
                id="try-premium"
                className="d-none d-lg-block text-center mt-2"
              >
                Try Premium for <br />
                free
              </div>
            </Link>
          </div>
          </>
          )}
        </Container>
      </Navbar>

    </>
  );
};

export default MyNavbar;
