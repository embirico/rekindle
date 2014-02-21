
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

	$('#search-input').on("typeahead:selected", function(data) {
		$("#search-button").click();
	})

});