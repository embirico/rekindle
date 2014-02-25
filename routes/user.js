//inside routes

var models = require('../models');


/*
  Checks the user's session;
  If they are not logged in, redirects them to the login page
  If they are logged in, returns their userID
  TODO create a session string of randomlu generated characters linked to users in DB
*/
exports.checkSession = function(req, res) {
  if(typeof req.session.userID == 'undefined') {
    res.redirect("/login");
  } else {
    return req.session.userID;
  }
}


/*
  Saves the users details the first time they log in and sets their session.
  If they have already signed up, it deosn't do anything, but sets the session
*/
exports.saveUser = function(req, res) {

  var form_data = req.body;
  var id = form_data.id;
  var name = form_data.name;

  models.User
    .find({"id": id})
    .exec(afterQuery);

  function afterQuery(err, user) { // this is a callback
    if(err) {console.log(err); res.send(500); }
    console.log(user);
    console.log(user.length);
    if(user.length == 0) {
      req.session.userID = parseInt(id);

      var newUser = new models.User({
        "id": id,
        "name": name,
        "sessionkey": id
      });
      newUser.save(afterSaving);
      function afterSaving(err) { // this is a callback
        if(err) {console.log(err); res.send(500); }
        res.send(200);
      }
    } else {
      req.session.userID = parseInt(id);
      res.send(200);
    }
  }
}


/*
  After the user logs in, this exports all their friends data into the db
  If their friends have already been imported, this does nothing.
*/
exports.addFriends = function(req, res) {

  var userID = req.session.userID;
  if(userID > 0) {

    models.Friend
    .find({"owner_id": userID})
    .exec(afterQuery);

    function afterQuery(err, user) { // this is a callback
      if(err) {console.log(err); res.send(500); }
      if(user.length == 0) {
        var form_data = req.body.friends.data;

        for(var i = 0; i < form_data.length; i++) {
          var location = '';
          if (typeof form_data[i].location != 'undefined') {
            location = form_data[i].location.name;
          }
          var newUser = new models.Friend({
            "owner_id": parseInt(userID),
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
    else {
      res.send(200);
    }
    }
  } else {
    res.send(500);
  }
}


/*
Updates the user's queue, adding or removing a friend
*/
exports.updateQueue = function(req, res) {
  var form_data = req.body;
  var friendID = parseInt(form_data.id);
  var action = form_data.action;

  if(action == "add") {

    var conditions = { "owner_id" : req.session.userID, "id": friendID }
      , update = { "in_queue": 1}
      , options = { multi: true };

    models.Friend.update(conditions, update, options, afterUpdating);
    function afterUpdating(err) { // this is a callback
      if(err) {console.log(err); res.send(500); }
      res.send(200);
    }


  } else if(action == "remove") {

    var conditions = { "owner_id" : req.session.userID, "id": friendID }
      , update = { "in_queue": 0}
      , options = { multi: true };

    models.Friend.update(conditions, update, options, afterUpdating);
    function afterUpdating(err) { // this is a callback
      if(err) {console.log(err); res.send(500); }
      res.send(200);
    }

  }
}