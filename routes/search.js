
/*
 * GET the search page
 */

exports.view = function(req, res){
	// Check for query
	var q = req.query.q

  	res.render('search',{
  		title: 'Search',
  		search: q
  	});
};