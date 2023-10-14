const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  location: {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      default: [0, 0], // Default to [0, 0] if no coordinates provided
    },
  },
  building: String,
  area: String,
  landmark: String, // Can be null or omitted if not provided
});

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  addresses: [addressSchema], // An array of address objects
});

// Create the PhonebookEntry model
export const users = mongoose.model('users', userSchema);
