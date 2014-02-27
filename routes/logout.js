
/*
 * GET the logout page
 */

var user = require('./user');

exports.view = function(req, res){

  // Check session is valid
  userID = user.checkSession(req, res);

  res.render('logout', {
  	title: 'Logout'
  });
};