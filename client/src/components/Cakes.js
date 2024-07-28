import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const Cakes = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/cakes');
        const cakeImages = res.data.map(cake => ({
          original: `http://localhost:5000/api/cakes/image/${cake.imageId}`,
          thumbnail: `http://localhost:5000/api/cakes/image/${cake.imageId}`,
          description: `${cake.name} £${cake.unitPrice}`
        }));
        setImages(cakeImages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCakes();
  }, []);

  return (
    <div>
      <h1>Cakes</h1>
      {images.length > 0 && <ImageGallery items={images} showThumbnails={true} />}
    </div>
  );
};

export default Cakes;
