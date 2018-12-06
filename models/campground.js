const mongoose = require('mongoose');

// Campground Schema
const campgroundSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

// Campground collections in MongoDB (Model)
module.exports = mongoose.model('Campground', campgroundSchema);
