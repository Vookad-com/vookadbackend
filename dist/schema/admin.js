"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = void 0;
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
exports.admin = mongoose.model('Admin', adminSchema);
