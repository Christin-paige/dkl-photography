import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {NavLink} from 'react-router-dom'

export default function NavBar() {
  return (
    <Navbar className="navBar">
      <Container>
        <Navbar.Brand href="/">
          <img alt="" src="/images/dkl.png" className="logo" />{' '}
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to="/About" as={NavLink}>
            About
          </Nav.Link>
          <Nav.Link to="/Wildlife" as={NavLink}>
            Wildlife Photography
          </Nav.Link>
          <Nav.Link to="/Astro" as={NavLink}>
            Astro Photography
          </Nav.Link>
          <Nav.Link to="/OutAndAbout" as={NavLink}>
            Out and About
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}