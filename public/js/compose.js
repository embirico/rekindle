var ANIMATION_SPEED = 400;

$(document).ready(function () {
	$('textarea').focus(activateComposeView);
});

function activateComposeView(e) {
	// e.preventDefault();
	textarea = $(this);

	if (textarea.hasClass('compose-active')) {
		return // already in compose view
	}

	textarea.addClass('compose-active');

	$('.swipe-card-img').animate({height: 0}, ANIMATION_SPEED);

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

	// THIS WAS ANOTHER WAY THAT I THOUGHT TO DO IT, BUT IT DOESN'T WORK
		// $('html, body').delay(1000).scrollTop();
}

// when message:
// change nav functionality
