var Mongoose = require('mongoose');

var UserSchema = new Mongoose.Schema({
  // fields are defined here
  "first_name": String,
  "last_name": String,
  "image": String,
  "location": String,
  "id": String,
  "in_queue": Number
});

exports.User = Mongoose.model('User', UserSchema);