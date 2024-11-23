import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import { BsInstagram } from "react-icons/bs";


export default function NavBar() {
  return (
    <>
      <Navbar expand="lg" className="navBar">
        <Container>
          <Navbar.Brand href="/">
            <img alt="" src="/images/dkl.png" className="logo" />{' '}
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link to="/" as={NavLink} className="mx-3">
                Home
              </Nav.Link>
              <Nav.Link to="/Wildlife" as={NavLink} className="mx-3">
                Wildlife Photography
              </Nav.Link>
              <Nav.Link to="/Astro" as={NavLink} className="mx-3">
                Astro Photography
              </Nav.Link>
              <Nav.Link to="/OutAndAbout" as={NavLink} className="mx-3">
                Out and About
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <BsInstagram className="instagram"/>
         

        </Container>
      </Navbar>
    </>
  );
}
