const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add item to cart
router.post('/add', async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    let cart = await Cart.findOne();

    if (cart) {
      // Cart exists, update it
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (itemIndex > -1) {
        // Update quantity if item already in cart
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new item to cart
        cart.items.push({ productId, quantity });
      }

      await cart.save();
    } else {
      // Create a new cart
      cart = new Cart({
        items: [{ productId, quantity }],
      });

      await cart.save();
    }

    res.status(201).json(cart);
  } catch (err) {
    console.error('Error adding to cart:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get cart items
router.get('/', async (req, res) => {
  try {
    const cart = await Cart.findOne().populate('items.productId');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Format the response to include product details
    const cartItems = cart.items.map(item => ({
      product: item.productId,
      quantity: item.quantity
    }));

    res.json({ items: cartItems });
  } catch (err) {
    console.error('Error fetching cart items:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete item from cart
router.delete('/delete/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    let cart = await Cart.findOne();

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find item index in cart
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
      // Remove item from cart
      cart.items.splice(itemIndex, 1);

      await cart.save();
      return res.status(200).json({ message: 'Item removed from cart', cart });
    }

    return res.status(404).json({ message: 'Item not found in cart' });
  } catch (err) {
    console.error('Error deleting item from cart:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});
// Proceed to payment
router.post('/proceed-to-payment', async (req, res) => {
    try {
      const cart = await Cart.findOne().populate('items.productId');
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      // Calculate total price
      const totalPrice = cart.items.reduce((total, item) => {
        return total + item.productId.price * item.quantity;
      }, 0);
  
      // Here you can integrate with a payment gateway, e.g., Stripe or PayPal
      // For now, just simulate payment process
  
      res.status(200).json({ message: 'Proceeding to payment', totalPrice });
    } catch (err) {
      console.error('Error proceeding to payment:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  });
  // backend/routes/cart.js

// Proceed to payment and place order
router.post('/place-order', async (req, res) => {
    try {
      const cart = await Cart.findOne().populate('items.productId');
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      // Calculate total price
      const totalPrice = cart.items.reduce((total, item) => {
        return total + item.productId.price * item.quantity;
      }, 0);
  
      // Simulate payment gateway interaction and order placement
      res.status(200).json({ message: 'Order placed successfully', totalPrice });
    } catch (err) {
      console.error('Error placing order:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

module.exports = router;


  