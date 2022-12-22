// import { Icon, IconButton, Typography } from '@material-ui/core'
import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';

//Allows us to use the styles created in Styles.js after calling below (line 12)
import useStyles from './Styles'; // hook

// Layout of each product (product card)
// since product is a subcomponent of Products.jsx, we can call product from there (passes on props)
const Product = ({ product }) => {
    const classes = useStyles(); // complete hook 
  return (
    <Card className={classes.root}>
        <CardMedia className={classes.media} image={product.image} title={product.name}/>
        <CardContent>
            <div className={classes.cardContent}>
                <Typography variant="h5" gutterBottom>
                    {product.name}
                </Typography>
                <Typography variant="h5">
                    {product.price}
                </Typography>
            </div>
            <Typography variant="body2" color="textSecondary">{product.description}</Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.CardActions}>
            <IconButton aria-label="Add to Cart">
                <AddShoppingCart />
            </IconButton>
        </CardActions>
    </Card>
  )
}

export default Product