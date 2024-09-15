// backend/models/Cart.js
const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
      quantity: { type: Number, required: true }
    }
  ]
});

module.exports = mongoose.model('Cart', CartSchema);
