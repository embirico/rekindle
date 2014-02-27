
/*
 * GET the main swipe page
 */

var async = require('async');
var models = require('../models');
var user = require('./user');

exports.view = function(req, res){

  // Check session is valid
  userID = user.checkSession(req, res);

  var numberSwipeCards = 4;
  var offset = 0;

  // For doing 2 mongoose queries in parallel (since they are asynchronous, have to do this)
  async.parallel({
      swipes: function(callback){
          user.getSwipeFriends(req, res, userID, numberSwipeCards, offset, callback);
      },
      queued: function(callback){
          user.getQueuedFriends(req, res, userID, callback);
      }
  },
  function(err, results) {

    // results now equals: { swipes: {...}, queued: {...} }
    queuedFriends = results.queued;
    swipeFriends = results.swipes;
    for(var i = 0; i < queuedFriends.length; i++) {
      queuedFriends[i].last_name_char = queuedFriends[i].last_name.charAt(0)+".";
      console.log(queuedFriends[i].last_name.charAt(0)+".");
      console.log( queuedFriends[i].last_name_char);
    }

    // Render the page
    res.render('index', {
      title: 'Rekindle',
      queue_string: JSON.stringify(queuedFriends),
      candidates_string: JSON.stringify(swipeFriends),
      showQueueButton: true,
      numberSwipeCards: numberSwipeCards
    });

  });

};