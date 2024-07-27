const mongoose = require('mongoose');


// Define the item schema for the items array
const itemSchema = new mongoose.Schema({
    itemId: { type: Number, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  });
  
  // Define the order schema
  const orderSchema = new mongoose.Schema({
    userId: { type: Number, required: true },
    orderDate: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
    items: [itemSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  // Middleware to update the updatedAt field before saving
  orderSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });
  
  // Create the Order model
  const Order = mongoose.model('Order', orderSchema, 'orders'); // Explicitly specify the 'orders' collection
  
  module.exports = Order;
