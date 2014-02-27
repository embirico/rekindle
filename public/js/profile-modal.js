'use strict';


$(document).ready(function() {
  initializePage();

  $(".back").click(function(e){
      e.preventDefault();
      console.log("clicked!");
      $('#modal').modal('toggle');
  });

  $(".gimme_photo").click(function(e){
    e.preventDefault();
    console.log("clicked for more photos");
    // getMorePhotoData();
    getPhotos();
  });
  
});

function getPhotos(){
  // for (var i in data){
    var id = 507137790;
    console.log("now in data index: "+ id);
    console.log("id: " +id);

    var photoQuery = "SELECT pid, src_big FROM photo WHERE pid IN (SELECT pid FROM photo_tag WHERE subject='"+id+"' ORDER BY created DESC LIMIT 20) LIMIT 5";
    
    console.log(photoQuery);
    FB.api({
        method: "fql.query",
        query: photoQuery 
      },
      function(response){
        // console.log(response);
        $.post('/savePhotos/'+id, {photos: response}, function(data) {
          window.location.href = '/'; // reload the page
        });
    });

  // }
}


function getMorePhotoData() {
  // var buffer = 4;
  // var numerNewCards = 5;
  var user_id = 100007139738066;     //TODO fix this later!!
  // if(candidatesJSON.length < buffer) {
    //TODO replace photos: response with null?
    $.get('/getPhotos/'+user_id, function(data) {
      console.log(data);
      //data is now this huge array of photo urls!

      renderPhotos();
    });
  // }
}




function renderPhotos() {
  // Render out the list of people in the queue
  // var cardsHtml = '';
  // $("#card_container").html("");
  // $.each(candidatesJSON, function(index, candidate) {
  //   cardsHtml = cardsHtml + compiledCardTemplate(candidate);
  //   });
  // $("#card_container").html(cardsHtml);
  
  // // Set the first card to the top
  // currentCard = $(".bottom-card").first();
  // currentCard.removeClass("bottom-card");
  // currentCard.addClass("top-card");
  // currentCard.css("display","block");

  // // Show next card underneath
  // var nextCard = currentCard.next();
  // nextCard.css("display","block");

  // recalculateHeight(true);
  // addComposeListeners();
}


// function initializePage() {
	//do initializations here
  // window.fbAsyncInit = function() {
  //   FB.init({
  //     appId      : '1377497889172999',
  //     status     : true, // check login status
  //     cookie     : true, // enable cookies to allow the server to access the session
  //     xfbml      : true  // parse XFBML
  //   });


  // FB.getLoginStatus(function(response) {
  //     $("#fb-loading").hide();
  //     if (response.status === 'connected') {
  //       console.log('User is connected');
  //       FB.login(function(){}, {scope: 'user_photos,friends_photos'}); //also user_photos
        
  //     } else {
  //       $("#fb-login").show();
  //       FB.Event.subscribe('auth.login', function(response) {
  //         // nameThat._loggedInHandler(response.authResponse);
  //         console.log("user isn't connected");

  //         FB.login(function(){}, {scope: 'user_photos,friends_photos'}); //also user_photos
  //       });
  //     }
  //   });


    // var photoQuery = "SELECT pid, src_big FROM photo WHERE pid IN (SELECT pid FROM photo_tag WHERE subject='200353' ORDER BY created DESC LIMIT 50) LIMIT 25";
    // FB.api({
    //   method: "fql.query",
    //   query: photoQuery 
    // },
    // function(response) {
    //   console.log("here!");
    //   console.log(response);
    // });

  // };



   // (function(d){
   //   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   //   if (d.getElementById(id)) {return;}
   //   js = d.createElement('script'); js.id = id; js.async = true;
   //   js.src = "//connect.facebook.net/en_US/all.js";
   //   ref.parentNode.insertBefore(js, ref);
   //  }(document));
   
	// //back listener, hides modal



	//go to facebook feature

	// getFriendPhotos();


	//photos carousels 
  
// }

// function getFriendPhotos() {
//   var photoQuery = "SELECT pid, src_big FROM photo WHERE pid IN (SELECT pid FROM photo_tag WHERE subject='200353' ORDER BY created DESC LIMIT 50) LIMIT 25";
// 	FB.api({
// 		method: "fql.query",
// 		query: photoQuery 
// 	},
// 	function(response) {
// 		console.log("here!");
// 		console.log(response);
// 	});
// }
