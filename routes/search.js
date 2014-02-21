
/*
 * GET the search page
 */

exports.view = function(req, res){
	// Check for query
	var searchWords = req.query.search

  	res.render('search',{
  		title: 'Search',
  		search: searchWords
  	});
};

exports.getAutocompleteJSON = function(req, res) {

  var user_data = require("../user_data.json");
  var autocompleteArray = user_data.candidates;
  var autocompleteJSON = [];
  for(var i = 0; i < autocompleteArray.length; i++) {
    var text = autocompleteArray[i].first_name + " " + autocompleteArray[i].last_name;
    autocompleteJSON.unshift({name: text, id: autocompleteArray[i].id});
  }
  res.send(autocompleteJSON);

};