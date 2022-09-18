const mongoose = require('mongoose');
const validator = require('validator');

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    validate: {
      validator: (img) => {console.log('valid',img);validator.isURL(img)},
    },
    type: String,
    required: true,
  },
  comments: [{
      type: String
  }],
});

module.exports = mongoose.model('image', imageSchema);
