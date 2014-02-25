
/*
 * GET the settings page
 */

var user = require('./user');

exports.view = function(req, res){

  // Check session is valid
  userID = user.checkSession(req, res);

  res.render('settings', {
  	title: 'Settings'
  });
};