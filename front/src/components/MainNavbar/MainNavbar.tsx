import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/state/store';
import ChevronSergeant from '../../assets/images/ChevronSergeant.png';
import styles from './MainNavbar.module.scss';
import { logout } from '../../redux/slices/userSlice';

function MainNavbar() {

  const userData = useSelector((state:RootState)=>state.user)
  const dispatch = useDispatch<AppDispatch>();

  function handleLogout(){
    if(window.confirm('YOU ARE GOING AWOL! >>> ARE YOU SURE?')){
      dispatch(logout());
    }
  }

  return (
    <>
      <Navbar sticky="top" bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
          <img src={ChevronSergeant} alt="chevron icon" 
          style={{ width: '30px', height: '30px' }}
          />
          </Navbar.Brand>
          <Navbar.Brand>
            BattlePlanner
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto gap-4 black-ops-one-regular">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              {/* if user is logged in, the following link is rendered */}
              {userData.login && 
              <Nav.Link as={Link} to="/user/deployments">
                My Deployments
                </Nav.Link>}
              {
                userData.login && 
                <Nav.Link as={Link} to="/user/new_deployment">
                  Request-Deployment
                </Nav.Link>
              }
              {
                !userData.login && 
                <>
                <Nav.Link as={Link} to="/user/register">Register</Nav.Link>
                <Nav.Link as={Link} to="/user/login">Login</Nav.Link>
                </>

              }
              {
                userData.login && 
                <Navbar.Brand className={`align-self-center border  border-warning px-2 ${styles.user_name}`}>
                   {userData.user.name}
               </Navbar.Brand>
              }
              {
                userData.login &&
                <Nav.Link as={Link} to="/" onClick={handleLogout}>LogOut</Nav.Link>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MainNavbar