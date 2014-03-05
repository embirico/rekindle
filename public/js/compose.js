var ANIMATION_SPEED = 400;
var navLeftHtml, navRightHtml, navBrandText; // Filled by activateComposeView
var originalPlaceholderText;

function addComposeListeners() {
	$('textarea').bind('focus', activateComposeViewHandler);
	$('#compose-back-button').bind('click', deactivateComposeViewHandler);
	$('#compose-send-button').bind('click', sendHandler);
}

var activateComposeViewHandler = function(e) {
	textarea = $(this);

	if (textarea.hasClass('compose-active')) {
		return // already in compose view
	}

	textarea.addClass('compose-active');
	originalPlaceholderText = textarea.attr('placeholder');
	textarea.attr('placeholder', textarea.attr('compose-mode-placeholder'));

	$('.swipe-nav').hide();
	$('.compose-nav').show();

	$('#card_container').data('swipe_disabled', true);


	var topCard = $('.top-card');
	topCard.find('.swipe-card-image')
		.animate({height: 0}, ANIMATION_SPEED);
	topCard.next().find('.swipe-card-image')
		.animate({height: 0}, ANIMATION_SPEED);

	// OK SO HAVING SOME ISSUES WITH HAVING TO SCROLL UP MANUALLY ON THE IPHONE
	// AFTER THE RESIZE. (WORKS FINE IN CHROME EMULATOR)
	// THIS IS MY CRAPPY WAY TO FIX THIS
	// NOTE THAT ITS NOT ANIMATED
	setTimeout(function() {
		window.scrollTo(0, 0);
	}, ANIMATION_SPEED);

}

var deactivateComposeViewHandler = function(e) {
	if (e) {
		e.preventDefault();
	}

	$('.top-card textarea').removeClass('compose-active');
	textarea.attr('placeholder', originalPlaceholderText);

	$('.compose-nav').hide();
	$('.swipe-nav').show();

	$('#card_container').data('swipe_disabled', false);

	imageHeight = recalculateHeight(false);

	var topCard = $('.top-card');
	topCard.find('.swipe-card-image')
		.animate({height: imageHeight}, ANIMATION_SPEED);
	topCard.next().find('.swipe-card-image')
		.animate({height: imageHeight}, ANIMATION_SPEED);
}

// TODO update so we actually send something and update the card
var sendHandler = function(e) {
	e.preventDefault();

	// Send the message

	// FB.ui({
	//   method: 'send',
	//   link: 'http://developers.facebook.com/docs/reference/dialogs/send/',
	// });

 // FB.ui({ method: 'feed',
 //    message: 'soemth',
 //    name: 'name',
 //    link: 'http://developers.facebook.com/docs/reference/dialogs/send/',
 //    picture: 'http://cdn.cutestpaw.com/wp-content/uploads/2011/11/cute-cat-l.jpg',
 //    caption: 'caption',
 //    description: 'desc',
 //    display: 'touch', // TAKE NOTE
 //    redirect_uri: 'localhost:3000'
 // });

	alert("Your message has been sent.");

	// Deactive compose mode

	$('.top-card textarea').val('');
	deactivateComposeViewHandler(null);

	// Update server and client data

	// Remove this card from candidatesJSON array
	var swipedCard;
	var swipedIndex = -1;
	$.each(candidatesJSON, function(index, candidate) {
    if(candidate.id == currentCard.attr("data-id")) {
    	swipedCard = candidate;
    	swipedIndex = index;
    }
  });
	candidatesJSON.splice(swipedIndex,1);
	removedJSON.unshift(swipedCard);

	// Push this action to the server via AJAX
	$.post('/updateSwipes', {action: "sendMessage", id: swipedCard.id}, function(data) {
    console.log("sendMessage sent to server");
  });


	addedToQueue = false;
	addedToStack = false;
	addedToRemoved = true;

	// Get new card

	time_interval = setInterval(loadNewCard, 100);
}