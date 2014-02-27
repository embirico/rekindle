var Mongoose = require('mongoose');

var FriendSchema = new Mongoose.Schema({
  // fields are defined here
  "owner_id": Number,
  "first_name": String,
  "last_name": String,
  "image": String,
  "location": String,
  "id": String,
  "in_queue": Number
});

exports.Friend = Mongoose.model('Friend', FriendSchema);


var PhotoSchema = new Mongoose.Schema({

  "user_id": Number,
  "photo_url": String
})

exports.Photo = Mongoose.model('Photo', PhotoSchema);


var UserSchema = new Mongoose.Schema({
	"id": Number,
	"name": String,
	"sessionkey": String
});

exports.User = Mongoose.model('User', UserSchema);