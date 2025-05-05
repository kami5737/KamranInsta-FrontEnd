import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import CreatorView from './pages/CreatorView';
import ConsumerView from './pages/ConsumerView';
import Login from './pages/Login';
import Register from './pages/Register';
// import bgImage from './assets/instagram-icon.png';

// const styles = {
//   backgroundImage: `url(${bgImage})`,
//   backgroundRepeat: 'repeat',
//   backgroundSize: '60px',
//   backgroundColor: '#000',
//   minHeight: '100vh', // makes sure the background fills the screen
//   color: '#fff', // optional: makes text readable on black
// };

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);
  return (
    <>
      {/* <div className="icon-float">
        {Array.from({ length: 20 }).map((_, i) => (
          <img
            key={i}
            src={bgImage}
            alt="bg-icon"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${30 + Math.random() * 30}px`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div> */}

      <Router>
        <Navbar 
          isAuthenticated={isAuthenticated} 
          userRole={userRole} 
          onLogout={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            setIsAuthenticated(false);
            setUserRole('');
          }} 
        />
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login onLogin={(role) => {
            setIsAuthenticated(true);
            setUserRole(role);
          }} /> : <Navigate to="/" />} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
          <Route path="/" element={<ConsumerView />} />
          <Route 
            path="/creator" 
            element={isAuthenticated && userRole === 'creator' ? <CreatorView /> : <Navigate to="/" />} 
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
