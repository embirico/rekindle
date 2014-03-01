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
  $(TOGGLER_LEFT).click(function (e) {
    var leftSidebarOpen = $(this).hasClass('slide-active');
    setLeftSidebarTo(! leftSidebarOpen);
  });


  // Toggle function for right slide
  $(TOGGLER_RIGHT).click(function (e) {
    var rightSidebarOpen = $(this).hasClass('slide-active');
    setRightSidebarTo(! rightSidebarOpen);
  })


  // Function that does the opening and closing for left side
  function setLeftSidebarTo(openIt) {
    $('#sidebar-left').stop().animate({
        left: openIt ? percent(LEFT_EDGE) : percent(-SIDEBAR_WIDTH)
    });
    $('#navbar-height-col').css({
      left: openIt ? percent(-SIDEBAR_WIDTH) : percent(LEFT_EDGE)
    });
    $('#navbar-height-col').stop().animate({
        left: openIt ? percent(LEFT_EDGE) : percent(-SIDEBAR_WIDTH)
    });
    $(PAGEWRAPPER).stop().animate({
        left: openIt ? percent(SIDEBAR_WIDTH) : percent(LEFT_EDGE)
    });
    $(NAV_WRAPPER).stop().animate({
        left: openIt ? percent(SIDEBAR_WIDTH) : percent(LEFT_EDGE)
    });

    $(TOGGLER_LEFT).toggleClass('slide-active', openIt);
    $('#sidebar-left').toggleClass('slide-active');

    $('#page-content, .navbar, body, .navbar-header').toggleClass('slide-active');
  }


  // Function that does the opening and closing for right side
  function setRightSidebarTo(openIt) {
    $('#sidebar-right').stop().animate({
        left: openIt ? percent(RIGHT_EDGE - SIDEBAR_WIDTH) : percent(RIGHT_EDGE)
    });
    $('#navbar-height-col').css({
      left: openIt ? percent(RIGHT_EDGE) : percent(RIGHT_EDGE - SIDEBAR_WIDTH)
    });
    $('#navbar-height-col').stop().animate({
        left: openIt ? percent(RIGHT_EDGE - SIDEBAR_WIDTH) : percent(RIGHT_EDGE)
    });
    $(PAGEWRAPPER).stop().animate({
        left: openIt ? percent(-SIDEBAR_WIDTH) : percent(LEFT_EDGE)
    });
    $(NAV_WRAPPER).stop().animate({
        left: openIt ? percent(-SIDEBAR_WIDTH) : percent(LEFT_EDGE)
    });

    $(TOGGLER_RIGHT).toggleClass('slide-active', openIt);
    $('#sidebar-right').toggleClass('slide-active');

    $('#page-content, .navbar, body, .navbar-header').toggleClass('slide-active');
  }


  // Simple helper function
  function percent(x) {
    return x + '%';
  }

});