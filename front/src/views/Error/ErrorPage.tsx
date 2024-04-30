import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';



function ErrorPage() {
    return (
        <Container className="mt-5">
          <Row className="justify-content-center">
            <Col md={6} className="text-center">
              <Image src="https://via.placeholder.com/400" fluid />
              <h1>404 - Page Not Found</h1>
              <p>
                Uh-oh! It looks like you've wandered into uncharted territory. This page doesn't exist in our barracks.
              </p>
              <p>
                Soldier, return to base and try another route.
              </p>
              <Link to='/' className='bg-warning p-2'>
                Back to Base
              </Link>
            </Col>
          </Row>
        </Container>
      );
}

export default ErrorPage