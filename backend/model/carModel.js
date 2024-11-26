const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true } // Ensure url field is defined here
});

const carSchema = new mongoose.Schema({
  carName: { type: String, required: true },
  brand: { type: String, required: true },
  kilometer: { type: Number, required: true },
  petrol: { type: Boolean, default: false },
  diesel: { type: Boolean, default: false },
  owner: { type: String, required: true },
  price: { type: Number, required: true },
  images: [ImageSchema], // Embedding ImageSchema in carSchema
  createdAt: { type: Date, default: Date.now },
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
