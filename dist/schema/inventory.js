"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventory = void 0;
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
    tags: [{ type: String }],
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
exports.inventory = mongoose.model('Inventory', inventorySchema);
