var ANIMATION_SPEED = 400;
var navLeftHtml, navRightHtml, navBrandText; // Filled by activateComposeView

function addComposeListeners() {
	$('textarea').bind('focus', activateComposeViewHandler);
}

var activateComposeViewHandler = function(e) {
	textarea = $(this);

	if (textarea.hasClass('compose-active')) {
		return // already in compose view
	}
	else {
		//textarea.blur();
	}

	textarea.addClass('compose-active');

	$('.swipe-nav').hide();
	$('.compose-nav').show();

	$('#card_container').data('swipe_disabled', true);

	$('#compose-back-button').bind('click', deactivateComposeViewHandler);
	$('#compose-send-button').bind('click', sendHandler);

	$('#card_container .swipe-card-image').animate({height: 0}, ANIMATION_SPEED);

	// IDEALLY I WANT TO GROW THE TEXTBOX, BUT THERE ISN'T MUCH SPACE ON THE
	// IPHONE 5
	// textarea.animate({height: '170px'});
	// textarea.animate({height: '73px'});

	// OK SO HAVING SOME ISSUES WITH HAVING TO SCROLL UP MANUALLY ON THE IPHONE
	// AFTER THE RESIZE. (WORKS FINE IN CHROME EMULATOR)
	// THIS IS MY CRAPPY WAY TO FIX THIS
	// NOTE THAT ITS NOT ANIMATED
	setTimeout(function() {
		window.scrollTo(0, 0);
	}, ANIMATION_SPEED);

	/*setTimeout(function() {
		textarea.trigger("click");
		console.log("focus");
	}, 800);*/

	// THIS WAS ANOTHER WAY THAT I THOUGHT TO DO IT, BUT IT DOESN'T WORK
	// $('html, body').delay(1000).scrollTop();
}

var deactivateComposeViewHandler = function(e) {
	if (e) {
		e.preventDefault();
	}

	$('.top-card textarea').removeClass('compose-active');

	$('.compose-nav').hide();
	$('.swipe-nav').show();

	$('#card_container').data('swipe_disabled', false);

	swipeCardImg = $('#card_container .swipe-card-image');
	imageHeight = recalculateHeight(false);
	swipeCardImg.animate({
		height: imageHeight
	}, ANIMATION_SPEED);

	$('#compose-back-button').unbind('click', deactivateComposeViewHandler);
	$('#compose-send-button').unbind('click', sendHandler);
}

// TODO update so we actually send something and update the card
var sendHandler = function(e) {
	e.preventDefault();

	alert("Your message has been sent.");
	$('.top-card textarea').val('');
	deactivateComposeViewHandler(null);
}