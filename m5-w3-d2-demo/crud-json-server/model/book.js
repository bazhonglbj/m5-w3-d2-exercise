const mongoose = require ("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title required'],
  },
  author: {
    type: String,
    required: [true, 'author required'],
  },
})

module.exports = mongoose.model('Book', BookSchema);