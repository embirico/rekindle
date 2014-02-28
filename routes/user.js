//inside routes

var models = require('../models');

/*
  Checks the user's session;
  If they are not logged in, redirects them to the login page
  If they are logged in, returns their userID
  TODO create a cookies string of randomly generated characters linked to users in DB
*/
exports.checkSession = function(req, res) {
  if(typeof req.cookies.userID == 'undefined') {
    return res.redirect("/login");
  } else {
    return req.cookies.userID;
  }
}


/*
  Saves the users details the first time they log in and sets their cookies.
  If they have already signed up, it deosn't do anything, but sets the cookies
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
    //console.log(user);
    //console.log(user.length);
    if(user.length == 0) {
      // Set session
      res.cookie('userID', parseInt(id));

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
      // Set session
      res.cookie('userID', parseInt(id));
      res.send(200);
    }
  }
}




/*
  After the user logs in, this exports all their friends data into the db
  If their friends have already been imported, this does nothing.
*/
exports.addFriends = function(req, res) {

  var userID = req.cookies.userID;
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
            "fb_link": form_data[i].link,
            "in_queue": 0,
            "score" : 0
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
Updates the user's swipe list given a action
*/
exports.updateSwipe = function(req, res) {
  var form_data = req.body;
  var friendID = parseInt(form_data.id);
  var action = form_data.action;

  if(action == "swipeLeft") {
    var conditions = { "owner_id" : req.cookies.userID, "id": friendID }
      , update = {$inc: {"score": -2000}}
      , options = { multi: true };

    models.Friend.update(conditions, update, options, afterUpdating);
    function afterUpdating(err) { // this is a callback
      if(err) {console.log(err); res.send(500); }
      res.send(200);
    }
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

    var conditions = { "owner_id" : req.cookies.userID, "id": friendID }
      , update = { "in_queue": 1}
      , options = { multi: true };

    models.Friend.update(conditions, update, options, afterUpdating);
    function afterUpdating(err) { // this is a callback
      if(err) {console.log(err); res.send(500); }
      res.send(200);
    }
  } else if(action == "remove") {

    var conditions = { "owner_id" : req.cookies.userID, "id": friendID }
      , update = { "in_queue": 0, $inc: {"score": 500} }
      , options = { multi: true };

    models.Friend.update(conditions, update, options, afterUpdating);
    function afterUpdating(err) { // this is a callback
      if(err) {console.log(err); res.send(500); }
      res.send(200);
    }
  } else if(action == "delete") {

    var conditions = { "owner_id" : req.cookies.userID, "id": friendID }
      , update = { "in_queue": 0, $inc: {"score": -500} }
      , options = { multi: true };

    models.Friend.update(conditions, update, options, afterUpdating);
    function afterUpdating(err) { // this is a callback
      if(err) {console.log(err); res.send(500); }
      res.send(200);
    }
  }
}


/*
Calls the callback with the JSON array of queued friends
*/
exports.getQueuedFriends = function(req, res, userID, callback) {
    models.Friend
    .find({"owner_id": userID, "in_queue":1})
    .exec(afterQuery);

  function afterQuery(err, queued) {
    if(err) {
      callback(err);
    } else {
      callback(null, queued);
    }
  }
}


/*

*/
exports.getFriend = function(req, res) {
  userID = req.cookies.userID;
  var form_data = req.body;
  var friendID = parseInt(form_data.id);

  var conditions = { "owner_id" : userID, "id": friendID }
    , update = { "in_queue": 0, $inc: {"score": 2000} }
    , options = { multi: true };

  models.Friend.update(conditions, update, options, afterUpdating);
  function afterUpdating(err) { // this is a callback
    if(err) {console.log(err); res.send(500); }

    models.Friend
    .find({"owner_id": userID, "id": friendID})
    .exec(afterQuery);

    function afterQuery(err, user) { // this is a callback
      if(err) {console.log(err); res.send(500); }
      res.send(user[0]);
    }
  }
}


/*
Calls the callback with the JSON array of friends to swipe
*/
exports.getSwipeFriends = function(req, res, userID, numberSwipeCards, offset, callback) {
  models.Friend
    .find({"owner_id": userID, "in_queue":0})
    .sort({"score":-1})
    .skip(offset)
    .limit(numberSwipeCards)
    .exec(afterQuery);

  function afterQuery(err, users) {
    if(err) {
      callback(err);
    } else {
      callback(null, users);
    }
  }
}