
/*
 * GET the search page
 */

var models = require('../models');

exports.view = function(req, res){
	// Check for query
	var searchWords = req.query.search

  	res.render('search',{
  		title: 'Search',
  		search: searchWords
  	});
};

exports.getAutocompleteJSON = function(req, res) {

  models.Friend
    .find({"owner_id": req.session.userID})
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