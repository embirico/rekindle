// This adapted from http://jsbin.com/haweqifu/1/edit

$(document).ready(function () {

  //stick in the fixed 100% height behind the navbar but don't wrap it
  $('#slide-nav.navbar .container').append($('<div id="navbar-height-col"></div>'));

  // Enter your ids or classes
  var TOGGLER_LEFT = '.navbar-toggle';
  var TOGGLER_RIGHT = '.navbar-toggle-right';
  var PAGEWRAPPER = '#page-content';
  var NAV_WRAPPER = '.navbar-header';
  var SIDEBAR_WIDTH = 80;
  var LEFT_EDGE = 0;
  var RIGHT_EDGE = 100;


  // Toggle function for left side
  $("#slide-nav").on("click", TOGGLER_LEFT, function (e) {
    var isActive = $(TOGGLER_LEFT).hasClass('slide-active');

    $('#sidebar-left').stop().animate({
        left: isActive ? percent(-SIDEBAR_WIDTH) : percent(LEFT_EDGE)
    });
    $('#navbar-height-col').css({
      left: isActive ? percent(LEFT_EDGE) : percent(-SIDEBAR_WIDTH)
    });
    $('#navbar-height-col').stop().animate({
        left: isActive ? percent(-SIDEBAR_WIDTH) : percent(LEFT_EDGE)
    });
    $(PAGEWRAPPER).stop().animate({
        left: isActive ? percent(LEFT_EDGE) : percent(SIDEBAR_WIDTH)
    });
    $(NAV_WRAPPER).stop().animate({
        left: isActive ? percent(LEFT_EDGE) : percent(SIDEBAR_WIDTH)
    });

    $(TOGGLER_LEFT).toggleClass('slide-active', !isActive);
    $('#sidebar-left').toggleClass('slide-active');

    $('#page-content, .navbar, body, .navbar-header').toggleClass('slide-active');
  });


  // Toggle function for right side
  $("#slide-nav").on("click", TOGGLER_RIGHT, function (e) {
    var isActive = $(TOGGLER_RIGHT).hasClass('slide-active');

    $('#sidebar-right').stop().animate({
        left: isActive ? percent(RIGHT_EDGE) : percent(RIGHT_EDGE - SIDEBAR_WIDTH)
    });
    $('#navbar-height-col').css({
      left: isActive ? percent(RIGHT_EDGE - SIDEBAR_WIDTH) : percent(RIGHT_EDGE)
    });
    $('#navbar-height-col').stop().animate({
        left: isActive ? percent(RIGHT_EDGE) : percent(RIGHT_EDGE - SIDEBAR_WIDTH)
    });
    $(PAGEWRAPPER).stop().animate({
        left: isActive ? percent(LEFT_EDGE) : percent(-SIDEBAR_WIDTH)
    });
    $(NAV_WRAPPER).stop().animate({
        left: isActive ? percent(LEFT_EDGE) : percent(-SIDEBAR_WIDTH)
    });

    $(TOGGLER_RIGHT).toggleClass('slide-active', !isActive);
    $('#sidebar-right').toggleClass('slide-active');

    $('#page-content, .navbar, body, .navbar-header').toggleClass('slide-active');
  });

  // Simple helper function
  function percent(x) {
    return x + '%';
  }

});