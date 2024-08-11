import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Carousel from '@itseasy21/react-elastic-carousel';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Avatar } from '@mui/material';
import NavBar from '../components/NavBar';
import CircularCard from './CircularCard';
import Birthday from './birthday test 1/Birthday';
import './Home.css';
import './fonts.css';
import mumPic from '../components/Mum pic.jpg'; 
import { IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import { FaTiktok } from 'react-icons/fa';
import Footer from './Footer';

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const chronicles = [
  {
    date: 'July 7, 2024',
    title: 'Trendy Fondant Delights',
    description: 'Discover the latest fondant cake trends that will leave you craving for more.',
    image: `${BASE_URL}/api/cakes/image/66b8aa6904d4a618be7d25e8`,
  },
  {
    date: 'July 5, 2024',
    title: 'Secrets of Buttercream',
    description: 'Discover the latest fondant cake trends that will leave you craving for more.',
    image: `${BASE_URL}/api/cakes/image/66b79c0d5f9ba49ae4ad37d3`,
  },
  {
    date: 'May 19, 2012',
    title: 'Whisking Wonders',
    description: 'Unveiling the magic behind the perfect cake batter consistency.',
    image: `${BASE_URL}/api/cakes/image/66b79bf15f9ba49ae4ad37cd`,
  },
  {
    date: 'September 11, 2012',
    title: 'Sprinkle Spectacular',
    description: 'Dive into the world of colorful and delightful cake sprinkles.',
    image: `${BASE_URL}/api/cakes/image/66b79ab3d0a53e1e2536ec14`,
  },
  {
    date: 'December 12, 2012',
    title: 'Facebook Business Page',
    description: 'Chandi Cakes business page created.',
    image: `${BASE_URL}/api/cakes/image/66b79a29c8b7d8854ed61c5d`,
  },
  {
    date: 'November 23, 2012',
    title: 'First Post',
    description: 'Chandi Cakes first ever post on facebook',
    image: `${BASE_URL}/api/cakes/image/66b798fba0880cc1b4f8619b`,
  },
];

function Home() {
  const [images, setImages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false); // State to track when images are loaded
  const [showBirthday, setShowBirthday] = useState(false); // State to control the visibility of the Birthday component
  const carouselRef = useRef(null);
  const galleryRef = useRef(null); // Create a ref for the gallery container
  const celebButtonRef = useRef(null);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/cakes`);
        const cakeImages = res.data.map(cake => ({
          original: `${BASE_URL}/api/cakes/image/${cake.imageId}`,
          thumbnail: `${BASE_URL}/api/cakes/image/${cake.imageId}`,
          description: `${cake.name} £${cake.unitPrice}`,
          imageId: cake.imageId,
        })).slice(0, 10);
        setImages(cakeImages);
        setImagesLoaded(true); // Set images loaded state to true once images are fetched
      } catch (error) {
        console.error(error);
      }
    };
    fetchCakes(); // Fetch images when the component mounts
  }, []);

  useEffect(() => {
    // Check localStorage to see if the birthday celebration has already been shown
    const isBirthdayShown = localStorage.getItem('birthdayShown');
    if (!isBirthdayShown) {
      setShowBirthday(true);
    }
  }, []);

  const disableButton = () => {
    setShowBirthday(false);
    localStorage.setItem('birthdayShown', 'true'); // Save to localStorage
    if (celebButtonRef.current) {
      celebButtonRef.current.disabled = true;
    }
  };

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
        <Button 
          variant="contained" 
          color="primary" 
          className="birthday-celebration"
          onClick={disableButton} // Toggle the visibility
          style={{ marginBottom: '20px' }}
          ref={celebButtonRef}
        >
          {showBirthday ? 'Close Birthday Celebration' : 'Show Birthday Celebration'}
        </Button>

        {showBirthday ? (
          <Birthday />
        ) : (
          <>
            <Typography style={{fontFamily:"BirdsOfParadise"}} className="custom-font" variant="h4" gutterBottom>
              Handcrafted Delights, Timeless Memories
            </Typography>
            {imagesLoaded ? (
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
              <Typography variant="body1">Loading images...</Typography>
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
                <Grid >
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
                <Grid marginLeft={7}>
                  <CardMedia
                    component="img"
                    src={`${BASE_URL}/api/cakes/image/66b751f18b55e6d102ccee05`}
                    alt="Sweet Creations"
                    className="cake-images"
                  />
                </Grid>
              </Grid>
            </Card>
            <Card>
            <Grid container alignItems="center" style={{flexDirection:"row-reverse"}}>
              <Grid>
                <CardContent >
                  <Typography style={{fontFamily:"BirdsOfParadise", textAlign: "right"}} variant="h3">
                    Masterpiece Cakes
                  </Typography>
                  <br />
                  <Typography variant="body1">
                    Discover a collection of exquisite cakes that will leave you in awe of your taste buds
                  </Typography>
                </CardContent>
              </Grid>
              <Grid marginRight={7}>
                <CardMedia
                  component="img"
                  src={`${BASE_URL}/api/cakes/image/66b75cff90daec21cf608a31`}
                  alt="Masterpiece Cakes"
                  className="cake-images"
                  // style={{marginRight:10}}
                />
              </Grid>
            </Grid>
          </Card>
            <Card>
              <Grid container alignItems="center">
                <Grid >
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
                <Grid maxWidth={360} marginLeft={8}>
                  <CardMedia
                    component="img"
                    src={`${BASE_URL}/api/cakes/image/66b8a36f04d4a618be7d25aa`}
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
                  <Avatar  sx={{ bgcolor: "#FF6F61", fontSize:"50px", width:"80px", height:"80px"}}>
                      SD
                  </Avatar>
                  <span>Shashie Dissanayake</span>
                </div>
                <div className="rave-item">
                  <p>Your beautiful cakes, born from hard work and dedication, showcase innovative excellence. The compliments from customers are a testament to your success. Proud of you.</p>
                  <Avatar  sx={{ bgcolor: "#B5CDA3", fontSize:"50px", width:"80px", height:"80px"}}>
                      JA
                  </Avatar>
                  <span>Johnson Absalom</span>
                </div>
                <div className="rave-item">
                  <p>Looks really yummy and very Beautiful Akki</p>
                  <Avatar  sx={{ bgcolor: "#C4C3D0", fontSize:"50px", width:"80px", height:"80px"}}>
                      IL
                  </Avatar>
                  <span>Indika Lakmana</span>
                </div>
                <div className="rave-item">
                  <p>Wow excellent work of artary cake designs..Chandi 👏👏❤️❤️❤️😘may god bless you always 💖💖💖</p>
                  <Avatar  sx={{ bgcolor: "#7F9C99", fontSize:"50px", width:"80px", height:"80px"}}>
                      GD
                  </Avatar>
                  <span>Geraldine Dawson</span>
                </div>
                <div className="rave-item">
                  <p>Soooooo beautiful and lovely creations. Inspiring. Keep it up Chandi. God bless you abundantly.</p>
                  <Avatar  sx={{ bgcolor: "#D2B48C", fontSize:"40px", width:"80px", height:"80px"}}>
                      MM
                  </Avatar>
                  <span>Mathhews Mallika</span>
                </div>
                <div className="rave-item">
                  <p>Lovely Chandi Johnson keep up your lovely work so proud of you. Well done again</p>
                  <Avatar  sx={{ bgcolor: "primary.dark", fontSize:"50px", width:"80px", height:"80px"}}>
                      GP
                  </Avatar>
                  <span>Gayani Perera</span>
                </div>
              </div>
            </section>
            <div className="cake-gallery-extravaganza">
              <h2>Cake Gallery Extravaganza</h2>
              <div className="gallery-container" ref={galleryRef}>
                <img src="https://r.mobirisesite.com/553192/assets/images/photo-1525433019229-a2449628415e.jpeg" alt="Cake 1" />
                <img src="https://r.mobirisesite.com/553192/assets/images/photo-1607206608117-31f7a8a0ee46.jpeg" alt="Cake 2" />
                <img src="https://r.mobirisesite.com/553192/assets/images/photo-1545396113-20ce94ab6433.jpeg" alt="Cake 3" />
                <img src={`${BASE_URL}/api/cakes/image/66b745383ae673d3a67e7c09`} alt="Cake 1" />
                <img src={`${BASE_URL}/api/cakes/image/66b741e8570ee571f0d285d5`} alt="Cake 2" />
                <img src={`${BASE_URL}/api/cakes/image/66a60efa7c880439879e89c2`} alt="Cake 3" />
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
            <div className="cake-chronicles">
              <Typography variant="h2" align="center">Cake Chronicles</Typography>
              <Grid container spacing={2}>
                {chronicles.map((chronicle, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card className="chronicle-card">
                      <CardMedia
                        component="img"
                        src={chronicle.image}
                        alt={chronicle.title}
                        className="chronicle-image"
                        height="200"
                      />
                      <CardContent>
                        <Typography variant="body2" color="textSecondary">
                          {chronicle.date}
                        </Typography>
                        <Typography variant="h5">{chronicle.title}</Typography>
                        <Typography variant="body1">{chronicle.description}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
            <section className="baking-brilliance-section" style={{ padding: '40px 0', textAlign: 'center', backgroundColor: '#FAF3F3' }}>
              <Typography variant="h3" style={{ fontFamily: 'BirdsOfParadise', marginBottom: '20px' }}>
                Baking Brilliance Unleashed
              </Typography>
              <Typography variant="body1" style={{ marginBottom: '40px' }}>
                Explore the accolades that make her cakes the talk of the town!
              </Typography>
              <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} sm={6} md={4}>
                  <Card elevation={3} style={{ borderRadius: '20px' }}>
                    <CardContent>
                      <Avatar
                        src='https://cdn.prod.website-files.com/5fe81966f6f5aa31b7c17439/6540c0fd3786e1481b3d4219_ICCA_LOGO_BIG.png'
                        sx={{ width: 80, height: 80, margin: '0 auto 20px' }}
                      />
                      <Typography variant="h5" style={{ fontWeight: 'bold' }}>Diploma in Royal lcing & piping</Typography>
                      <Typography variant="body2">International Centre for Culinary Arts, Dubai</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card elevation={3} style={{ borderRadius: '20px' }}>
                    <CardContent>
                      <Avatar
                        src='https://cdn.prod.website-files.com/5fe81966f6f5aa31b7c17439/6540c0fd3786e1481b3d4219_ICCA_LOGO_BIG.png'
                        sx={{ width: 80, height: 80, margin: '0 auto 20px' }}
                      />
                      <Typography variant="h5" style={{ fontWeight: 'bold' }}>Diploma in Sugar Flowers</Typography>
                      <Typography variant="body2">International Centre for Culinary Arts, Dubai</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card elevation={3} style={{ borderRadius: '20px' }}>
                    <CardContent>
                      <Avatar
                        src='https://cdn.prod.website-files.com/5fe81966f6f5aa31b7c17439/6540c0fd3786e1481b3d4219_ICCA_LOGO_BIG.png'
                        sx={{ width: 80, height: 80, margin: '0 auto 20px' }}
                      />
                      <Typography variant="h5" style={{ fontWeight: 'bold' }}>Master Certificate for Sugarcraft</Typography>
                      <Typography variant="body2">International Centre for Culinary Arts, Dubai</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card elevation={3} style={{ borderRadius: '20px' }}>
                    <CardContent>
                      <Avatar
                        src='https://cdn.prod.website-files.com/5fe81966f6f5aa31b7c17439/6540c0fd3786e1481b3d4219_ICCA_LOGO_BIG.png'
                        sx={{ width: 80, height: 80, margin: '0 auto 20px' }}
                      />
                      <Typography variant="h5" style={{ fontWeight: 'bold' }}>Masterclasses in French Patisserie & Entremet</Typography>
                      <Typography variant="body2">International Centre for Culinary Arts, Dubai</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card elevation={3} style={{ borderRadius: '20px' }}>
                    <CardContent>
                      <Avatar
                        src='https://i.pngimg.me/thumb/f/720/comdlpng6968793.jpg'
                        sx={{ width: 80, height: 80, margin: '0 auto 20px' }}
                      />
                      <Typography variant="h5" style={{ fontWeight: 'bold' }}>Course 1 - Decorating Basics</Typography>
                      <Typography variant="body2">Wilton</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card elevation={3} style={{ borderRadius: '20px' }}>
                    <CardContent>
                      <Avatar
                        src='https://i.pngimg.me/thumb/f/720/comdlpng6968793.jpg'
                        sx={{ width: 80, height: 80, margin: '0 auto 20px' }}
                      />
                      <Typography variant="h5" style={{ fontWeight: 'bold' }}>Flowers and Cake Design Course</Typography>
                      <Typography variant="body2">Wilton</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card elevation={3} style={{ borderRadius: '20px' }}>
                    <CardContent>
                      <Avatar
                        src='https://i.pngimg.me/thumb/f/720/comdlpng6968793.jpg'
                        sx={{ width: 80, height: 80, margin: '0 auto 20px' }}
                      />
                      <Typography variant="h5" style={{ fontWeight: 'bold' }}>Gum Paste and Fondant Course</Typography>
                      <Typography variant="body2">Wilton</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </section>
            <Container style={{ textAlign: 'center', padding: '40px 0' }}>
              <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '20px' }}>
                Follow Us For More!
              </Typography>
              <Grid container justifyContent="center" spacing={2}>
                <Grid item>
                  <IconButton href="https://www.facebook.com" target="_blank" aria-label="Facebook">
                    <Facebook sx={{ fontSize: 40, color: '#4267B2' }} />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton href="https://www.twitter.com" target="_blank" aria-label="Twitter">
                    <Twitter sx={{ fontSize: 40, color: '#1DA1F2' }} />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton href="https://www.instagram.com" target="_blank" aria-label="Instagram">
                    <Instagram sx={{ fontSize: 40, color: '#E1306C' }} />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton href="https://www.tiktok.com" target="_blank" aria-label="TikTok">
                    <FaTiktok style={{ fontSize: 40, color: '#000000' }} />
                  </IconButton>
                </Grid>
              </Grid>
            </Container>
            <Footer />
          </>
        )}
      </Container>
    </div>
  );
}

export default Home;
