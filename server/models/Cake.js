const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const cakeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  itemId: { type: Number, unique: true },
  category: { type: String },
  unitPrice: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  imageId: { type: mongoose.Schema.Types.ObjectId }, // Add imageId field
});

cakeSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

cakeSchema.plugin(AutoIncrement, { inc_field: 'itemId' });

const Cake = mongoose.model('Cake', cakeSchema, 'cakes');
module.exports = Cake;
