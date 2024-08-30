import React, { useState, useEffect } from 'react';
import NavbarComponent from '../components/Navbar';
import Core from '../components/Cores';
import HashtagsSection from '../components/HashtagsSection';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({}); // Replace with actual user data
  const navigate = useNavigate();

  // Check if user is logged in based on token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      // Optionally, fetch user data
      // setUser(fetchedUserData);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/'); // Redirect to home or desired page
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({});
    localStorage.removeItem('token'); // Clear token from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <>
      <NavbarComponent isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
      <HashtagsSection />
      <Core />
      <Footer />
    </>
  );
};

export default Home;
