'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
});

$(window).resize(function() {
	recalculateHeight(true);
});

var currentCardNumber = 0;
var currentCard;
var currentCardPanel;
var card_html;
var time_interval;
var addedToQueue = false;
var addedToStack = false;
var addedToRemoved = false;
/*
 * Function that is called when the document is ready.
 */
function initializePage() {

	var minThresh = 10;

	// Render the stack and queue
	renderStack();
  	renderQueue();

  	$("#card_container").swipe( {
        swipeStatus:function(event, phase, direction, distance, duration, fingers)
        {
          if(distance < 50) {
          		if (phase == "end") resetCard();
          	}
          else if(distance < 100) {
          	if(direction=="left") {
				partialLeft();
          	}
          	else if(direction=="right") {
				partialRight();
          	}
          	if(phase=="end") {
          		resetCard();
          	}
          }
          else {
          	if(direction=="left") {
          		$("#card_container .top-card .card").addClass("animate-dislike ng-leave ng-leave-active");
          		if (phase == "end") fullLeft();
          	}
          	else if(direction=="right") {
          		$("#card_container .top-card .card").addClass("animate-like ng-leave ng-leave-active");
				if (phase == "end") fullRight();
          	}
          }
        },
        threshold: minThresh,
        allowPageScroll: "vertical"
      });

  	window.addEventListener('shake', shakeEventDidOccur, false);

}

// Function to call when shake occurs
function shakeEventDidOccur () {

    // Put your own code here etc.
	if(addedToRemoved) {
		if (confirm("Undo swipe left?")) {
			addedToRemoved = false;
    		var person = removedJSON.shift();
    		candidatesJSON.unshift(person);
    		renderStack();
		}
	} else if(addedToQueue) {
		if (confirm("Undo swipe right?")) {
			addedToQueue = false;
     		var person = queueJSON.shift();
    		candidatesJSON.unshift(person);
    		renderStack();
    		renderQueue();	
		}	
	} else if(addedToStack) {
		if (confirm("Put back into queue?")) {
			addedToStack = false;
        	var person = candidatesJSON.shift();
    		queueJSON.unshift(person);
    		renderStack();
    		renderQueue();
    	}
	}
    
}

function resetCard() {
	// TODO, animate this
	$("#card_container .top-card .card").removeClass("animate-partial animate-dislike-partial animate-like-partial");
}

function partialRight() {
	$("#card_container .top-card .card").removeClass("animate-like ng-leave ng-leave-active");
	$("#card_container .top-card .card").removeClass("animate-partial animate-dislike-partial");
	$("#card_container .top-card .card").addClass("animate-partial animate-like-partial");
}

function partialLeft() {
	$("#card_container .top-card .card").removeClass("animate-dislike ng-leave ng-leave-active");
	$("#card_container .top-card .card").removeClass("animate-partial animate-like-partial");
	$("#card_container .top-card .card").addClass("animate-partial animate-dislike-partial");
}

/* Clears current card, generates new card*/
function fullLeft() {
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

	addedToQueue = false;
	addedToStack = false;
	addedToRemoved = true;

	// TODO, push this action to the server via AJAX
	time_interval = setInterval(loadNewCard, 100);
}


/* Brings up message modal, new card*/
function fullRight() {
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

	// TODO, push this action to the server via AJAX
	// Add the person to the queueJSON
	queueJSON.unshift(swipedCard);
	renderQueue();
	
	addedToQueue = true;
	addedToStack = false;
	addedToRemoved = false;

	time_interval = setInterval(loadNewCard, 100);
}

// Using the queueJSON array, rebuilts the queue HTML
function renderQueue() {
	$("#queueIndicator").text(queueJSON.length);
	$("#queueIndicator").animate({
		opacity: "0.5"
	}, 100, function() {
		$(this).animate({
			opacity: "1"
		}, 100);
	});

	// Render out the list of people in the queue
	if(queueJSON.length == 0) {
		queueHtml = "<p class=\"message\">Nobody in here yet.</p><p class=\"message\">Swipe people you want to keep in touch with to the right to save them here.</p>" +
					"<button id=\"getSwiping\" class=\"btn btn-default\">Get Swiping</button>";
		$("#friendList").html(queueHtml);
		$("#getSwiping").click(function() {
			$("#queueIndicator").click();
		});
	} else {
		var queueHtml = '';
		var queueCardTemplate = $("#queue-card-template").html();
		var compiledTemplate = Handlebars.compile(queueCardTemplate);
		$.each(queueJSON, function(index, friend) {
			queueHtml = queueHtml + compiledTemplate(friend);
			});
		$("#friendList").html(queueHtml);
		initializeQueueLinks();
	}
}

function initializeQueueLinks() {
	// Initialize the queue click listeners
	$(".queue-link").click(function() {
		var personsID = $(this).attr("data-id");
		var personIndex = -1;
		var personObject;
		$.each(queueJSON, function(index, queuedFriend) {
	                if(queuedFriend.id == personsID) {
	                	personObject = queuedFriend;
	                	personIndex = index;
	                }
	            });
		// Remove this person from the queued JSON
		queueJSON.splice(personIndex,1);

		// Add the person to the queueJSON
		candidatesJSON.unshift(personObject);

		addedToQueue = false;
		addedToStack = true;
		addedToRemoved = false;

		// Render queue & stack
		renderStack();
	  	renderQueue();

		// Move back to full page view
		$("#queueIndicator").click();
	});
}

function renderStack() {
	// Render out the list of people in the queue
	var cardsHtml = '';
	$("#card_container").html("");
	var CardTemplate = $("#card-template").html();
	var compiledTemplate = Handlebars.compile(CardTemplate);
	$.each(candidatesJSON, function(index, candidate) {
		cardsHtml = cardsHtml + compiledTemplate(candidate);
		});
	$("#card_container").html(cardsHtml);
	
	// Set the first card to the top
	currentCard = $(".bottom-card").first();
	currentCard.removeClass("bottom-card");
	currentCard.addClass("top-card");
	currentCard.css("display","block");

	// Show next card underneath
	var nextCard = currentCard.next();
	nextCard.css("display","block");

	recalculateHeight(true);
	addComposeListeners();
}

function loadNewCard() {
	// TODO: later do ajax request from server => returns next card set's html
	currentCard.css("display","none");

	// New card becomes top card
	var nextCard = currentCard.next();
	if(nextCard.length > 0) {
		currentCard = nextCard;
		currentCard.removeClass("bottom-card").addClass("top-card");		

		// Set properties of new card on top to default
		currentCard.removeClass('*[class^="animate-"]');
		currentCard.css("display","block");

		// Show the next card hiding under the current one
		nextCard = currentCard.next();
		nextCard.css("display","block");

		clearInterval(time_interval);
	}
	else {
		clearInterval(time_interval);
		alert("No more cards left, show nice message");
	}
}

function recalculateHeight(resize) {
	var height = $(window).height();
	var imageHeight = height - 250;
	if(resize) $("#card_container .swipe-card-image").css("height", imageHeight);
	return imageHeight;
}