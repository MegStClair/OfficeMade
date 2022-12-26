import React from 'react';
import { Grid } from '@material-ui/core';

import Product from './Product/Product';
import useStyles from './styles';


// Create Products component
const Products = ({ products }) => {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Grid container justifyContent='center'spacing={4}>
                {products.map((product) => (     // get each product & then return something specific
                    // item grid with key (to loop we need id), gird contains Product component
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>   
                        <Product product={product}/>
                    </Grid>  
                    // pass product via product prop which we will loop over and send each one by one & give product.jsx access to id, name, desc, etc
                ))}
            </Grid>
        </main>
    )
}

export default Products;