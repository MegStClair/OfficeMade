// import { Icon, IconButton, Typography } from '@material-ui/core'
import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';

//Allows us to use the styles created in Styles.js after calling below (line 12)
import useStyles from './styles'; // hook

// Layout of each product (product card)
// since product is a subcomponent of Products.jsx, we can call product from there (passes on props)
const Product = ({ product, onAddtoCart }) => {
    const classes = useStyles(); // complete hook 

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.image.url} title={product.name}/>
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h5">
                        {product.price.formatted_with_symbol}
                    </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary"/>
            </CardContent>
            <CardActions disableSpacing className={classes.CardActions}>
                <IconButton aria-label="Add to Cart" onClick={() => onAddtoCart(product.id, 1)}> 
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default Product