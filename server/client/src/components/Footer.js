import React from 'react';
import { Container, Typography, Grid, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation

function Footer() {
  return (
    <div style={{color: '#fff', padding: '20px 0' }}>
      <Container>
        <Grid container justifyContent="center" spacing={4}>
          <Grid item>
            <MuiLink component={Link} to="/" style={{ color: '#000', textDecoration: 'none', fontSize: '18px' }}>
              Home
            </MuiLink>
          </Grid>
          <Grid item>
            <MuiLink component={Link} to="/gallery" style={{ color: '#000', textDecoration: 'none', fontSize: '18px' }}>
              Gallery
            </MuiLink>
          </Grid>
          {/* <Grid item>
            <MuiLink component={Link} to="/certifications" style={{ color: '#000', textDecoration: 'none', fontSize: '18px' }}>
              Shop
            </MuiLink>
          </Grid> */}
        </Grid>
        <Typography variant="body2" align="center" style={{ marginTop: '20px',  color: '#000' }}>
          © 2024 Chandi Cakes. All rights reserved.
        </Typography>
      </Container>
    </div>
  );
}

export default Footer;
