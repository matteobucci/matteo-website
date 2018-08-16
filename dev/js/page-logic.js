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

$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();
});

function checkLength()
{
  var maxLenght = 1000;
  var fieldLength = document.getElementById('message').value.length;
  if(fieldLength <= maxLenght){
    document.getElementById("characterLeft").innerText = fieldLength + "/1000";
    return true;
  }
  else
  {
    var str = document.getElementById('message').value;
    str = str.substring(0, str.length - 1);
    document.getElementById('message').value = str;
  }
}

// this is the id of the submit button
$("#contact").submit(function(e) {

  e.preventDefault();

  var url = "contact-send.php"; // the script where you handle the form input.

  $("#submit").removeClass("enabled");
  $("#submit").addClass("disabled");

  $.ajax({
    type: "POST",
    url: url,
    data: $("#contact").serialize(), // serializes the form's elements.
    success: function(data)
    {
      if(data.trim() == "success"){
        $("#success-field").addClass("alert alert-success");
        $("#success-field").html("Message sent! I'll contact you as soon as I can");
      }else{
        $("#submit").removeClass('disabled');
        $("#submit").addClass('enabled')  ;
        $("#success-field").addClass("alert alert-danger");
        $("#success-field").html("Something wrong happened. If it is urgent, please contact me at matteo.bucci.1995@gmail.com");
      }
    }
  });


  return true; // avoid to execute the actual submit of the form.
});

function changeLanguage(){

  var path = window.location.pathname

  if(path.includes("it")){
    window.location.pathname = ""
  }else{
    window.location.pathname = "it"
  }

}
