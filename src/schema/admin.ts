const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
    required: true
  },
  roles: {
    type: [String],
    enum: ['emp', 'superadmin'],
  }
});

export const admin = mongoose.model('Admin', adminSchema);

