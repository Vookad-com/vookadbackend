"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carousel = void 0;
const mongoose = require('mongoose');
const carouselSchema = new mongoose.Schema({
    gallery: {
        type: [{
                id: String,
                url: String,
                name: String,
                route: String
            }] // Array of image links
    },
});
exports.carousel = mongoose.model('carousel', carouselSchema);
