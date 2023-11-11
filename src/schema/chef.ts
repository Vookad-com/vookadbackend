const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  building: String,
  area: String,
  landmark: String,
});

const chefInventory = new mongoose.Schema({
  inventoryid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inventory',
  },
  chefId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chef',
  },
  enable: {
    type: Boolean,
    default: false,
  },
});

const ChefSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
  },
  address: addressSchema,
  pincode: {
    type: String,
    maxlength: 6,
    required: true,
  },
  displayname: {
    type: String,
    required: true,
  },
});

export const Chef = mongoose.model('Chef', ChefSchema);
export const ChefInventory = mongoose.model('Chef_Inventory', chefInventory);
