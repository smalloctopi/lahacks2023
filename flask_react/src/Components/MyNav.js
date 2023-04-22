import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';

const MyNav = () => {
  const logout = (e) => {
    localStorage.removeItem('jwt');
  };

  return (
    <Navbar className="navbar-custom" expand="lg">
      <Container>
        <LinkContainer to="/" style={{ cursor: 'pointer' }}>
          <Navbar.Brand>Beeline</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/generate_exams">
              <Nav.Link>Exams</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/Home">
              <Nav.Link>Tutorial</Nav.Link>
            </LinkContainer>
            <Navbar.Text className="mx-5">
              Signed in as: Jenny Lee {/*(make dynamic)*/}
            </Navbar.Text>
            <LinkContainer to="/login" onClick={logout}>
              <Nav.Link>Logout</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNav;
