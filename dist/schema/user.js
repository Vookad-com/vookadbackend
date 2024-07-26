"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = exports.addressSchema = void 0;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
exports.addressSchema = new mongoose.Schema({
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
    label: {
        type: [String],
        enum: ['home', 'work', 'other'],
    },
    building: String,
    pincode: {
        type: String,
        maxlength: 6,
        required: true,
    },
    area: String,
    landmark: String, // Can be null or omitted if not provided
});
const userSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
    },
    fireId: {
        type: String,
        required: true,
    },
    fcmToken: {
        type: String,
    },
    name: {
        type: String,
    },
    addresses: [exports.addressSchema], // An array of address objects
});
// Create the PhonebookEntry model
exports.users = mongoose.model('users', userSchema);
