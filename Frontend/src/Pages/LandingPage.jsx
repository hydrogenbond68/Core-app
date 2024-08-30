import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from '../components/Registration'; // Import Registration component

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is not logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/register'); // Redirect to the registration page
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the backend
      const response = await axios.post('http://127.0.0.1:8000/token', { email, password });

      const { token, user } = response.data;

      // Store the token and user information in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect to the appropriate page based on user role
      if (user.isAdmin) {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to the registration page if unauthorized
        navigate('/register');
      } else {
        console.error('An error occurred during login:', error);
        // Show an error message to the user
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="w-full h-full bg-cover bg-center bg-[url('https://i.pinimg.com/736x/d9/59/02/d95902b0460a9fabe254913a3d71867a.jpg')]"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md p-8">
        {/* Welcome Text */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-white">Welcome to Core</h1>
        </div>

        {/* Form Container with Gradient Background */}
        <div className="p-8 bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-600 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6 text-white">Login</h2>
          <Form onSubmit={handleLogin} className="space-y-4">
            <Form.Group controlId="formEmail">
              <Form.Label className="text-white">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-md border-gray-300 shadow-sm bg-white text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label className="text-white">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-md border-gray-300 shadow-sm bg-white text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-full py-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Login
            </Button>

            {/* Error Message */}
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
