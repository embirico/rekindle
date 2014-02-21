
/*
 * GET the logout page
 */

exports.view = function(req, res){
  res.render('logout', {
  	title: 'Logout'
  });
};