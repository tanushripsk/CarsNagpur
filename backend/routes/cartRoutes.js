const express = require('express');
const {
  addToCart,
  removeFromCart,
  getCart,
  countAddToCartProduct,
} = require('../controller/cartController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware to protect routes

const router = express.Router();

// Add a car to the cart
router.post('/add', authMiddleware, addToCart);

// Remove a car from the cart
router.delete('/remove/:carId', authMiddleware, removeFromCart);

// Get the user's cart
router.get('/', authMiddleware, getCart);

// Get the count of items in the cart
router.get('/count', authMiddleware, countAddToCartProduct);

module.exports = router;
