import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Tour Agency
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/countries"
              className={location.pathname === '/countries' ? 'active' : ''}
            >
              Countries
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/routes"
              className={location.pathname === '/routes' ? 'active' : ''}
            >
              Routes
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/sales"
              className={location.pathname === '/sales' ? 'active' : ''}
            >
              Sales
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/statistics"
              className={location.pathname === '/statistics' ? 'active' : ''}
            >
              Statistics
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;