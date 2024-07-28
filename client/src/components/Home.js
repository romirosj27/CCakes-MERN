import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>Welcome to the Cake Shop</h1>
    <Link to="/cakes">View Cake Gallery</Link>
  </div>
);

export default Home;
