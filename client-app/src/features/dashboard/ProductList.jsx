import React from 'react';
import { Grid, Card } from '@material-ui/core'

const ProductList = (props) => {
    return (
        <>
            { props.products === null ? null :
                props.products.map((product, id) => {
                    return (
                        <Grid item key={product.id} lg={12} sm={12} xs={12} md={6} style={{ border: '2px solid green' }
                        }>
                            <p>{product.name}</p>
                            <p>{product.price}</p>
                            <p>{product.title}</p>
                            <p>{product.description}</p>
                        </Grid>
                    )
                })
            }
        </>
    );
}

export default ProductList;
