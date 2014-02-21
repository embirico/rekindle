
/*
 * AJAX file - this returns more people data for swiping
 */

var models = require('../models');

exports.getMore = function(req, res){

	// Get offset from client-side
	var offset = parseInt(req.body.offset);
	var numerNewCards = parseInt(req.body.numerNewCards);

	models.Friend
    .find({"owner_id": req.session.userID, "in_queue":0})
    .skip(offset)
    .limit(numerNewCards)
    .exec(afterQuery);

  function afterQuery(err, users) {
    if(err) console.log(err);

		res.send(users);
	}
};