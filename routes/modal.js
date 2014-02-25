
/*
 * AJAX file - this returns pictures data for user
 */

var models = require('../models');

exports.getPhotos = function(req, res){

  // copied from swipe
  // var offset = parseInt(req.body.offset);
  // var numerNewCards = parseInt(req.body.numerNewCards);

  // models.Friend
  //   .find({"owner_id": req.session.userID, "in_queue":0})
  //   .skip(offset)
  //   .limit(numerNewCards)
  //   .exec(afterQuery);

  // function afterQuery(err, users) {
  //   if(err) console.log(err);

  //   res.send(users);
  // }
};