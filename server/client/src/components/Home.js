import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Carousel from '@itseasy21/react-elastic-carousel';
import { Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import NavBar from '../components/NavBar';
import CircularCard from './CircularCard';
import './Home.css';
import './fonts.css';
import mumPic from '../components/Mum pic.jpg'; 

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function Home() {
  const [images, setImages] = useState([]);
  const carouselRef = useRef(null);
  const galleryRef = useRef(null); // Create a ref for the gallery container

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

  useEffect(() => {
    const handleScroll = () => {
      if (galleryRef.current) {
        const scrollTop = window.scrollY;
        const galleryTranslateX = scrollTop / 10;
        galleryRef.current.style.transform = `translateX(${galleryTranslateX}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleanup on unmount

  const handleNextEnd = ({ index }) => {
    if (index === images.length - 1) {
      carouselRef.current.goTo(0); // Go back to the first item
    }
  };

  return (
    <div>
      <NavBar />
      <Container style={{ marginTop: '120px' }}>
        <Typography style={{fontFamily:"BirdsOfParadise"}} className="custom-font" variant="h4" gutterBottom>
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
        <Grid container spacing={4} className="grid-container">
          <Grid item xs={12} md={4} className="grid-item">
            <CircularCard title="Cakes Baked" end={900} />
          </Grid>
          <Grid item xs={12} md={4} className="grid-item">
            <CircularCard title="Happy Customers" end={250} />
          </Grid>
          <Grid item xs={12} md={4} className="grid-item">
            <CircularCard title="Years of Mastery" end={25} />
          </Grid>
        </Grid>
        <Card className="bio-section">
          <img className='bio-image' src={mumPic} alt="David" />
          <CardContent className="bio-details">
            <Typography style={{fontFamily:"BirdsOfParadise"}} className="Typography" variant="h3">
              About the founder
            </Typography>
            <br />
            <Typography variant="body1">
              Hi, I'm Chandi Johnson, the founder of Chandi Cakes. With over 10 years of experience in the baking industry, 
              I have dedicated my life to perfecting the art of cake making. My journey started at a young age, fueled by a passion 
              for creating beautiful and delicious cakes. Throughout my career, I have earned numerous professional certificates and 
              built a loyal clientele in Dubai. My commitment to quality and creativity has allowed me to craft the best cakes for any
              occasion.
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <Grid container alignItems="center">
            <Grid item xs={12} md={6}>
              <CardContent>
                <Typography style={{fontFamily:"BirdsOfParadise"}} className="custom-font" variant="h3">
                  Sweet Creations
                </Typography>
                <br />
                <Typography variant="body1">
                  Indulge in the artistry of delectable cakes that are as beautiful as they are delicious.
                </Typography>
              </CardContent>
            </Grid>
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                src="https://r.mobirisesite.com/553192/assets/images/photo-1604702433171-33756f3f3825.jpeg"
                alt="Sweet Creations"
                className="cake-images"
              />
            </Grid>
          </Grid>
        </Card>
        <Card>
          <Grid container alignItems="center" className="masterpiece-card">
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                src={require('../components/Chandi Cakes Logo.jpg')}
                alt="Masterpiece Cakes"
                className="cake-images"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CardContent>
                <Typography style={{fontFamily:"BirdsOfParadise"}} variant="h3">
                  Masterpiece Cakes
                </Typography>
                <br />
                <Typography variant="body1">
                  Discover a collection of exquisite cakes that will leave you in awe of your taste buds.
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
        <Card>
          <Grid container alignItems="center">
            <Grid item xs={12} md={6}>
              <CardContent>
                <Typography style={{fontFamily:"BirdsOfParadise"}} className="custom-font" variant="h3">
                  Divine Desserts
                </Typography>
                <br />
                <Typography variant="body1">
                  Experience heavenly treats that are a feast for the eyes and the palate.
                </Typography>
              </CardContent>
            </Grid>
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                src={require('../components/Chandi Cakes Logo.jpg')}
                alt="Divine Desserts"
                className="cake-images"
              />
            </Grid>
          </Grid>
        </Card>
        <section id="rave">
          <h1>Rave</h1>
          <div className="rave-container">
            <div className="rave-item">
              <p>A birthday celebration isn't complete without a cake from Chandi Cakes.</p>
              <img src="https://r.mobirisesite.com/553192/assets/images/photo-1541385767762-a55c33eb0c80.jpeg" alt="Samantha" />
              <span>SD</span>
            </div>
            <div className="rave-item">
              <p>Your beautiful cakes, born from hard work and dedication, showcase innovative excellence. The compliments from customers are a testament to your success. Proud of you.</p>
              <img src="https://r.mobirisesite.com/553192/assets/images/photo-1519866663826-7e1967cb3eec.jpeg" alt="Michael" />
              <span>JA</span>
            </div>
            <div className="rave-item">
              <p>Every bite is a journey to paradise. Your mum's cakes are a true delight!</p>
              <img src="https://r.mobirisesite.com/553192/assets/images/photo-1526835746352-0b9da4054862.jpeg" alt="Emily" />
              <span>Emily</span>
            </div>
            <div className="rave-item">
              <p>I'm in cake heaven! Your mum's cakes are a work of art and taste divine.</p>
              <img src="https://r.mobirisesite.com/553192/assets/images/photo-1607556114526-058f5efdf49e.jpeg" alt="David" />
              <span>David</span>
            </div>
            <div className="rave-item">
              <p>Speechless! Your mum's cakes are beyond words, simply extraordinary.</p>
              <img src="https://r.mobirisesite.com/553192/assets/images/photo-1564972379941-fde999e14945.jpeg" alt="Jessica" />
              <span>Jessica</span>
            </div>
            <div className="rave-item">
              <p>I've never tasted anything like it! Your mum's cakes are a revelation.</p>
              <img src="https://r.mobirisesite.com/553192/assets/images/photo-1489980721706-f487dab89c24.jpeg" alt="Christopher" />
              <span>Christopher</span>
            </div>
          </div>
        </section>
        <div className="cake-gallery-extravaganza">
          <h2>Cake Gallery Extravaganza</h2>
          <div className="gallery-container" ref={galleryRef}>
            <img src="https://r.mobirisesite.com/553192/assets/images/photo-1525433019229-a2449628415e.jpeg" alt="Cake 1" />
            <img src="https://r.mobirisesite.com/553192/assets/images/photo-1607206608117-31f7a8a0ee46.jpeg" alt="Cake 2" />
            <img src="https://r.mobirisesite.com/553192/assets/images/photo-1545396113-20ce94ab6433.jpeg" alt="Cake 3" />
            <img src="https://r.mobirisesite.com/553192/assets/images/photo-1604702433171-33756f3f3825.jpeg" alt="Cake 4" />
            <img src="https://r.mobirisesite.com/553192/assets/images/photo-1565098724521-089da1fa652a.jpeg" alt="Cake 5" />
            <img src="https://r.mobirisesite.com/553192/assets/images/photo-1525433019229-a2449628415e.jpeg" alt="Cake 1" />
            <img src="https://r.mobirisesite.com/553192/assets/images/photo-1607206608117-31f7a8a0ee46.jpeg" alt="Cake 2" />
            <img src="https://r.mobirisesite.com/553192/assets/images/photo-1545396113-20ce94ab6433.jpeg" alt="Cake 3" />
            <img src="https://r.mobirisesite.com/553192/assets/images/photo-1604702433171-33756f3f3825.jpeg" alt="Cake 4" />
            <img src="https://r.mobirisesite.com/553192/assets/images/photo-1565098724521-089da1fa652a.jpeg" alt="Cake 5" />
          </div>
        </div>
        <div className="moving-text">
          <marquee behavior="scroll" direction="left">
          Taste Sensation * Flavor Explosion * Delightful Decadence * Sugary Bliss * Yummy Delights * Sweet Symphony * 

          </marquee>
        </div>
      </Container>
    </div>
  );
}

export default Home;
