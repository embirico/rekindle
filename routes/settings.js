
/*
 * GET the settings page
 */

exports.view = function(req, res){
  res.render('settings',{title: 'Settings'});
};