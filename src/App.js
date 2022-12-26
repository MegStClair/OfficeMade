import React, { useState, useEffect } from 'react';
import { commerce } from './library/Commerce';

import { Products, Navbar } from './components';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({}); 

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  }

  const fetchCart = async () => {   // getting cart & setting state
    setCart(await commerce.cart.retrieve())
  }

  const handleAddtoCart = async (productID, quantity) => {    // function that adds product to cart, takes 2 params
    const item = await commerce.cart.add(productID, quantity);  // use params to pass to API 
  
    setCart(item.cart);   // add items to cart
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log(cart);

  return (
    <div>
        <Navbar />
        <Products products={products} onAddtoCart={handleAddtoCart}/>
    </div>
  )
}

export default App;