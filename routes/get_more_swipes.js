
/*
 * AJAX file - this returns more people data for swiping
 */

exports.getMore = function(req, res){

	// Get offset from client-side
	var offset = parseInt(req.body.offset);
	var numerNewCards = parseInt(req.body.numerNewCards);
	var endIndex = offset + numerNewCards;

	// Load JSON data from static file
	var user_data = require("../user_data.json");
	var swipes = user_data.candidates.slice(offset, endIndex);

	res.send(swipes);
};