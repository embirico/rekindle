
/*
 * AJAX file - this is posted to each time user makes a swipe or queue action
 * It saves the action in logs and also updates the stack and queue arrays
 */

exports.view = function(req, res){
	// TODO save data - update queue and stack arrays accordingly

	var data = {"worked": true};

	res.send(data);
};