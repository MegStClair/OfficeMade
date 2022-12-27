import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom';

import useStyles from './styles';
import CartItem from './CartItem/CartItem';

const Cart = ({ cart, handleCartQty, handleRemoveFromCart, handleEmptyCart }) => {
    const classes = useStyles();

       // display different content if cart is empty or not

    // if cart is empty, render EmptyCart 
    const EmptyCart = () => (
        <Typography variant="subtitle1"> Your shopping cart is empty. <Link to='/' className={classes.link}> Add some items</Link>!</Typography>
    ); 

    // if cart has items, render FilledCart
    const FilledCart = () => (
        <>
        {/* looping thru all items & passing data for each specific item */}
        <Grid container spacing={3}>
            {cart.line_items.map((item) => (
                <Grid item xs={12} sm={4} key={item.id}>
                    <CartItem item={item} onHandleCartQty={handleCartQty} onRemoveFromCart={handleRemoveFromCart}/> 
                </Grid>
            ))}
        </Grid>
        <div className={classes.cartDetails}>
            <Typography variant="h5"> Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
            <div>
                <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
                <Button className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
            </div>

        </div>
        </>
    );

    if(!cart.line_items) return 'Loading...';

  return ( 
    // if cart is empty, show EmptyCart, else show FilledCart (line 43)
    <Container>
       <div className={classes.toolbar}/> 
       <Typography className={classes.title} variant="h4" gutterBottom>Shopping Cart</Typography>
       { !cart.line_items.length ? <EmptyCart /> : <FilledCart /> }
    </Container>
  )
}

export default Cart