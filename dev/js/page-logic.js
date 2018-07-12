(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#sideNav'
  });

  var documentHeight = $(document).height();
  var windowHeight = $(window).height();
  var scrollTop = $(window).scrollTop();

  //Every time the window is scrolled
  $(window).scroll(function() {

      scrollTop = $(window).scrollTop();
      var scrollPercent = (scrollTop) / (documentHeight - windowHeight) -0.5; //gives us the scroll percent range from 0 to 1
      $("#sideNavContainer").css({"transform" : "skewX("+ -8*scrollPercent +"deg) translateX(-9rem)"});


      $('.hideme').each( function(i){

          var bottom_of_object = $(this).position().top + $(this).outerHeight();
          var bottom_of_window = $(window).scrollTop() + $(window).height();

          var object_height = $(this).height();
          var top_of_object = bottom_of_object-object_height;

          /* If the object is completely visible in the window, fade it it */
          if( bottom_of_window - (windowHeight/3) > top_of_object){

              $(this).animate({'opacity':'1'},300);

          }

      });



  });
})(jQuery); // End of use strict
