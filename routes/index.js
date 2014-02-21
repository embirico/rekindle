
/*
 * GET the home/intro/login page
 */

var models = require('../models');

exports.view = function(req, res){

  numberSwipeCards = 5;
  models.User
    .find({})
    .limit(numberSwipeCards)
    .exec(afterQuery);

  function afterQuery(err, users) {
    if(err) console.log(err);

    console.log(users);

    var queue = [];

    res.render('index', {
      title: 'Rekindle',
      queue: queue,
      queue_string: JSON.stringify(queue),
      candidates: users,
      candidates_string: JSON.stringify(users),
      showQueueButton: true,
      numberSwipeCards: numberSwipeCards
    });

  }


  
};