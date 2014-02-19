
/*
 * GET the home/intro/login page
 */

exports.view = function(req, res){

  // Load JSON data from static file
  var user_data = require("../user_data.json");
  var queue = user_data.queue;

  res.render('index', {
  	title: 'Rekindle',
  	queue_results: queue
  });
};