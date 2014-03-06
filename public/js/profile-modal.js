'use strict';
// var user = require('./user');


$(document).ready(function() {

  $(".back").click(function(e){
      e.preventDefault();
      console.log("clicked!");
      $('#modal').modal('toggle');
  });
  
});

function getPhotos(friendID){
    $('#friend-photo').html("");
    var id = friendID;

    console.log("now in data index: "+ id);
    console.log("id: " +id);

    var photoQuery = "SELECT pid, src_big FROM photo WHERE pid IN (SELECT pid FROM photo_tag WHERE subject='"+id+"' ORDER BY created DESC LIMIT 20) LIMIT 5";
    
    console.log(photoQuery);
    FB.api({
        method: "fql.query",
        query: photoQuery 
      },
      function(response){
        renderPhotos(response);
    });
  }

function renderPhotos(data) {
  if(data.length > 0){
    var photoHTML = "<img src=\"" + data[0].src_big+"\" class=friend-image>";
    
    console.log($('#friend-photo'));
    $('#friend-photo').html(photoHTML);
  } else {
    $('#friend-photo').html("<p>No photos can be found - sorry about that.</p>");
  }
}

function getAbout(friendID){
    // $('#friend-photo').html("");
//     var id = friendID;
  $.get('/getFriendAbout/' + friendID, callbackFn);

  function callbackFn(result){
    var name = result[0].first_name + ' '  + result[0].last_name;
    var birthday = result[0].birthday;
    var location= "&nbsp;" + result[0].location;
    var fbURL = result[0].fb_link;

    $('#friend-name').html(name);
    $('#friend-location').html(location);
    $('#friend-relationship').html();
    
    $('.modal-fb-button').attr('href',fbURL);

    var statusQuery = "SELECT message FROM status WHERE uid="+friendID+" ORDER BY time DESC LIMIT 1";

    FB.api({
        method: "fql.query",
        query: statusQuery 
      },
      function(response){
        renderStatus(response, friendID);
    });
  }
}

function renderStatus(data, friendID) {
  var friendStatus = "\"" + data[0].message + "\"";
  $('#friend-status').html(friendStatus);

  var relationshipQuery = "SELECT relationship_status FROM user WHERE uid IN ("+ friendID+") AND relationship_status";
  FB.api({
        method: "fql.query",
        query: relationshipQuery 
      },
      function(response){
        renderRelationship(response, friendID);
    });
}


function renderRelationship(data, friendID) {
  console.log(data);
  var friendRelationship = "&nbsp;" + data[0].relationship_status;
  $('#friend-relationship').html(friendRelationship);
//let's get relationship stuff in; also checkin
}