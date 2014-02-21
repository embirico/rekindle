//inside routes

var models = require('../models');

exports.userInfo = function(req, res) { 
  var userID = req.params.id;

  // query for the specific user and
  // call the following callback

  //find user with userID
  models.User
    .find({"_id": userID})
    .exec(afterQuery);


  function afterQuery(err, users) {
    if(err) console.log(err);
    res.json(users[0]);
  }
}

exports.addFriends = function(req, res) {
  var form_data = req.body.friends.data;

  console.log(form_data);

  for(var i = 0; i < form_data.length; i++) {
    var location = '';
    if (typeof form_data[i].location != 'undefined') {
      location = form_data[i].location.name;
    }
    var newUser = new models.User({
      "first_name": form_data[i].first_name,
      "last_name": form_data[i].last_name,
      "image": form_data[i].picture.data.url,
      "location": location,
      "id": form_data[i].id,
      "in_queue": 0
    });
    newUser.save(afterSaving);
  }

  function afterSaving(err) { // this is a callback
    if(err) {console.log(err); res.send(500); }
  }
  res.send(200);
}


exports.getFriends = function(req, res) {
  models.User
    .find({})
    .exec(afterQuery);

  function afterQuery(err, users) {
    if(err) console.log(err);
    console.log(users)
    return users;
  }
  
}

exports.deleteUser = function(req, res) {
  var userID = req.params.id;

  models.User
    .find({"_id": userID})
    .remove()
    .exec(afterRemoving);

    function afterRemoving(err, users) {
      if(err) console.log(err);
      res.send();
    }
  it
  // YOU MUST send an OK response w/ res.send();
}