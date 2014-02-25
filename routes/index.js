
/*
 * GET the home/intro/login page
 */

var models = require('../models');
var user = require('./user');

exports.view = function(req, res){

  // Check session is valid
  userID = user.checkSession(req, res);

  numberSwipeCards = 5;
  models.Friend
    .find({"owner_id": userID, "in_queue":0})
    .limit(numberSwipeCards)
    .exec(afterQuery);

  function afterQuery(err, users) {
    if(err) console.log(err);

    models.Friend
      .find({"owner_id": userID, "in_queue":1})
      .exec(afterQuery2);

    function afterQuery2(err, queued) {
      if(err) console.log(err);

      var queue = [];

      res.render('index', {
        title: 'Rekindle',
        queue: queue,
        queue_string: JSON.stringify(queued),
        candidates: users,
        candidates_string: JSON.stringify(users),
        showQueueButton: true,
        numberSwipeCards: numberSwipeCards
      });
    }
  }


  
};