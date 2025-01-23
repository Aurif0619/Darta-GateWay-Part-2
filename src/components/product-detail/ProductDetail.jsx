import { Box, Button, Rating, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import SkeletonProductDetail from './SkeletonProductDetail';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cart/cartSlice';

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [loadingData, setLoadingData] = useState(true);
  const { product_id } = useParams();

  const dispatch = useDispatch();
  const { cartItem } = useSelector((state) => state.cart);

  const isExist = cartItem?.some((item) => item.id == product_id);
  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${product_id}`)
      .then((data) => {
        setProduct(data.data);
        setLoadingData(false);
      })
      .catch(() => {
        setLoadingData(false);
      });
  }, [product_id]);

  return (
    <>
      {loadingData ? (
        <SkeletonProductDetail />
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
            p: 3,
            marginTop: '2%',
            borderRadius: 2,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            bgcolor: '#f9f9f9',
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderRadius: 2,
              p: 2,
              boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                maxWidth: '100%',
                maxHeight: '400px',
                borderRadius: '8px',
                objectFit: 'contain',
              }}
            />
          </Box>
          <Box sx={{ flex: 2 }}>
            <Typography variant="h5">{product.title}</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              {product.category}
            </Typography>
            <Rating value={product.rating?.rate || 0} readOnly sx={{ mt: 1 }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              ${product.price}
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              {product.description}
            </Typography>

            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => {
                  if (!isExist) {
                    dispatch(addToCart(product));
                  }
                }}
                disabled={isExist} >
                {isExist ? 'Already in Cart' : 'Add to Cart'}
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ProductDetail;
