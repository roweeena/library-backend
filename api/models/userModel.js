const mongoose = require('mongoose');

const {Schema} = mongoose;

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  books: [{
    type:Schema.Types.ObjectId,
    ref:"Book"
  }]
}, {collection: 'users'});

module.exports =  mongoose.model('User', UserSchema)
