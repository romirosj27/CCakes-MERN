import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Cakes from './components/Cakes';
import CakeAdmin from './components/CakeAdmin';


const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cakes" element={<Cakes />} />
      <Route path="/cakesAdmin" element={<CakeAdmin />} />
    </Routes>
  </Router>
);

export default AppRouter;
