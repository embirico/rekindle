/*
 * AJAX file - this saves photo data for user
 */

var models = require('../models');


exports.addPhotos = function(req, res){
  var userID = req.params.id;
  var form_data = req.body;

  var photos = form_data.photos;


    // var userID = req.session.userID;
  // if(userID > 0) {

    models.Photo
    .find({"user_id": userID})
    .exec(afterQuery);


    function afterQuery(err, photo) { // this is a callback
      if(err) {console.log(err); res.send(500); }
      // if(photo.length == 0) {
        console.log("here!");
        var photos = req.body.photos;
        
        if(photos){
          for(var i = 0; i < photos.length; i++) {
            console.log("users id: "+ userID);

            console.log("users photo: "+ photos[i].src_big);
            var newPhoto = new models.Photo({
              "user_id": parseInt(userID),
              "photo_url": photos[i].src_big,
            });
            newPhoto.save(afterSaving);
          }

          function afterSaving(err) { // this is a callback
            if(err) {console.log(err); res.send(500); }
            // res.json(photos);   //do we need this?
          }
          res.send(200);
        }
      // } else {
      // res.send(200);
      // }
    }
}

//Calls the callback with the JSON array of friends to swipe


