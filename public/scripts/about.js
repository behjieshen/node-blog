setTimeout(function() {
  $(window).scrollTop(0);
  $('.container').addClass('loaded');
  $('#content').css('display', 'block');
}, 1000);

$(document).ready(function() {

  var window_width = $(window).innerWidth();
  if(window_width > 768) {
    var headerText = document.getElementsByClassName('header-text')[0];
    var body = document.getElementsByTagName("BODY")[0];
    headerText.addEventListener("webkitAnimationEnd", function() {
      setTimeout(function() {
        $('body').css('overflow-y', 'scroll');
        $('.about-us-content-button').click();
      }, 2500);
    })
  }

  // When search icon is clicked in desktop mode
    var innerWidths = $(window).innerWidth();
    var submitIcon = $(".searchbox-icon");
    var inputBox = $(".searchbox-input");
    var searchBox = $(".searchbox");
    var isOpen = false;
    submitIcon.click(function() {
      if (isOpen == false) {
        searchBox.addClass("searchbox-open");
        $('.searchbox-open').css('width', innerWidths + 'px');
        inputBox.focus();
        $('.searchbox-icon, .searchbox-submit').css('background', '#DA6D0D');
        $('.fa-search, .searchbox-submit').css('color', 'white');
        isOpen = true;
      } else {
        $('.searchbox-open').css('width', '0px');
        searchBox.removeClass("searchbox-open");
        inputBox.focusout();
        setTimeout(function() {
          $('.searchbox-icon, .searchbox-submit').css('background', 'white');
          $('.fa-search, .searchbox-submit').css('color', '#EB7C10');
        }, 250)
        isOpen = false;
      }
    });
    submitIcon.mouseup(function() {
      return false;
    });
    searchBox.mouseup(function() {
      return false;
    });
    $(document).mouseup(function() {
      if (isOpen == true) {
        $(".searchbox-icon").css("display", "block");
        submitIcon.click();
      }
    });


  var prev = 0;
  var window_width = $(window).width();
  if(window_width > 768) {
    $('.navbar-default').toggleClass('hidden');
  }
  $(window).scroll(function() {
    var amount_scrolled = $(window).scrollTop();
    if(window_width > 768) {
      prev = toggleNavbarOnScroll(amount_scrolled, prev);
    }
  })
})

// Close search box
  function buttonUp() {
    var inputVal = $(".searchbox-input").val();
    inputVal = $.trim(inputVal).length;
    if (inputVal !== 0) {
      $(".searchbox-icon").css("display", "none");
    } else {
      $(".searchbox-input").val("");
      $(".searchbox-icon").css("display", "block");
    }
  }

$(function() {
  $(document).on('click', 'a.page-scroll', function(event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
          scrollTop: $($anchor.attr('href')).offset().top
      }, 1500, 'easeInOutQuart');
      event.preventDefault();
      $('.navbar-collapse').collapse('hide');
  });
});


// Hide Navbar when scroll down
  function toggleNavbarOnScroll(amount_scrolled, prev) {
    $('.navbar-default').toggleClass('hidden', amount_scrolled > prev);
    prev = amount_scrolled;
    return prev;
  }