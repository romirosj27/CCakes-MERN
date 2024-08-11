import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, CircularProgress, Box } from '@mui/material';
import NavBar from './NavBar'; // Adjust the path according to your project structure
import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/cakes/${id}`);
        const productData = res.data;

        setProduct(productData);

        const cakeImages = [{
          original: `${BASE_URL}/api/cakes/image/${id}`,
          thumbnail: `${BASE_URL}/api/cakes/image/${id}`,
        }];

        setImages(cakeImages);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    // Add the product to cart (implementation depends on how you manage the cart)
    console.log('Product added to cart:', product);
  };

  return (
    <Container style={{ marginTop: 110 }}>
      <NavBar />
      {loading ? (
        <CircularProgress />
      ) : (
        <Box>
          <section className="container mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:gap-10 lg:py-10">
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ flex: '1' }}>
                <img
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                  }}
                  src={`${BASE_URL}/api/cakes/image/${id}`}
                  alt={`Product ${product.name}`}
                />
              </div>
              <div style={{ flex: '1', paddingLeft: '20px' }}>
                <Typography variant="h4" gutterBottom>
                  {product.name}
                </Typography>
                <div className="mt-1">
                  <div className="flex items-center">
                    <Rater
                      style={{ fontSize: "20px" }}
                      total={5}
                      interactive={false}
                      rating={product.rating || 4} // Adjust the rating as per your data
                    />
                    <p className="ml-3 text-sm text-gray-400">
                      ({product.reviews || 150})
                    </p>
                  </div>
                </div>
                <p className="mt-5 font-bold">
                  Availability:{" "}
                  {product.availability ? (
                    <span className="text-green-600">In Stock</span>
                  ) : (
                    <span className="text-red-600">Expired</span>
                  )}
                </p>
                <Typography variant="h6" color="textSecondary">{`£${product.unitPrice}`}</Typography>
                <Typography variant="body1" className="my-4">{product.description}</Typography>
                <div className="mt-7 flex flex-row items-center gap-6">
                  <button
                    className="flex h-12 w-1/3 items-center justify-center bg-violet-900 text-white duration-100 hover:bg-blue-800"
                    onClick={handleAddToCart}
                  >
                    <BiShoppingBag className="mx-2" />
                    Add to cart
                  </button>
                  
                </div>
              </div>
            </div>
          </section>
        </Box>
      )}
    </Container>
  );
};

export default ProductDetail;
