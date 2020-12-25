import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core'
import agent from '../../app/api/agent'
import { makeStyles } from '@material-ui/core/styles';
import ProductList from './ProductList';
import Fab from '@material-ui/core/Fab';
import SortIcon from '@material-ui/icons/Sort';
import { Tooltip } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: '60px',
        paddingLeft: '60px'
    },
    sortedSidebarBtn: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    },
}))
const ProductDashboard = () => {
    const classes = useStyles();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        agent.Products.list()
            .then(response => {
                let products = [];
                response.forEach((product) => {
                    products.push(product);
                })
                setProducts(products);
            })
    }, [])
    return (
        <Grid container className={classes.root} direction="row">
            <ProductList products={products} />
            <div className={classes.sortedSidebarBtn}>
                <Tooltip title={<p style={{ fontSize: '12px' }}>Сортировать</p>} placement="top">
                    <Fab color="primary" aria-label="sort">
                        <SortIcon />
                    </Fab>
                </Tooltip>
            </div>
        </Grid >
    );
}

export default ProductDashboard;
