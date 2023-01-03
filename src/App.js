import React, { useState, useEffect } from 'react';
import { commerce } from './library/Commerce';

import { Products, Navbar, Cart, Checkout, Banner } from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({}); 
  const [order, setOrder] = useState({}); 
  const [errorMessage, setErrorMessage] = useState('');

  // getting products
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  // getting cart & setting state
  const fetchCart = async () => {   
    setCart(await commerce.cart.retrieve())
  };

  // add items to cart
  const handleAddtoCart = async (productID, quantity) => {    // function that adds product to cart, takes 2 params
    const item = await commerce.cart.add(productID, quantity);  // use params to pass to API 

  
    setCart(item);   
  };

  // update item quantity
  const handleCartQty = async (productID, quantity) => {
    const item = await commerce.cart.update(productID, { quantity });

    setCart(item)
  };

  // remove item from cart
  const handleRemoveFromCart = async (productID) => {
    const item = await commerce.cart.remove(productID);

    setCart(item);
  };

  // empty cart completely
  const handleEmptyCart = async () => {
    const item = await commerce.cart.empty();

    setCart(item);
  };

  // after checkout is complete, empty cart
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  }; 

  // function to call Commerce API for fulfilling an order, then refresh cart
  const handleCaptureCheckout = async (checkoutTokenID, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenID, newOrder)

      setOrder(incomingOrder);
      
      refreshCart();
    } catch(error) {
      setErrorMessage(error.data.error.message);
    }
  };

  // render
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);


  return (
    <Router>
    <div>
        <Navbar totalItems={cart.total_items}/>
        <Banner/>
        <Routes>
          <Route exact path="/" element={<Products products={products} onAddtoCart={handleAddtoCart} handleCartQty />}/>
          <Route exact path="/cart" element={<Cart 
              cart={cart}
              handleCartQty={handleCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}/>
              }/>
          <Route exact path="/checkout" element={
            <Checkout 
              cart={cart} 
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}/>
          } />
        </Routes>
    </div>
    </Router>
  );
}

export default App;