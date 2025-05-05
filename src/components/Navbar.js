import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const NavigationBar = ({ isAuthenticated, userRole, onLogout }) => {
  return (
    <Navbar style={{ 
      backgroundColor: '#2a3f54',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      borderBottom: '1px solid #40566b'
    }} variant="dark" expand="lg">
      <Container>
        <Navbar.Brand 
          as={Link} 
          to="/"
          style={{
            color: '#e8f4fc',
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}
        >
          Ahmer Tariq
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/"
              style={{
                color: '#cbd5e0',
                padding: '8px 15px',
                margin: '0 5px',
                borderRadius: '4px',
                transition: 'all 0.3s ease'
              }}
              className="nav-link-hover"
            >
              Main Page
            </Nav.Link>
            {isAuthenticated && userRole === 'creator' && (
              <Button
                as={Link}
                to="/creator"
                style={{
                  borderRadius: '6px',
                  padding: '8px 20px',
                  fontWeight: '500',
                  marginLeft: '300px',
                  backgroundColor: '#4e7cff',
                  borderColor: '#4e7cff',
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  fontSize: '0.85rem',
                  letterSpacing: '0.5px'
                }}
                className="btn-hover-effect"
              >
                Create Content
              </Button>
            )}
          </Nav>
          <Nav>
            {!isAuthenticated ? (
              <>
                <Nav.Link 
                  as={Link} 
                  to="/login"
                  style={{
                    color: '#cbd5e0',
                    padding: '8px 15px',
                    margin: '0 5px',
                    borderRadius: '4px'
                  }}
                  className="nav-link-hover"
                >
                  Sign In
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/register"
                  style={{
                    color: '#ffffff',
                    backgroundColor: '#4e7cff',
                    padding: '8px 15px',
                    margin: '0 5px',
                    borderRadius: '4px',
                    fontWeight: '500'
                  }}
                  className="nav-link-hover"
                >
                  Join Now
                </Nav.Link>
              </>
            ) : (
              <Button 
                variant="outline-light" 
                onClick={onLogout}
                style={{
                  borderRadius: '6px',
                  padding: '8px 20px',
                  borderColor: '#cbd5e0',
                  color: '#cbd5e0',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
                className="btn-hover-effect"
              >
                Sign Out
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;