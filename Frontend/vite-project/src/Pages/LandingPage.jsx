import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is included

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/token', { email, password });
      const token = response.data.access_token;

      localStorage.setItem('token', token);
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/register');
      } else {
        console.error('An error occurred during login:', error);
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="w-full h-full bg-cover bg-center bg-[url('https://i.pinimg.com/736x/dd/10/49/dd1049bd1a16e9f20eba83b990e221c3.jpg')]"></div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md p-8 animate-fadeIn">
        {/* Welcome Text */}
        <div className="mb-8 text-center animate-slideInDown">
          <h1 className="text-4xl font-extrabold text-white">Welcome to Core</h1>
        </div>

        {/* Form Container with Gradient Background */}
        <div className="p-8 bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-600 rounded-lg shadow-lg animate-zoomIn">
          <h2 className="text-3xl font-bold text-center mb-6 text-white">Login</h2>
          <Form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
            <Form.Group controlId="formEmail">
              <Form.Label className="text-white">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="off"
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
                autoComplete="off"
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
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
