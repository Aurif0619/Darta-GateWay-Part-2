import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Rating, Grid, Toolbar, Typography, CircularProgress, Autocomplete, TextField, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import CartList from '../cart-list/CartList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/slices/cart/cartSlice';

const ProductCarts = () => {
    const [openCartList, setOpenCartList] = useState(false);

    const toggleCartList = (newOpen) => () => {
        setOpenCartList(newOpen);
    };

    const { counter } = useSelector((state) => state.counter);

    const [updateProductsArr, setUpdateProductsArr] = useState([]);
    const [Products, setProducts] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const [categoryArr, setCategoryArr] = useState([]);

    const dispatch = useDispatch();

    const filterProducts = (categoryProducts) => {
        if (!categoryProducts) {
            setUpdateProductsArr(Products);
            return;
        }

        const filteredProducts = Products.filter(
            (item) => item.category === categoryProducts.value
        );
        setUpdateProductsArr(filteredProducts);
    };

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then((data) => {
                const categoryArr = data?.data?.map((item) => ({
                    label: item.category,
                    value: item.category,
                }));

                const uniqueData = categoryArr.filter(
                    (item, index, self) => index === self.findIndex((t) => t.value === item.value)
                );
                setCategoryArr(uniqueData);
                setProducts(data.data);
                setUpdateProductsArr(data.data);
                setLoadingData(false);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setLoadingData(false);
            });
    }, []);

    return (
        <>
            <Box>
                <Toolbar />
                <Autocomplete
                    className="my-2"
                    disablePortal
                    options={categoryArr}
                    sx={{ width: '300px' }}
                    onChange={(e, newValue) => {
                        filterProducts(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="Categories" />}
                />
                <Grid container spacing={4} justifyContent="center">
                    {loadingData ? (
                        <Box className="d-flex justify-content-center align-items-center mt-5">
                            <CircularProgress size={40} />
                        </Box>
                    ) : (
                        updateProductsArr.length > 0 ? (
                            updateProductsArr.map((product) => (
                                <Grid item xs={12} sm={6} md={3} key={product.id}>
                                    <Card>
                                        <Swiper
                                            spaceBetween={30}
                                            centeredSlides={true}
                                            autoplay={{
                                                delay: 2000,
                                                disableOnInteraction: false,
                                            }}
                                            pagination={{
                                                clickable: true,
                                            }}
                                            navigation={false}
                                            modules={[Autoplay, Pagination, Navigation]}
                                            className="mySwiper"
                                        >
                                            <SwiperSlide className="text-center pt-3">
                                                <img width={"200px"} height={"300px"}
                                                    src={product.image}
                                                    alt="Product Image"
                                                />
                                            </SwiperSlide>
                                            <SwiperSlide className="text-center pt-3">
                                                <img width={"200px"} height={"300px"}
                                                    src={product.image}
                                                    alt="Product Image"
                                                />
                                            </SwiperSlide>
                                        </Swiper>
                                        <CardContent>
                                            <Typography variant="body2" color="textSecondary">
                                                {product?.category}
                                            </Typography>
                                            <Typography variant="h6">{product?.title?.length > 20 ? `${product?.title?.slice(0, 20)}..` : product?.title}</Typography>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    gap: 1,
                                                }}>
                                                <Box className="mt-2">
                                                    <Rating name="readOnly" value={product.rating?.rate || 0} readOnly />
                                                </Box>
                                            </Box>
                                            <Box className="d-flex justify-content-between align-items-center mt-3">
                                                <Box>
                                                    <Typography variant="body1" color="textPrimary">
                                                        ${product.price}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ padding: 1, display: 'flex', justifyContent: 'center' }}>
                                                    <Tooltip title="View Detail" placement="top-start">
                                                        <Link to={`/product-detail/${product.id}`}>
                                                            <Button>
                                                                <VisibilityIcon />
                                                            </Button>
                                                        </Link>
                                                    </Tooltip>
                                                    <Button
                                                        variant="contained"
                                                        color="success"
                                                        size="small"
                                                        startIcon={<AddIcon />}
                                                        onClick={() => {
                                                            dispatch(addToCart(product));
                                                        }}
                                                    >
                                                        Add
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))) : (
                            <Typography variant="h6">No Products Found</Typography>
                        )
                    )}
                </Grid>
                <CartList openCartList={openCartList} toggleCartList={toggleCartList} />
            </Box>
        </>
    );
};

export default ProductCarts;
