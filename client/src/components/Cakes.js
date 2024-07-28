import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Box, Container, Typography, AppBar, Toolbar, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import NavBar from '../components/NavBar'; // Adjust the path according to your project structure

const Header = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
}));


const Logo = styled('img')({
  // height: 100, // Adjust the size of the logo as needed
  // marginRight: 20,
});

const Cakes = () => {
  const { imageId } = useParams();
  const [images, setImages] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/cakes');
        const cakeImages = res.data.map(cake => ({
          original: `http://localhost:5000/api/cakes/image/${cake.imageId}`,
          thumbnail: `http://localhost:5000/api/cakes/image/${cake.imageId}`,
          description: `${cake.name} £${cake.unitPrice}`,
          imageId: cake.imageId,
        }));
        setImages(cakeImages);

        const index = cakeImages.findIndex(image => image.imageId === imageId);
        setStartIndex(index >= 0 ? index : 0);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCakes();
  }, [imageId]);

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Logo src="./Chandi Cakes Logo.jpg" alt="Chandi Cakes Logo" style={{}}/> {/* Replace with actual path to your logo */}
          <Typography variant="h6">
            Chandi Cakes
          </Typography>
        </Toolbar>
      </AppBar>
      <NavBar />
      <Typography variant="h4" gutterBottom style={{ marginTop: 20 }}>
        Cakes
      </Typography>
      {images.length > 0 ? (
        <ImageGallery items={images} showThumbnails={true} startIndex={startIndex} />
      ) : (
        <CircularProgress />
      )}
    </Container>
  );
};

export default Cakes;
