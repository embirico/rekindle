
/*
 * GET the login page
 */

exports.view = function(req, res){
  res.render('login', {title: 'Rekindle'});
};