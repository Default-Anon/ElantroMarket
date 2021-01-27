import React, { useState, useEffect } from 'react';
import { makeStyles, theme } from '@material-ui/core/styles';
import { Box, Container, Typography, TextareaAutosize, InputLabel, IconButton } from '@material-ui/core';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import agent from '../../api/agent';
import { Button } from '@material-ui/core';
import { Favorite, FormatListNumberedRtlOutlined, Label, Payment, Send, ShoppingCart } from '@material-ui/icons';
import guid from 'guid'
import Reviews from './../../../features/components/Reviews';
import ImagesCarousel from './../../../features/components/ImagesCarousel';
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '65px',
        marginLeft: '60px',
        border: '2px solid #25a9b0',
        backgroundColor: 'gray',
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.only("xs")]: {
            fontSize: '23px'
        },
        [theme.breakpoints.up("sm")]: {
            fontSize: '30px'
        },
        paddingTop: '10px'
    },
    imagesDiv: {
        [theme.breakpoints.only("xs")]: {
            height: '300px'
        },
        [theme.breakpoints.up("sm")]: {
            fontSize: '30px'
        },
        maxWidth: '700px',
        justifyContent: 'center',
        display: 'flex',
        paddingTop: '10px'
    },
    Img: {
        [theme.breakpoints.only('xs')]: {
            height: '300px'
        },
        [theme.breakpoints.up('sm')]: {
            height: '500px'
        }
    },
    Description: {
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.only("xs")]: {
            fontSize: '12px'
        },
        [theme.breakpoints.up("sm")]: {
            fontSize: '18px'
        },
        [theme.breakpoints.only("lg")]: {
            maxWidth: '34vw',
        },
        color: 'black',
        border: '2px solid #042354',
        borderRadius: '10px',
        padding: '10px',
        textAlign: 'center'
    }
}));
let hubConnection = null;

const ProductPage = (props) => {
    const classes = useStyles();
    const [id, setId] = useState(window.location.href);
    const [product, setProduct] = useState({});
    const [apistatus, setApiStatus] = useState(false);
    useEffect(() => {
        let idBackup = id.split('/')[5];
        agent.Products.details(idBackup)
            .then(response => { setProduct(response); })
            .then(setApiStatus(true));
    }, [id])
    return (
        <div className={classes.root}>
            <Container>
                <Box>
                    <Typography className={classes.title} variant="inherit" >
                        {product.title}
                    </Typography>
                    {typeof (product.images) == 'undefined' ? <></> :
                        <ImagesCarousel images={product.images} />
                    }
                </Box>
                <Box display="flex" justifyContent="space-between" flexWrap="wrap" paddingTop="10px">
                    <Box>
                        <Typography variant="h2" color="primary" className={classes.title}>
                            Цена: {product.price + ' рублей'}
                        </Typography>
                    </Box>
                    <Box display="flex">
                        <Button startIcon={<Payment />} variant="contained" color="primary">
                            Купить
                            </Button>
                        <Button startIcon={<Favorite />} variant="contained" color="primary">
                            В избранное
                            </Button>
                        <Button startIcon={<ShoppingCart />} variant="contained" color="primary">
                            В корзину
                            </Button>
                    </Box>
                </Box>
                <Box display="flex" flexDirection="row" justifyContent="space-between" flexWrap="wrap">
                    <Box display="flex" flexDirection="column" alignContent="center" marginLeft="10px">
                        <Typography variant="h2" color="primary" className={classes.title}>
                            О Товаре
                        </Typography>
                        <Typography className={classes.Description} color="inherit">
                            {product.description}
                        </Typography>
                    </Box>
                    <Reviews />
                </Box>
            </Container>
        </div >
    );
}

export default ProductPage;
