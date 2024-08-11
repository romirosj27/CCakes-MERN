// src/Products.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Checkbox, FormControlLabel, FormGroup, Pagination, Box, List, ListItem, ListItemText, Divider, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import './Products.css';
import NavBar from './NavBar';
import { styled, Drawer as MuiDrawer } from '@mui/material';

const cakeNames = [
  'Vanilla Cake', 'Chocolate Cake', 'Sponge Cake', 'Red Velvet Cake', 'Carrot Cake', 'Lemon Cake',
  'Cheesecake', 'Coffee Cake', 'Black Forest Cake', 'Marble Cake', 'Pound Cake', 'Angel Food Cake'
];

const Drawer = styled(MuiDrawer)({
  position: "fixed",
  top: '100px', // Ensure this aligns with your layout
  height: 'auto',
  "& .MuiDrawer-paper": {
    width: 240,
    position: "fixed",
    top: '100px',
    transition: "none !important",
    height: 'auto',
    marginLeft: '200px', // Add margin to move it right
  }
});

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [filterOpen, setFilterOpen] = useState(true);
  const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/cakes`);
        const cakeImages = res.data.map(cake => ({
          original: `${BASE_URL}/api/cakes/image/${cake.imageId}`,
          thumbnail: `${BASE_URL}/api/cakes/image/${cake.imageId}`,
          description: `${cake.name}`,
          imageId: cake.imageId,
          unitPrice: `${cake.unitPrice}`,
          type: cake.name
        }));
        setProducts(cakeImages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCakes();
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleTypeChange = (event) => {
    const { value, checked } = event.target;
    setSelectedTypes(prevSelectedTypes =>
      checked ? [...prevSelectedTypes, value] : prevSelectedTypes.filter(type => type !== value)
    );
  };

  const handleFilterToggle = () => {
    setFilterOpen(!filterOpen);
  };

  const filteredProducts = selectedTypes.length > 0
    ? products.filter(product => selectedTypes.includes(product.type))
    : products;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <Container>
      <NavBar />
      <Grid container spacing={3} style={{ marginTop: 120 }}>
        <Grid item xs={12} md={3}>
          <Drawer
            variant="permanent"
            anchor="left"
          >
            <List component="nav" aria-labelledby="nested-list-subheader">
              <ListItem button onClick={handleFilterToggle}>
                <ListItemText primary="Flavour / Ingredient" />
                {filterOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={filterOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <FormGroup>
                    {cakeNames.map((name) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedTypes.includes(name)}
                            onChange={handleTypeChange}
                            value={name}
                          />
                        }
                        label={`${name} (${products.filter(p => p.type === name).length})`}
                        key={name}
                      />
                    ))}
                  </FormGroup>
                </List>
              </Collapse>
              <Divider />
            </List>
          </Drawer>
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container spacing={3} style={{ marginTop: 20 }}>
            {currentProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.imageId}>
                <Card>
                  <Link to={`/products/${product.imageId}`} style={{ textDecoration: 'none' }}>
                    <CardMedia
                      component="img"
                      alt={product.description}
                      height="140"
                      image={product.original}
                    />
                    <CardContent>
                      <Typography variant="h6">{product.description}</Typography>
                      <Typography variant="body2" color="textSecondary">{`£${product.unitPrice}`}</Typography>
                      <Typography variant="body2" color="textSecondary">{`21 reviews`}</Typography>
                      <Typography variant="body2" color="textSecondary">{`4 stars`}</Typography>
                    </CardContent>
                  </Link>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box display="flex" justifyContent="center" marginTop={2}>
            <Pagination
              count={Math.ceil(filteredProducts.length / productsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Products;
