// src/Cart.js
import React, { useState, useEffect } from 'react';
import { fetchCartItems, deleteCartItem } from '../api';
import { useNavigate } from 'react-router-dom'; // For navigation
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); // Using useNavigate to navigate between pages

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const response = await fetchCartItems();
        setCartItems(response.items);
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      }
    };
    loadCartItems();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await deleteCartItem(productId);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.product._id !== productId)
      );
    } catch (error) {
      console.error('Failed to delete cart item:', error);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const handleProceedToPayment = () => {
    navigate('/place-order'); // Redirect to the PlaceOrder page
  };

  return (
    <section className="cart">
      <div className="container-cart">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <ul className="cart-list">
              {cartItems.map((item) => (
                <li key={item.product._id} className="cart-item">
                  <img src={item.product.imageUrl} alt={item.product.name} />
                  <div>
                    <h3>{item.product.name}</h3>
                    <p>₹{item.product.price} x {item.quantity}</p>
                    <button 
                      className="delete-button" 
                      onClick={() => handleDelete(item.product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-total">
              <h3>Total: ₹{getTotalPrice()}</h3>
              <button className="proceed-button" onClick={handleProceedToPayment}>
                Proceed to Payment
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
