'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
});

$(window).resize(function() {
	recalculateHeight(true);
});

var currentCard;
var time_interval;
var addedToQueue = false;
var addedToStack = false;
var addedToRemoved = false;
var removedFromStack = false;
var compiledQueueTemplate;
var compiledCardTemplate;
var isAlternateView;

/*

*/
function addModalListener() {
	$(".show-modal").click(function(e){
		heap.track('ViewModal');
		var friendID = $(this).parents(".swipe-card").data("id");
		console.log(friendID);
  		e.preventDefault();
  		// console.log("clicked!");
  		$('#modal').modal('toggle');
  		getPhotos(friendID);
  		getAbout(friendID);
  	});
}

/*
 * Function that is called when the document is ready.
 */
function initializePage() {

	// Compile handlebars templates for speed
	var queueCardTemplate = $("#queue-card-template").html();
	compiledQueueTemplate = Handlebars.compile(queueCardTemplate);
	var CardTemplate = $("#card-template").html();
	compiledCardTemplate = Handlebars.compile(CardTemplate);
	isAlternateView = $("#alternate-view-toggle").attr("data") == 'true';

	var minThresh = 10;

	// Render the stack and queue
	renderStack();
  	renderQueue();

  	$("#card_container").data('swipe_disabled') == false;
  	$("#card_container").swipe( {
        swipeStatus:function(event, phase, direction, distance, duration, fingers)
        {
        	if($(this).data('swipe_disabled')) return;
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
        threshold: minThresh
      });

  	window.addEventListener('shake', shakeEventDidOccur, false);

  	$("#queue-back-link").click(function() {
  		$("#queueIndicator").click();
  	});

}

// Function to call when shake occurs
function shakeEventDidOccur () {

	heap.track('Shake!');

	if(addedToRemoved) {
		if (confirm("Undo swipe left?")) {
			addedToRemoved = false;
    		var person = removedJSON.shift();
    		candidatesJSON.unshift(person);
    		renderStack();
    		// Push this action to the server via AJAX
			$.post('/updateSwipes', {action: "undoSwipeLeft", id: person.id}, function(data) {
		        console.log("swipe left sent to server");
		      });
		}
	} else if(addedToQueue) {
		if (confirm("Undo swipe right?")) {
			addedToQueue = false;
     		var person = queueJSON.shift();
    		candidatesJSON.unshift(person);
    		renderStack();
    		renderQueue();
    		// Push this action to the server via AJAX
			$.post('/updateQueue', {action: "remove", id: person.id}, function(data) {
		        console.log("added to queue on server");
		      });
		}
	} else if(addedToStack) {
		if (confirm("Put back into to message later?")) {
			addedToStack = false;
        	var person = candidatesJSON.shift();
    		queueJSON.unshift(person);
    		renderStack();
    		renderQueue();
    		// Push this action to the server via AJAX
			$.post('/updateQueue', {action: "add", id: person.id}, function(data) {
		        console.log("added to queue on server");
		      });
    	}
	} else if(removedFromStack) {
		if (confirm("Put back into to message later?")) {
			removedFromStack = false;
			var person = removedJSON.shift();
			queueJSON.unshift(person);
			renderQueue();
			// Push this action to the server via AJAX
			$.post('/updateQueue', {action: "undelete", id: person.id}, function(data) {
		        console.log("deleted from queue on server");
		      });
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

	// Push this action to the server via AJAX
	$.post('/updateSwipes', {action: "swipeLeft", id: swipedCard.id}, function(data) {
        console.log("swipe left sent to server");
      });


	addedToQueue = false;
	addedToStack = false;
	addedToRemoved = true;
	removedFromStack = false;

	time_interval = setInterval(loadNewCard, 100);

	heap.track('SwipeLeft');

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

	// Push this action to the server via AJAX
	$.post('/updateQueue', {action: "add", id: swipedCard.id}, function(data) {
        console.log("added to queue on server");
      });

	// Add the person to the queueJSON
	queueJSON.unshift(swipedCard);
	renderQueue();

	addedToQueue = true;
	addedToStack = false;
	addedToRemoved = false;
	removedFromStack = false;

	time_interval = setInterval(loadNewCard, 100);

	heap.track('SwipeRight');

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
		queueHtml = "<p class=\"message\">Nobody in here yet.</p><p class=\"message\">Want to keep in touch with someone? Swipe them to the right to save them here.</p>" +
					"<button id=\"getSwiping\" class=\"btn btn-default\">Ok got it, let's swipe!</button>";
		$("#friendList").html(queueHtml);
		$("#getSwiping").click(function() {
			$("#queueIndicator").click();
		});
	} else {
		var queueHtml = '';
		$.each(queueJSON, function(index, friend) {
			queueHtml = queueHtml + compiledQueueTemplate(friend);
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

		// Add the person to the swipeJSON
		candidatesJSON.unshift(personObject);

		// Push this action to the server via AJAX
		$.post('/updateQueue', {action: "remove", id: personObject.id}, function(data) {
	        console.log("added to queue on server");
	      });

		addedToQueue = false;
		addedToStack = true;
		addedToRemoved = false;
		removedFromStack = false;

		// Render queue & stack
		renderStack();
	  	renderQueue();

		// Move back to full page view
		$("#queueIndicator").click();

		heap.track('ClickFriendInQueue');

	});

	// Initialize delete from queue links
	$(".delete-queue-link").click(function() {
		var personsID = $(this).attr("data-id");
		console.log("Remove id:"+personsID);
		var personIndex = -1;
		var personObject;
		$.each(queueJSON, function(index, queuedFriend) {
	                if(queuedFriend.id == personsID) {
	                	personObject = queuedFriend;
	                	personIndex = index;
	                }
	            });
		// Remove this person from the queued JSON
		removedJSON.unshift(personObject);
		queueJSON.splice(personIndex,1);

		addedToQueue = false;
		addedToStack = false;
		addedToRemoved = false;
		removedFromStack = true;

	  	renderQueue();

	  	heap.track('DeleteFriendFromQueue');

		// Push this action to the server via AJAX
		$.post('/updateQueue', {action: "delete", id: personObject.id}, function(data) {
	        console.log("deleted from queue on server");
	      });
	});

}

function renderStack() {
	// Render out the list of people in the queue
	var cardsHtml = '';
	$.each(candidatesJSON, function(index, candidate) {
		var context = candidate;
		context['isAlternateView'] = isAlternateView;
		cardsHtml = cardsHtml + compiledCardTemplate(context);
		});
	$("#card_container").html(cardsHtml);

	addModalListener();

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

	// Check to see if we need to request more swipe cards from the server
	getMoreSwipeData();

}

function getMoreSwipeData() {
	var buffer = 4;
	var numerNewCards = 5;

	if(candidatesJSON.length < buffer) {
		$.post('/getSwipes', {offset: swipeCardIndex, numerNewCards: numerNewCards}, function(data) {
			console.log(data);
			swipeCardIndex = swipeCardIndex + numerNewCards;
			candidatesJSON = candidatesJSON.concat(data);
			renderStack();
		});
	}
}

function recalculateHeight(resize) {
	var height = $(window).height();
	var imageHeight = height - 250;
	if(resize) $("#card_container .swipe-card-image").css("height", imageHeight);
	return imageHeight;
}