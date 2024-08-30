import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (username === '' || email === '' || password === '' || confirmPassword === '') {
      setError('Please fill in all fields.');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match.');
    } else {
      try {
        const response = await axios.post('http://localhost:5000/register', {
          username,
          email,
          password,
        });

        const token = response.data.access_token;
        localStorage.setItem('token', token);

        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError('');

        // Redirect to the login page
        navigate('/login');
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message || 'An error occurred during registration.');
        } else {
          setError('An error occurred during registration.');
        }
      }
    }
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden">
      {/* Background Images with Fade-in Animation */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-cover bg-center animate-slideshow"></div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 animate-fadeIn animate-duration-1000 animate-delay-200"></div>
      </div>

      {/* Left Side Text with Slide-in Animation */}
      <div className="relative flex flex-1 items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center pl-16 pr-10 animate-slideInLeft animate-duration-1000 animate-delay-300">
          <h1 className="text-white text-8xl font-bold">
            Sign up to get your ideas
          </h1>
        </div>
      </div>

      {/* Registration Form with Slide-in Animation */}
      <div className="relative z-10 flex items-center justify-center flex-1 animate-slideInRight animate-duration-1000 animate-delay-400">
        <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-10 rounded-2xl shadow-2xl w-full max-w-lg">
          <h2 className="text-3xl font-extrabold text-center mb-8 text-white">Create Your Account</h2>
          {error && <div className="mb-4 text-red-300 text-center">{error}</div>}
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="relative">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded-full shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out"
            >
              Register
            </button>
          </form>
          <p className="mt-8 text-center text-white">
            Already have an account? <a href="/login" className="text-indigo-300 hover:underline">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
