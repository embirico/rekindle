
/*
 * GET the login page
 */

exports.view = function(req, res){
  res.render('tour', {title: 'Rekindle'});
};