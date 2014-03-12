$(document).ready(function() {
	tourJSON = [
		{
		imageURL:"/images/tour/Page1.jpg",
		buttonURL:"/images/tour/start.jpg"
		},
		{
		imageURL:"/images/tour/Page2.jpg",
		buttonURL:"/images/tour/next.jpg"
		},
		{
		imageURL:"/images/tour/Page3.jpg",
		buttonURL:"/images/tour/next.jpg"
		},
		{
		imageURL:"/images/tour/Page4.jpg",
		buttonURL:"/images/tour/next.jpg"
		},
		{
		imageURL:"/images/tour/Page5.jpg",
		buttonURL:"/images/tour/seeHow.jpg"
		},
		{
		imageURL:"/images/tour/how1.jpg",
		buttonURL:"/images/tour/next.jpg"
		},
		{
		imageURL:"/images/tour/how2.jpg",
		buttonURL:"/images/tour/next.jpg"
		},
		{
		imageURL:"/images/tour/how3.jpg",
		buttonURL:"/images/tour/next.jpg"
		},
		{
		imageURL:"/images/tour/how4.jpg",
		buttonURL:"/images/tour/next.jpg"
		},
		{
		imageURL:"/images/tour/how5.jpg",
		buttonURL:"/images/tour/getStarted.jpg"
		}
	];

	var index = 0;
	var backgroundImage =  tourJSON[index].imageURL;
	var buttonImage = tourJSON[index].buttonURL;
	$("body").css("background-image",'url('+backgroundImage+')');
	$("#tour-nav").find("img").attr('src', buttonImage);

	$("#tour-nav").on("click", function() {
		if(index == tourJSON.length-1) {
			window.location = "/login";
		} else  {
			index = index + 1;
			var backgroundImage =  tourJSON[index].imageURL;
			var buttonImage = tourJSON[index].buttonURL;
			$("body").css("background-image",'url('+backgroundImage+')');
			$("#tour-nav").find("img").attr('src', buttonImage);
		}
	});

});