import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const NavigationBar = ({ isAuthenticated, userRole, onLogout }) => {
  console.log('Navbar props:', { isAuthenticated, userRole });
  return (
    <Navbar style={{ 
      backgroundColor: '#f01a33',
      boxShadow: '0 2px 10px rgba(234, 31, 96, 0.1)',
      borderBottom: '1px solidrgb(197, 206, 30)'
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
        Kamran Khan Insta App
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
              MY HOME
            </Nav.Link>
            {isAuthenticated && (
             <div>
                {
            userRole === 'creator' && (
              <Button
                as={Link}
                to="/creator"
                style={{
                  borderRadius: '6px',
                  padding: '8px 20px',
                  fontWeight: '500',
                  marginLeft: '300px',
                  backgroundColor: '#f01adb',
                  borderColor: '#4e7cff',
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  fontSize: '0.85rem',
                  letterSpacing: '0.5px'
                }}
                className="btn-hover-effect"
              >
                UPLOAD ME
              </Button>
            )}
              </div>
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
                    color: '#1af068',
                    backgroundColor: '#f01adb',
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