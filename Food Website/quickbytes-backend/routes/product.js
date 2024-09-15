const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Get all products
router.get('/menu', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Add new product
router.post('/', async (req, res) => {
  const { name, price, description, imageUrl } = req.body;

  try {
    const newProduct = new Product({ name, price, description, imageUrl });
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
