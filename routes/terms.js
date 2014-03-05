
/*
 * GET the terms and privacy policy page
 */

exports.terms = function(req, res){
  res.render('privacy-policy', {
  	title: 'Terms and Conditions'
  });
}

exports.privacy = function(req, res){
  res.render('privacy-policy', {
  	title: 'Privacy Policy'
  });
};