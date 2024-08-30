import React, { useState } from 'react';
import NavbarComponent from '../components/Navbar';
import Core from '../components/Core';
import CreateHashtags from '../components/CreateHashtags';
import ManageHashtags from '../components/ManageHashtags';
import Footer from '../components/Footer';

const Home = () => {
  const [cores, setCores] = useState([]);



  return (
    <>
      <NavbarComponent />
      <CreateHashtags />
      <ManageHashtags />

      <Core cores={cores} />
      <Footer />
    </>
  );
};

export default Home;
