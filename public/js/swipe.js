'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
});

var currentCardNumber = 0;
var currentCard;
var currentCardPanel;
var card_html;
var time_interval;

$( window ).resize(function() {
	recalculateHeight();
});

/*
 * Function that is called when the document is ready.
 */
function initializePage() {

	recalculateHeight();

	var minThresh = 10;

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

  	// initalizes the first candidate card
  	initializeFirstCard();
}

/* Initializes the first card to be visible */
function initializeFirstCard() {
	
	// Set the first card to the top
	currentCard = $(".bottom-card").first();
	currentCard.removeClass("bottom-card");
	currentCard.addClass("top-card");
	currentCard.css("display","block");

	// Show next card underneath
	var nextCard = currentCard.next();
	nextCard.css("display","block");
}

function resetCard() {
	// TODO, animate this
	$("#card_container .top-card .card").removeClass("animate-partial animate-dislike-partial animate-like-partial");
	//$("#card_container .top-card .card").addClass("ng-leave");
}

function partialRight() {
	$("#card_container .top-card .card").removeClass("animate-like ng-leave ng-leave-active")
	$("#card_container .top-card .card").removeClass("animate-partial animate-dislike-partial");
	$("#card_container .top-card .card").addClass("animate-partial animate-like-partial");
}

function partialLeft() {
	$("#card_container .top-card .card").removeClass("animate-dislike ng-leave ng-leave-active");
	$("#card_container .top-card .card").removeClass("animate-partial animate-like-partial");
	$("#card_container .top-card .card").addClass("animate-partial animate-dislike-partial");
}

/*clears current card, generates new card*/
function fullLeft() {
	// Remove this card from candidates_json array
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

	time_interval = setInterval(loadNewCard, 100);
}

/*brings up message modal, new card*/
function fullRight() {
	// Remove this card from candidates_json array
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

	// Add the person to the queue_json
	queueJSON.push(swipedCard);
	renderQueue();

	time_interval = setInterval(loadNewCard, 100);
	// TODO, load next card
}

// Using the queueJSON array, rebuilts the queue
function renderQueue() {
	$("#queueIndicator").text(queueJSON.length);
	$("#queueIndicator").animate({
		opacity: "0.5"
	}, 100, function() {
		$(this).animate({
			opacity: "1"
		}, 100);
	}
	);

	// TODO, render out the list of people in the queue
	var queueHtml = '';
	$.each(queueJSON, function(index, friend) {
		queueHtml = queueHtml + '<li class="media">'+
		  '<a href="#">'+
			  '<div class="media">'+
		      '<div class="pull-left media-object queue-card-img img-circle" style="background-image: url(\'' + friend.image + '\');">'+
		      '</div>'+
			   ' <div class="media-body">'+
			   '   <p>' + friend.firstname + ' ' + friend.lastname + '</p>'+
			   ' </div>'+
			  '</div>'+
		  '</a>'+
		'</li>';
		$("#friendList").html(queueHtml);
		});
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

function recalculateHeight() {
	var height = $(window).height();
	var imageHeight = height - 243;
	$(".swipe-card-img").css("height", imageHeight);
	return imageHeight;
}