
var autocompleteJSON = null;

$(document).ready(function () {

	$.getJSON("/autocomplete.json", function(data) {
		autocompleteJSON = data;
	});

	// instantiate the bloodhound suggestion engine
	var numbers = new Bloodhound({
	  datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.name); },
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/autocomplete.json'
	});
	 
	// initialize the bloodhound suggestion engine
	numbers.initialize();

	$('#search-input').typeahead({
	  minLength: 2,
	  highlight: true,
	  autoselect: true
	},
	{
	  displayKey: 'name',
	  autoselect: true,
  	  source: numbers.ttAdapter()
	});

	$("#search-input").on("typeahead:closed", function(object, data) {
		heap.track('UseAutocomplete');
		console.log("closed");
		console.log($("#search-input").typeahead('val'));
		$.each(autocompleteJSON, function(index, friend) {
			if(friend.name.toUpperCase() == $("#search-input").typeahead('val').toUpperCase()) {
				addFriendFromSearchToStack(friend.id);
			}
		});
	});
});


/*

*/
function addFriendFromSearchToStack(friendID) {
	$.post('/getFriend', {id: friendID}, function(personObject) {

		console.log(personObject.id);
		// Check if person is already in the stack, remove them if they are
		var swipedIndex = -1;
		$.each(candidatesJSON, function(index, candidate) {
					console.log("c:"+candidate.id);
	                if(candidate.id == personObject.id) {
	                	swipedIndex = index;
	                	console.log("Found in stack at index:"+swipedIndex);
	                }
	            });
		if(swipedIndex >= 0) {
			console.log("Removing from stack");
			candidatesJSON.splice(swipedIndex,1);
		}

		// Check if person is in the queue, remove them if they are
		var swipedIndex = -1;
		$.each(queueJSON, function(index, queueFriend) {
	                if(queueFriend.id == personObject.id) {
	                	swipedIndex = index;
	                	console.log("Found in queue");
	                }
	            });
		if(swipedIndex >= 0) {
			console.log("Removing from queue");
			queueJSON.splice(swipedIndex,1);
			renderQueue();
		}

		// Add new person to the stack
    	candidatesJSON.unshift(personObject);
    	renderStack();

    	//setTimeout(animateStack, 500);
    	//$("#menu-button").focus();
    	$("#search-input").blur();
        $('#search-input').typeahead('val', '');
        addedToQueue = false;
		addedToStack = false;
		addedToRemoved = false;
		removedFromStack = false;

		$("#menu-button").click();
	});
}

/*
Animates the top card
*/
function animateStack() {
	// TODO
	var topCard = $(".top-card");
	/*var currentHeight = topCard.height();
	var currentWidth = topCard.width();
	topCard.animate({
		height: currentHeight+10,
		width: currentWidth+10
	}, 100, function() {
		$(this).animate({
			height: currentHeight,
			width: currentWidth
		}, 100);
	});*/
}