const asyncHandler = require('express-async-handler');
const Cart = require('../model/cart');
const Car = require('../model/carModel');

/**
 * Add a car to the cart
 */
const addToCart = asyncHandler(async (req, res) => {
  const { carId } = req.body;

  // Find car by ID
  const car = await Car.findById(carId);
  if (!car) {
    res.status(404);
    throw new Error('Car not found');
  }

  // Find user's cart
  let cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    // Check if the car already exists in the cart
    const carIndex = cart.items.findIndex((item) => item.car.toString() === carId);

    if (carIndex > -1) {
      // Increment quantity if car exists
      cart.items[carIndex].quantity += 1;
    } else {
      // Add new car to the cart
      cart.items.push({ car: carId, quantity: 1 });
    }
  } else {
    // Create a new cart if none exists
    cart = new Cart({
      user: req.user._id,
      items: [{ car: carId, quantity: 1 }],
    });
  }

  await cart.save();
  res.status(201).json(cart);
});

/**
 * Remove a car from the cart
 */
const removeFromCart = asyncHandler(async (req, res) => {
  const { carId } = req.params;

  // Find user's cart
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  // Remove the car from the cart
  cart.items = cart.items.filter((item) => item.car.toString() !== carId);

  // If cart is empty, delete it
  if (cart.items.length === 0) {
    await Cart.deleteOne({ _id: cart._id });
    return res.status(200).json({ message: 'Cart is empty and has been deleted', success: true });
  }

  await cart.save();
  res.status(200).json({ message: 'Car removed from cart', success: true });
});

/**
 * Get the cart details for the user
 */
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.car');
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  res.status(200).json(cart);
});

/**
 * Get count of items in the cart
 */
const countAddToCartProduct = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  // Count all quantities in the cart
  const count = cart
    ? cart.items.reduce((total, item) => total + item.quantity, 0)
    : 0;

  res.status(200).json({
    count,
    message: 'Cart count retrieved successfully',
    success: true,
  });
});

module.exports = {
  addToCart,
  removeFromCart,
  getCart,
  countAddToCartProduct,
};
