import React from 'react';
import './Header.css'; // Link the CSS styles

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <h1>Quick<span>Bites</span></h1>
        <p>Delicious Bites - Your Favorite Meals Delivered to Your Doorstep!</p>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search for pizza, burger, salad, etc..." />
        <button type="button" className="search-icon">
          <i className="fas fa-search"></i>
        </button>
      </div>
      <div className="auth-buttons">
        <a href="/cart" className="cart-btn">Cart</a>
        <a href="/menu" className="menu-btn">Menu</a>
        <a href="/login" className="login-btn">Login</a>
        <a href="/register" className="signup-btn">Sign up</a>
      </div>
    </div>
  );
};

export default Header;
