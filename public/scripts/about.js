setTimeout(function() {
  $(window).scrollTop(0);
  $('.container').addClass('loaded');
  $('#content').css('display', 'block');
}, 1000);

$(document).ready(function() {

  setTimeout(function() {
    if(localStorage.div) {
      $(function() {
        $('body').css('overflow-y', 'hidden');
        $('html, body').stop().animate({
            scrollTop: $('.'+localStorage.div).offset().top
        }, 2500, 'easeInOutCubic');
        setTimeout(function() {
          localStorage.div = "";
        }, 2550);
        $('body').css('overflow-y', 'scroll');
        $('.navbar-collapse').collapse('hide');
      })
    }
  }, 1050);

  // Footer
    $('.footer-link').click(function() {
      localStorage.div = $(this).attr('name');
    })

    $('.footer-form').on('submit', function(event) {
      event.preventDefault();

      if ($('.footer-form-email').val() == "") {
        $('.footer-form-message').html("&nbspInvalid email address");
        $('.footer-form-message').css('display', 'block');
      } else {
        $.ajax({
          url: '/',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({email: $('.footer-form-email').val()}),
          success: function(response) {
            $('.footer-form-message-button').click();
          }
        })
      }
    })

    $('.footer-form-message-button').on('click', function(event) {
      $.ajax({
        url: '/error',
        method: 'GET',
        contentType: 'application/json',
        success: function(response) {
          if(response.success == false) {
            $('.footer-form-message').html("&nbsp" + response.messages);
            $('.footer-form-message').css('display', 'block');
          } else {
            $('.footer-form-message').html("&nbspSuccess!");
            $('.footer-form-message').css('color', 'green');
            localStorage.subscribed = "1";
          }
        }
      })
    })

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
    $('.navbar-default').removeClass('hidden', amount_scrolled > prev);
    prev = amount_scrolled;
    return prev;
  }