import React, { useRef, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './CGEStyle.css';

function CakeGalleryExtravaganza() {
  const galleryRef = useRef(null);

  const images = [
    {
      original: 'https://r.mobirisesite.com/553192/assets/images/photo-1525433019229-a2449628415e.jpeg',
      thumbnail: 'https://r.mobirisesite.com/553192/assets/images/photo-1525433019229-a2449628415e.jpeg',
      description: 'Cake 1',
    },
    {
      original: 'https://r.mobirisesite.com/553192/assets/images/photo-1607206608117-31f7a8a0ee46.jpeg',
      thumbnail: 'https://r.mobirisesite.com/553192/assets/images/photo-1607206608117-31f7a8a0ee46.jpeg',
      description: 'Cake 2',
    },
    {
      original: 'https://r.mobirisesite.com/553192/assets/images/photo-1545396113-20ce94ab6433.jpeg',
      thumbnail: 'https://r.mobirisesite.com/553192/assets/images/photo-1545396113-20ce94ab6433.jpeg',
      description: 'Cake 3',
    },
    {
      original: 'https://r.mobirisesite.com/553192/assets/images/photo-1604702433171-33756f3f3825.jpeg',
      thumbnail: 'https://r.mobirisesite.com/553192/assets/images/photo-1604702433171-33756f3f3825.jpeg',
      description: 'Cake 4',
    },
    {
      original: 'https://r.mobirisesite.com/553192/assets/images/photo-1565098724521-089da1fa652a.jpeg',
      thumbnail: 'https://r.mobirisesite.com/553192/assets/images/photo-1565098724521-089da1fa652a.jpeg',
      description: 'Cake 5',
    },
  ];

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
  }, []);

  return (
    <div className="cake-gallery-extravaganza">
      <h2>Cake Gallery Extravaganza</h2>
      <div className="gallery-container" ref={galleryRef}>
        <ImageGallery
          items={images}
          showThumbnails={false}
          showFullscreenButton={false}
          showPlayButton={false}
          autoPlay={false}
          disableSwipe={true}
        />
      </div>
    </div>
  );
}

export default CakeGalleryExtravaganza;
