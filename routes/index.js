
/*
 * GET the home/intro/login page
 */

exports.view = function(req, res){

  // Load JSON data from static file
  var user_data = require("../user_data.json");
  var queue = user_data.queue;
  var numberSwipeCards = 5;
  var swipes = user_data.candidates.slice(0,numberSwipeCards);

  res.render('index', {
  	title: 'Rekindle',
  	queue: queue,
  	queue_string: JSON.stringify(queue),
  	candidates: swipes,
  	candidates_string: JSON.stringify(swipes),
    showQueueButton: true,
    numberSwipeCards: numberSwipeCards
  });
  
};