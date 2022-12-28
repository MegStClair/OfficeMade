import React, { useState, useEffect } from 'react';
import { commerce } from './library/Commerce';

import { Products, Navbar, Cart, Checkout } from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PrintDisabled } from '@material-ui/icons';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({}); 

  // getting products
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  }

  // getting cart & setting state
  const fetchCart = async () => {   
    setCart(await commerce.cart.retrieve())
  }

  // add items to cart
  const handleAddtoCart = async (productID, quantity) => {    // function that adds product to cart, takes 2 params
    const item = await commerce.cart.add(productID, quantity);  // use params to pass to API 

  
    setCart(item);   
  }

  // update item quantity
  const handleCartQty = async (productID, quantity) => {
    const item = await commerce.cart.update(productID, { quantity });

    setCart(item)
  }

  // remove item from cart
  const handleRemoveFromCart = async (productID) => {
    const item = await commerce.cart.remove(productID);

    setCart(item);
  }

  // empty cart completely
  const handleEmptyCart = async () => {
    const item = await commerce.cart.empty();

    setCart(item);
  }

  // render
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log(cart);

  return (
    <Router>
    <div>
        <Navbar totalItems={cart.total_items}/>
        <Routes>
          <Route exact path="/" element={<Products products={products} onAddtoCart={handleAddtoCart}/>}/>
          <Route exact path="/cart" 
            element={<Cart 
              cart={cart}
              handleCartQty={handleCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
          />}/>
          <Route exact path="/checkout" element={<Checkout cart={cart} />} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;