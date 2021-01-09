import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import defaultImage from '../../app/images/defaultImage.png'
import Grid from '@material-ui/core/Grid'
import { Box, responsiveFontSizes, Link, Tooltip } from '@material-ui/core';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'
import agent from '../../app/api/agent'
import { IconButton } from '@material-ui/core';
import { Edit, Delete, Share } from '@material-ui/icons';
import ProductEdit from '../product/ProductEdit';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {

    }
}));

export default function ProductList(props) {
    const classes = useStyles();
    const [user, setUser] = useState({});
    const setUserHandler = (response) => {
        setUser(response);
    }
    useEffect(() => {
        if (Object.keys(user).length === 0) {
            agent.SignInManager.currentUser()
                .then((response) => { setUserHandler(response) });
        }
    })
    const ShareButtonClicked = (id) => {
        navigator.clipboard.writeText(`http://localhost:3000/${id}`);
    }
    const DeleteButtonHandler = (id) => {
        agent.Products.delete(id);
    }
    return (
        <>
            {
                props.products.map((product) => {
                    return (
                        <Grid item lg={4} md={6} sm={6} xs={12} key={product.Id}>
                            <Card className={classes.root}>
                                <Grid item>
                                    <CardActionArea onClick={() => { product.mainImage === null ? props.openImage(defaultImage) : props.openImage(product.images) }}>
                                        <Tooltip title={<h3>На весь экран</h3>} enterTouchDelay="200" arrow placement="right">
                                            <CardMedia
                                                component="img"
                                                height="270px"
                                                alt={product.name}
                                                image={product.mainImage === 'null' ? defaultImage : product.mainImage}
                                            />
                                        </Tooltip>
                                    </CardActionArea>
                                </Grid>
                                <CardActionArea>
                                    <Grid item>
                                        <Tooltip title={<h3>Смотреть полностью</h3>} enterTouchDelay="200" arrow>
                                            <CardContent style={{ backgroundColor: '#5b2b6b', color: 'pink' }}>
                                                <Grid container spacing={3} direction="column" >
                                                    <Grid item >
                                                        <Typography gutterBottom variant="h6" component="h2">
                                                            {product.title}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item >
                                                        <Typography variant="button" color="inherit" style={{ fontSize: '15px', marginLeft: 'auto' }}>
                                                            {product.price + ' рублей'}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Tooltip>
                                    </Grid>
                                </CardActionArea>
                                {user.role === 'admin' &&
                                    <CardActions style={{ backgroundColor: 'gray' }}>
                                        <IconButton size="small" color="primary" onClick={() => ShareButtonClicked(product.productId)}>
                                            <Share />
                                        </IconButton>
                                        <IconButton
                                            size="small" color="inherit"
                                            style={{ color: 'red', marginLeft: 'auto' }}
                                            onClick={() => { DeleteButtonHandler(product.productId) }}>
                                            <Delete />
                                        </IconButton>
                                        <NavLink to={{ pathname: '/product/edit', aboutProps: { item: product } }} >
                                            <IconButton size="small" color="inherit" style={{ color: 'blue' }}>
                                                <Edit />
                                            </IconButton>
                                        </NavLink>
                                    </CardActions>
                                }
                            </Card>
                        </Grid>
                    )
                })}
        </>)
}