
/*
 * GET the login page
 */

exports.view = function(req, res){

  // If they haven't seen the tour yet, show them the tour
  if(typeof req.cookies.seenTour == 'undefined') {
  	res.cookie('seenTour', true);
    res.redirect("/tour");
  }

  res.render('login', {title: 'Rekindle'});
};