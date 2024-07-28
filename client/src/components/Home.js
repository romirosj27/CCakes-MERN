import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Carousel from '@itseasy21/react-elastic-carousel';
import { Box, Container, Typography, AppBar, Toolbar, Grid, Card, CardContent, CardMedia } from '@mui/material';
import NavBar from '../components/NavBar';
import CircularCard from './CircularCard';
import './Home.css';
import mumPic from '../components/Mum pic.jpg'; // Adjust the relative path as needed
import './fonts.css';

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function Home() {
  const [images, setImages] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/cakes');
        const cakeImages = res.data.map(cake => ({
          original: `http://localhost:5000/api/cakes/image/${cake.imageId}`,
          thumbnail: `http://localhost:5000/api/cakes/image/${cake.imageId}`,
          description: `${cake.name} £${cake.unitPrice}`,
          imageId: cake.imageId,
        })).slice(0, 10);
        setImages(cakeImages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCakes();
  }, []);

  const handleNextEnd = ({ index }) => {
    if (index === images.length - 1) {
      carouselRef.current.goTo(0); // Go back to the first item
    }
  };

  return (
    <div>
      <NavBar />
      {/* <AppBar position="static">
        <Toolbar className="header">
          <img src="./Chandi Cakes Logo.jpg" alt="Chandi Cakes Logo" className="logo" /> {/* Replace with actual path to your logo */}
          {/* <Typography variant="h6">
            Chandi Cakes
          </Typography>
        </Toolbar>
      // </AppBar> */} */}
      <br/>
      <Container style={{ marginTop: 150}}>
        <Typography className="custom-font" variant="h4" gutterBottom style={{ marginTop: 20, fontFamily:"BirdsOfParadise" }}>
          Handcrafted Delights, Timeless Memories
        </Typography>
        {images.length > 0 ? (
          <div className="carousel-wrapper">
            <Carousel breakPoints={breakPoints} ref={carouselRef} enableAutoPlay autoPlaySpeed={3000} onNextEnd={handleNextEnd}>
              {images.map((image, index) => (
                <div key={index}>
                  <Link to={`/cakes/${image.imageId}`}>
                    <div className="image-container">
                      <img src={image.original} alt={image.description} className="styled-image" />
                    </div>
                  </Link>
                  <Typography variant="body1" align="center">{image.description}</Typography>
                </div>
              ))}
            </Carousel>
          </div>
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
        <Grid container spacing={3} style={{ marginTop: 20, marginBottom: 25, marginLeft:19 }}>
          <Grid item xs={12} md={4}>
            <CircularCard title="Customers" end={941} />
          </Grid>
          <Grid item xs={12} md={4}>
            <CircularCard title="Reviews" end={234} />
          </Grid>
          <Grid item xs={12} md={4}>
            <CircularCard title="Cake Photos" end={742} />
          </Grid>
        </Grid>
        <Card className="bio-section">
          <CardMedia
            component="img"
            image={mumPic}
            alt="Bio Picture"
            className="bio-image"
          />
          <CardContent className="bio-details">
            <Typography className="custom-font" variant="h3" component="div" style={{fontFamily:"BirdsOfParadise"}}>
              About the founder
            </Typography>
            <br />
            <Typography variant="body1" component="div">
            Hi, I'm Chandi Johnson, the founder of Chandi Cakes. With over 10 years of experience in the baking industry, 
            I have dedicated my life to perfecting the art of cake making. My journey started at a young age, fueled by a passion 
            for creating beautiful and delicious cakes. Throughout my career, I have earned numerous professional certificates and 
            built a loyal clientele in Dubai. My commitment to quality and creativity has allowed me to craft the best cakes for any
            occasion. Thank you for visiting my website, and I hope you enjoy my creations as much as I enjoy making them!
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default Home;
