const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  enable: {
    type: Boolean
  },
  gallery: {
    type: [{
      id: String,
      url: String,
      name: String,
    }] // Array of image links
  },
  family: {
    type: [String],
    enum: ['menu', 'package', 'products'],
  },
  category: {
    type: [{
      id: String,
      name: String,
      price: Number,
    }]
  }
});

export const inventory = mongoose.model('Inventory', inventorySchema);
