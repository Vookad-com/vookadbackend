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

export const carousel = mongoose.model('carousel', carouselSchema);
