// src/PlaceOrder.js
import React, { useState, useEffect } from 'react';
import { fetchCartItems } from '../api'; // Fetch cart items from API
import './PlaceOrder.css'; // Styling for place order page

const PlaceOrder = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const response = await fetchCartItems();
        setCartItems(response.items);
        const total = response.items.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        );
        setTotalPrice(total);
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      }
    };

    loadCartItems();
  }, []);

  const handlePlaceOrder = () => {
    // Handle order submission logic here
    // You can integrate payment gateway API like Stripe, PayPal, etc.
    console.log('Placing order with total price:', totalPrice);
    alert('Order placed successfully! Redirecting to payment...');
    // Redirect to payment page or handle payment process
  };

  return (
    <div className="place-order-container">
      <h2>Review Your Order</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="order-list">
            {cartItems.map((item) => (
              <li key={item.product._id} className="order-item">
                <img src={item.product.imageUrl} alt={item.product.name} />
                <div>
                  <h3>{item.product.name}</h3>
                  <p>₹{item.product.price} x {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="order-total">
            <h3>Total: ₹{totalPrice}</h3>
          </div>

          <button className="place-order-button" onClick={handlePlaceOrder}>
            Proceed to Payment
          </button>
        </>
      )}
    </div>
  );
};

export default PlaceOrder;
