'use strict';


$(document).ready(function() {
  initializePage();

  $(".back").click(function(e){
      e.preventDefault();
      console.log("clicked!");
      $('#modal').modal('toggle');
  });

  
});



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
