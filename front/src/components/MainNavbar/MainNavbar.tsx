import { NavLink } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/state/store';


function MainNavbar() {

  const userData = useSelector((state:RootState)=>state.user)

  return (
    <>
      <Navbar sticky="top" bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              {/* if user is logged in, the following link is rendered */}
              {userData.login && 
              <Nav.Link as={Link} to="/user/deployments">
                My Deployments
                </Nav.Link>}
              {
                userData.login && 
                <Nav.Link as={Link} to="/user/new_deployment">
                  Request Deployment
                </Nav.Link>
              }
              <Nav.Link as={Link} to="/user/register">Register</Nav.Link>
              <Nav.Link as={Link} to="/user/login">Login</Nav.Link>

              
              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item as={NavLink} to="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={NavLink} to="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MainNavbar