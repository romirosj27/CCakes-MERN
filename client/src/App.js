import { createTheme, colors, ThemeProvider } from "@mui/material";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Cakes from './components/Cakes';
import CakeAdmin from './components/CakeAdmin';
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import PrivateRoute from "./PrivateRoute";

const theme = createTheme({
  typography: {
    fontFamily: 'Noto Sans JP',
  },
  typography: {
    h1: { fontSize: '5rem' },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 425,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
      '3xl': 1920,
      '4xl': 2560,
      '5xl': 3200,
    },
  },
  palette: {
    primary: {
      light: "#d65a58", // light pastel pink
      main: "#d65a58", // standard pink
      dark: "#d65a58", // darker pink (not too dark)
      contrastText: "#fff",
    },
    secondary: {
      light: "#d65a58", // light blue 
      main: "#d65a58", // standard blue 
      dark: "#d65a58", // darker blue (not too dark)
      contrastText: "#fff",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="body">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cakes" element={<Cakes />} />
          <Route path="/cakes/:imageId" element={<Cakes />} />
          {/* <Route path="/cakesAdmin" element={ <PrivateRoute> <CakeAdmin /> </PrivateRoute>} /> */}
          <Route path="/cakesAdmin" element={<CakeAdmin />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;

