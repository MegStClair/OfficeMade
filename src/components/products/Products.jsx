import React from 'react';
import { Grid } from '@material-ui/core';

import Product from './Product/Product';

// products array containing list of diff products (name & description)
const products = [
    { id: 1, name: 'Shoes', description: 'Running Shoes', price: '$5', image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/49e5514bb83e4c5d8bf5ad9100ef2815_9366/Ultraboost_22_Running_Shoes_White_GX5459_01_standard.jpg' },
    { id: 2, name: 'MacBook', description: 'Apple MacBook', price: '$10', image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-space-gray-select-201810?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1664472289661' },
];

// Create Products component
const Products = () => {
    return (
        <main>
            <Grid container justify="center" spacing={4}>
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