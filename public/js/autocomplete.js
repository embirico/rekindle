
$(document).ready(function () {

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
	},
	{
	  displayKey: 'name',
  	  source: numbers.ttAdapter()
	});

	$('#search-input').on("typeahead:selected", function(object, data) {
		// Get the person's data from the server
		$.post('/getFriend', {id: data.id}, function(personObject) {
	    	candidatesJSON.unshift(personObject);
	    	renderStack();
	    	setTimeout(animateStack,500);
	        $("#menu-button").click();
	        $('#search-input').typeahead('val', '');
	        addedToQueue = false;
			addedToStack = false;
			addedToRemoved = false;
	      });
	})

});


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