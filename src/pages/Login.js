import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData.username, formData.password);
      console.log('Login response:', response); // Check the response data
      console.log('Role from login:', response.role); // Verify role exists
      onLogin(response.role);
      navigate('/');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <div className="auth-box p-4 rounded" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <div className="text-center">
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default Login;