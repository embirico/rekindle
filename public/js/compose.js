var ANIMATION_SPEED = 400;
var navLeftHtml, navRightHtml, navBrandText; // Filled by activateComposeView
var originalPlaceholderText;

function addComposeListeners() {
	$('textarea').bind('focus', activateComposeViewHandler);
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

	$('#compose-back-button').bind('click', deactivateComposeViewHandler);
	$('#compose-send-button').bind('click', sendHandler);

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
	console.log(imageHeight);

	var topCard = $('.top-card');
	topCard.find('.swipe-card-image')
		.animate({height: imageHeight}, ANIMATION_SPEED);
	topCard.next().find('.swipe-card-image')
		.animate({height: imageHeight}, ANIMATION_SPEED);

	$('#compose-back-button').unbind('click', deactivateComposeViewHandler);
	$('#compose-send-button').unbind('click', sendHandler);
}

// TODO update so we actually send something and update the card
var sendHandler = function(e) {
	e.preventDefault();

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
	$('.top-card textarea').val('');
	deactivateComposeViewHandler(null);
}