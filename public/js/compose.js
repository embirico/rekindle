var ANIMATION_SPEED = 400;
var navLeftHtml, navRightHtml, navBrandText; // Filled by activateComposeView

$(document).ready(function () {
	addComposeListeners();
});

function addComposeListeners() {
	$('textarea').focus(activateComposeView);
	$('#compose-back-button').click(deactivateComposeView);
	$('#compose-send-button').click(send);
}

function activateComposeView(e) {
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

	$('.swipe-card-image').animate({height: 0}, ANIMATION_SPEED);

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

function deactivateComposeView(e) {
	if (e) {
		e.preventDefault();
	}

	textarea.removeClass('compose-active');

	$('.compose-nav').hide();
	$('.swipe-nav').show();

	swipeCardImg = $('.swipe-card-image');
	imageHeight = recalculateHeight();
	swipeCardImg.animate({
		height: imageHeight
	}, ANIMATION_SPEED);
}

// TODO update so we actually send something and update the card
function send(e) {
	e.preventDefault();

	alert($('textarea').val());
	$('textarea').val('');
	deactivateComposeView(null);
}