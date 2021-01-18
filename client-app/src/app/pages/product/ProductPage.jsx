import React, { useState, useEffect } from 'react';
import { makeStyles, theme } from '@material-ui/core/styles';
import { Box, Container, Typography, TextareaAutosize, InputLabel, IconButton } from '@material-ui/core';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import agent from '../../api/agent';
import { Button } from '@material-ui/core';
import { Favorite, FormatListNumberedRtlOutlined, Label, Payment, Send, ShoppingCart } from '@material-ui/icons';
import guid from 'guid'
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
    useEffect(() => {
        let idBackup = id.split('/')[5];
        agent.Products.details(idBackup)
            .then(response => { setProduct(response); })
    }, [id])
    return (
        <div className={classes.root}>
            <Container>
                <Typography className={classes.title} variant="inherit" >
                    {product.title}
                </Typography>
                <Box display="flex" justifyContent="center">
                    <div className={classes.imagesDiv}>
                        <Carousel showArrows={true} showThumbs={false} >
                            {product.images === null || typeof (product.images) === 'undefined' ?
                                <p>Images not found</p>
                                :
                                product.images.map((image, key) => {
                                    return (
                                        <div key={key}>
                                            <img src={image.imageUrl} className={classes.Img} />
                                            <p className="legend" style={{ color: 'yellow' }}>{product.name}</p>
                                        </div>
                                    )
                                })}
                        </Carousel>
                    </div>
                </Box>
                <Typography variant="h2" color="primary" className={classes.title}>
                    Цена: {product.price + ' рублей'}
                </Typography>
                <Box display="flex" justifyContent="space-between" paddingTop="10px">
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
                <Typography variant="h2" color="primary" className={classes.title}>
                    О Товаре
                </Typography>
                <Typography className={classes.Description} color="inherit">
                    {product.description}
                </Typography>
                <Typography variant="h2" color="primary" className={classes.title}>
                    Отзывы
                </Typography>
                <Box display="flex" justifyContent="center" flexDirection="column" maxWidth="30wh" style={{ marginTop: '30px' }}>
                    <Box display="flex" justifyContent="space-between" flexDirection="row">
                        <InputLabel variant="outlined">Написать отзыв</InputLabel>
                    </Box>
                </Box>
            </Container>
        </div >
    );
}

export default ProductPage;
