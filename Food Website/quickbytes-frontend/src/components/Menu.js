// src/Menu.js
import React, { useState, useEffect } from 'react';
import { fetchMenuItems, addToCart } from '../api';
import './Menu.css';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMenuItems = async () => {
      try {
        const response = await fetchMenuItems();
        setMenuItems(response); // Ensure response.items is always an array
      } catch (error) {
        setError('Failed to load menu items');
        console.error('Failed to fetch menu:', error);
      }
    };
    loadMenuItems();
  }, []);

  const handleAddToCart = async (item) => {
    try {
      await addToCart(item._id, 1); // Assuming quantity is 1
      alert('Item added to cart');
    } catch (error) {
      alert('Failed to add item to cart');
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="products">
      <div className="container-menu">
        <h2>All Items</h2>
        <div className="grid">
          {menuItems.length === 0 ? (
            <p>No items available</p>
          ) : (
            menuItems.map((item) => (
              <div className="product-card" key={item._id}>
                <img src={item.imageUrl} alt={item.name} />
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
                <button onClick={() => handleAddToCart(item)} className="btn">
                  Add to Cart
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Menu;
