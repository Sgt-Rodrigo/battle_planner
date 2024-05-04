import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import  './MainFooter.module.scss';



function MainFooter() {
  return (
    <footer className="bg-dark mt-5" data-bs-theme="dark">
      <Container>
        <Row>
          <Col className="text-center py-2">
            <h5>Battle Bookings</h5>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-2">
            <Nav className="justify-content-center">
              <Nav.Item>
                <Nav.Link as={Link} to="/"><span>Home</span></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/user/deployments"><span>My Deployments</span></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/user/new_deployment"><span>Request Deployment</span></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/user/register"><span>Register</span></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/user/login"><span>Login</span></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/about"><span>About Us</span></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className='text-danger' as={Link} to="/contact"><span>Contact Us</span></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/privacy"><span>Privacy Policy</span></Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <Row>
          <hr />
          <Col className="text-center py-2">
            &copy; 2024 Battle Bookings by Rodrigo Fernandez. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default MainFooter