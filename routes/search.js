
/*
 * GET the search page
 */

var user = require('./user');
var models = require('../models');

exports.view = function(req, res){

  // Check session is valid
  userID = user.checkSession(req, res);

	// Check for query
	var searchWords = req.query.search

  	res.render('search',{
  		title: 'Search',
  		search: searchWords
  	});
};

exports.getAutocompleteJSON = function(req, res) {

  // Check session is valid
  userID = user.checkSession(req, res);

  models.Friend
    .find({"owner_id": userID})
    .exec(afterQuery);

  function afterQuery(err, users) {
    if(err) console.log(err);

    var autocompleteJSON = [];
    for(var i = 0; i < users.length; i++) {
      var text = users[i].first_name + " " + users[i].last_name;
      autocompleteJSON.unshift({name: text, id: users[i].id});
    }
    res.send(autocompleteJSON);
  }

};