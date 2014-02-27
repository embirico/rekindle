'use strict';


$(document).ready(function() {
  initializePage();

  $(".back").click(function(e){
      e.preventDefault();
      console.log("clicked!");
      $('#modal').modal('toggle');
  });

  /*$(".gimme_photo").click(function(e){
    e.preventDefault();
    console.log("clicked for more photos");
    // getMorePhotoData();
    getPhotos();
  });*/
  
});

function getPhotos(friendID){
  // for (var i in data){

    //var id = 507137790;
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
        console.log("here now");
        // console.log(response);
        // getMorePhotoData();
        renderPhotos(response);
        // $.post('/savePhotos/'+id, {photos: response}, function(data) {
          // window.location.href = '/'; // reload the page
        // });
    });

  // }
}


// function getMorePhotoData() {
//   // var buffer = 4;
//   // var numerNewCards = 5;
//   var user_id = $(".top-card .swipe-card").data("id");
//   // var user_id = 100007139738066;     //TODO fix this later!!
//   console.log(user_id);
//   // if(candidatesJSON.length < buffer) {
//     //TODO replace photos: response with null?
//     $.get('/getPhotos/'+user_id, function(data) {
//       // console.log(data);
//       //data is now this huge array of photo urls!

//       renderPhotos(data);
//     });
//   // }
// }




function renderPhotos(data) {
  if(data.length > 0){
    var photoHTML = "<img src=\"" + data[0].src_big+"\" class=friend-image>";
    console.log(photoHTML);
    console.log($('#friend-photo'));
    $('#friend-photo').html(photoHTML);
  } else {
    $('#friend-photo').html("<p>No photos can be found - sorry about that.</p>");
  }
  // document.getElementByID("friend-photo").appendChild(html);
  
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
