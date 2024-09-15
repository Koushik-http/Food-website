// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';  // Ensure this matches your backend

// Register API Call
export const registerUser = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

// Login API Call
export const loginUser = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};
// src/api.js

export const fetchMenuItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/menu');
      if (!response.ok) {
        throw new Error('Failed to fetch menu items');
      }
      const data = await response.json();
      return data; // Ensure this matches what you expect in Menu.js
    } catch (error) {
      console.error('Error fetching menu items:', error);
      throw error;
    }
  };
  


// Add New Menu Item (Admin)
export const addMenuItem = (menuItem) => {
  return axios.post(`${API_URL}/menu`, menuItem);
};

// Update Menu Item (Admin)
export const updateMenuItem = (id, updatedItem) => {
  return axios.put(`${API_URL}/menu/${id}`, updatedItem);
};

// Delete Menu Item (Admin)
export const deleteMenuItem = (id) => {
  return axios.delete(`${API_URL}/menu/${id}`);
};
// src/api.js


// Add item to cart
export const addToCart = async (productId, quantity) => {
    try {
      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };
  
  // Get cart items
  export const fetchCartItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cart');
      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching cart items:', error);
      throw error;
    }
  };
  // src/api.js
  export const deleteCartItem = async (productId) => {
    const response = await fetch(`/api/cart/delete/${productId}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error('Failed to delete cart item');
    }
  
    return await response.json();
  };
  
