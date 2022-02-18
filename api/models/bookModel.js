const mongoose = require('mongoose');

const {Schema} = mongoose;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  published_date: {
    type: Date
  },
  publisher: {
    type: String
  },
  updated_date: {
    type: Date,
    default: Date.now
  },
  owner: { //one-to-many relationship
    type: Schema.Types.ObjectId,
    ref: "User"
  }
}, {collection: 'books'});

module.exports =  mongoose.model('Book', BookSchema)
