import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Maincontent from './components/Maincontent';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import PlaceOrder from './components/PlaceOrder'; // Import the PlaceOrder component
import './App.css'; // Import any global styles

const App = () => {
  // Manage cart items state at the top-level
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart
  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  return (
    <Router>
      <Header />
      <Routes>
        {/* Home/Main content */}
        <Route path="/" element={<Maincontent />} />
        
        {/* Menu page - passing addToCart to allow adding items */}
        <Route path="/menu" element={<Menu addToCart={addToCart} />} />
        
        {/* Cart page - passing cartItems to display items */}
        <Route path="/cart" element={<Cart cartItems={cartItems} />} />
        
        {/* PlaceOrder page - passing cartItems for reviewing and ordering */}
        <Route path="/place-order" element={<PlaceOrder cartItems={cartItems} />} />
        
        {/* Login and Register pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
