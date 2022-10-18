const mongoose = require('mongoose');

const homePageCarouselSchema = new mongoose.Schema({
    image: {type: String, required: true},
    heading: {type: String, required: true},
    description: {type: String, required: true},
    lang: {type: String, required: true}
});

module.exports = mongoose.model('homepage-carousels', homePageCarouselSchema);