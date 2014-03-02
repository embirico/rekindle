// This adapted from http://jsbin.com/haweqifu/1/edit

$(document).ready(function () {

  //stick in the fixed 100% height behind the navbar but don't wrap it
  $('#slide-nav.navbar .container').append($('<div id="navbar-height-col"></div>'));

  var TOGGLER_LEFT = '.navbar-toggle';
  var TOGGLER_RIGHT = '.navbar-toggle-right';
  var PAGEWRAPPER = '#page-content';
  var NAV_WRAPPER = '.navbar-header';
  var SIDEBAR_WIDTH = 80;
  var LEFT_EDGE = 0;
  var RIGHT_EDGE = 100;
  var SLIDE_ACTIVE = 'slide-active';


  // Toggle function for left side
  $(TOGGLER_LEFT).click(function (e) {
    var leftSidebarOpen = $(this).hasClass(SLIDE_ACTIVE);
    setLeftSidebarTo(! leftSidebarOpen);
  });


  // Toggle function for right slide
  $(TOGGLER_RIGHT).click(function (e) {
    var rightSidebarOpen = $(this).hasClass(SLIDE_ACTIVE);
    setRightSidebarTo(! rightSidebarOpen);
  })


  // Function to close both sidebars
  // We use native js to use event 'capturing' vs 'bubbling'.
  // Note that this is incompatible with IE<9, which is why JQuery can't do it
  document.getElementById('page-content')
    .addEventListener('mousedown', function (e) {
      if ($(TOGGLER_LEFT).hasClass(SLIDE_ACTIVE)) {
        e.stopPropagation();
        e.preventDefault();
        setLeftSidebarTo(false);
      } else if ($(TOGGLER_RIGHT).hasClass(SLIDE_ACTIVE)) {
        e.stopPropagation();
        e.preventDefault();
        setRightSidebarTo(false);
      }
  }, true);


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

    $(TOGGLER_LEFT).toggleClass(SLIDE_ACTIVE, openIt);
    $('#sidebar-left').toggleClass(SLIDE_ACTIVE);

    $('#page-content, .navbar, body, .navbar-header').toggleClass(SLIDE_ACTIVE);
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

    $(TOGGLER_RIGHT).toggleClass(SLIDE_ACTIVE, openIt);
    $('#sidebar-right').toggleClass(SLIDE_ACTIVE);

    $('#page-content, .navbar, body, .navbar-header').toggleClass(SLIDE_ACTIVE);
  }


  // Simple helper function
  function percent(x) {
    return x + '%';
  }

});