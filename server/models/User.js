const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  userId:{type:Number, unique:true},
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


// Hash the password before saving the user document
userSchema.pre('save', async function(next) {
  if (!this.isModified('passwordHash')) {
    this.updatedAt = Date.now();
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  this.updatedAt = Date.now();

  next();
});

// Add the auto-incrementing plugin
userSchema.plugin(AutoIncrement, { inc_field: 'userId' });

// Create the User model
const User = mongoose.model('User', userSchema, 'users'); // Explicitly specify the 'users' collection

module.exports = User;
