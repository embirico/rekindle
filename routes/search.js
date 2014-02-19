
/*
 * GET the search page
 */

exports.view = function(req, res){
  res.render('search',{title: 'Search'});
};