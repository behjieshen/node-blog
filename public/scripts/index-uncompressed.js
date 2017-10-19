setTimeout(function() {
  $('.container').addClass('loaded');
  $('#content').css('display', 'block');
}, 1000);

$(document).ready(function() {

  $(window).on('beforeunload', function() {
    $(window).scrollTop(0);
  });

  // Infinite Loop of Carousel
  setInterval(function() {
      if ($('.progress .middle-bar').css('width') == '35px') {
        $('.progress .middle-bar').css('width', '0%');
      }
      else if ($('.progress .last-bar').css('width') == '35px') {
        $('.progress .last-bar').css('width', '0%');
      }
      else if($('.progress .first-bar').css('width') == '35px') {
        $('.progress .first-bar').css('width', '0%');
      }
      $(".active .progress .progress-bar").css('width', '100%');
  })

  var tags = true;
  $('.find-articles-authors-button').click(function() {
    if(tags) {
      $('.find-articles-authors-section').css('display', 'flex');
      $('.find-articles-tags-section').css('display', 'none');
      $(this).addClass('find-articles-button-active');
      $('.find-articles-tags-button').removeClass('find-articles-button-active');
      tags = false;
    }
  })

  $('.find-articles-tags-button').click(function() {
    if(tags == false) {
      $('.find-articles-tags-section').css('display', 'flex');
      $('.find-articles-authors-section').css('display', 'none');
      $(this).addClass('find-articles-button-active');
      $('.find-articles-authors-button').removeClass('find-articles-button-active');
      tags = true;
    }
  })

  var window_width = $(window).width();
  $('.find-articles-tags-container, .find-articles-authors-container').css('height', window_width / 2);
  $(window).resize(function() {
    var window_width = $(window).width();
    $('.find-articles-tags-container, .find-articles-authors-container').css('height', window_width / 2);
  })





  $('#newsletter').on('submit', function(event) {
    event.preventDefault();

    if($('#newsletter-checkbox').is(':checked') == false) {
      $('.newsletter-error-message').html("&nbspPlease tick the box below");
      $('.newsletter-error').css('display', 'block');
      $('.newsletter .newsletter-modal-dialog').css('height', '322px');
      shakeModal();
    } else if ($('#newsletter-email').val() == "") {
      $('.newsletter-error-message').html("&nbspInvalid email address");
      $('.newsletter-error').css('display', 'block');
      $('.newsletter .newsletter-modal-dialog').css('height', '322px');
      shakeModal();
    } else {
      $.ajax({
        url: '/',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({email: $('#newsletter-email').val()}),
        success: function(response) {
          $('.error').click();
        }
      })
    }

  })
  $('.error').on('click', function(event) {
    $.ajax({
      url: '/error',
      method: 'GET',
      contentType: 'application/json',
      success: function(response) {
        if(response.success == false) {
          $('.newsletter-error-message').html("&nbsp" + response.messages);
          $('.newsletter-error').css('display', 'block');
          $('.newsletter .newsletter-modal-dialog').css('height', '284px');
          shakeModal();
        } else {
          $('.newsletter-error-message').html("&nbspSuccess!");
          $('.newsletter-error-icon').removeClass('fa-times');
          $('.newsletter-error-icon').addClass('fa-check');
          $('.newsletter-error-icon, .newsletter-error-message').css('color', 'green');
          setTimeout(function() {
            $('.close-button').click();
          }, 2000);
          localStorage.subscribed = "1";
        }
      }
    })
  })


  var flex_spread_item_height = $('.featured-card-item').height() + 15 + 'px';

  var window_height = $(window).height();
  var window_width = $(window).width();

  spreadModification(window_width);

  var newsletter_popped_up = false;
  var prev = 0;
  $(window).scroll(function() {
    var amount_scrolled = $(window).scrollTop();
    if(window_width > 768) {
      if(amount_scrolled > window_height) {
        prev = toggleNavbarOnScroll(amount_scrolled, prev);
      }
      if(amount_scrolled > window_height && newsletter_popped_up == false) {
        newsletter_popped_up = promptNewsletter();
      }
    } else {
      if(amount_scrolled > window_height && newsletter_popped_up == false) {
        newsletter_popped_up = promptNewsletter();
      }
    }
  })

  // Dynamic Newsletter Positioning (Responsive)
    var margin_top_for_newsletter = (window_height - 206) / 2;
    $('.newsletter .newsletter-modal-dialog').css('margin-top', margin_top_for_newsletter);
    if(window_width < 365) {
      $('.modal-content').css('padding', '0px');
    } else {
      $('.modal-content').css('padding', '0 20px');
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
        $('.searchbox-search-icon, .searchbox-submit').css('color', 'white');
        isOpen = true;
      } else {
        $('.searchbox-open').css('width', '0px');
        searchBox.removeClass("searchbox-open");
        inputBox.focusout();
        setTimeout(function() {
          $('.searchbox-icon, .searchbox-submit').css('background', 'white');
          $('.searchbox-search-icon, .searchbox-submit').css('color', '#EB7C10');
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

  var transparent = true;

  // Resize functionality
    $(window).resize(function() {
      innerWidths = $(window).innerWidth();
      var window_height = $(window).height();
      var window_width = $(window).width();

      // Navbar Changes when scrollTop exceeds window height
        if(window_width < 768) {
          if( $(this).scrollTop() >= $(window).height() ) {
            $('.navbar-img').css('width', '35px');
            if(transparent) {
              transparent = false;
              showNavbar();
            }
          } else {
            var logo_padding_left = ($(window).width() - 60) / 2;
            $('.navbar-logo').css('padding-left', logo_padding_left + 'px');
            if( !transparent ) {
              hideNavbar();
              transparent = true;
            }
          }
        } else {
          if( $(this).scrollTop() >= $(window).height() + 5 ) {
            $('.navbar-img').css('width', '40px');
            if(transparent) {
              transparent = false;
              showNavbar();
            }
          } else {
            var logo_width = ($(window).width() - 60) / 2;
            $('.navbar-logo').css('padding-left', logo_width + 'px');
            if( !transparent ) {
              transparent = true;
              hideNavbar();
            }
          }
        }

      var margin_top_for_newsletter = (window_height - 206) / 2;
      $('.newsletter .newsletter-modal-dialog').css('margin-top', margin_top_for_newsletter);
      if(window_width < 365) {
        $('.modal-content').css('padding', '0px');
      } else {
        $('.modal-content').css('padding', '0 20px');
      }
      var top = window_height / 100 * 46;
      $('.carousel-indicators').css('top', top + 'px');

      $('.seperator-line').css('width', $('.post-container').width() - 60 + 'px');
      spreadModification(window_width);
    })

  // Scroll Transitions
    var scrolled = false;
    var scrolled2 = false;
    $(document).scroll(function() {
      // Color Transitions
        var window_height = $(window).height();
        var window_width = $(window).width();
        var amount_scrolled = $(window).scrollTop();
        if(window_width > 768) {
          if(amount_scrolled > 0 && scrolled == false) {
            $(".blog-hyperlink")[0].click();
            scrolled = true;
            setTimeout(function() {
              $('.color-transition').css('display', 'none');
              $('.color-transition2').css('display', 'none');
              $('body').css('overflow-y', 'scroll');
            }, 2700);
          }
        }


      // Navbar Changes when scrollTop exceeds window height
        if(window_width < 768) {
          if( $(this).scrollTop() >= $(window).height() ) {
            if(transparent) {
              transparent = false;
              showNavbar();
            }
          } else {
            if( !transparent ) {
              hideNavbar();
              transparent = true;
            }
          }
        } else {
          if( $(this).scrollTop() >= $(window).height() + 5 ) {
            if(transparent) {
              transparent = false;
              showNavbar();
            }
          } else {
            if( !transparent ) {
              transparent = true;
              hideNavbar();
            }
          }
        }
    })

  // logo settings
    var logo_width = ($(window).width() - 60) / 2;
    $('.navbar-logo').css('padding-left', logo_width + 'px');
})

// Page scroll Animation
  $(function() {
    $(document).on('click', 'a.page-scroll', function(event) {
        var $anchor = $(this);
        $('body').css('overflow-y', 'hidden');
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 2500, 'easeInOutCubic');
        event.preventDefault();
        $('.navbar-collapse').collapse('hide');
    });
  });

// Spread Modifications (Desktop / Mobile)

  function spreadModification(window_width) {
    if(window_width < 437) {
      smallMode();
    } else {
      normalMode();
    }
    $('.seperator-line').css('width', $('.spread').width() - 60 + 'px');
  }

  function smallMode() {
    $('.small-mode').removeClass('col-xs-8');
    $('.small-mode').removeClass('col-xs-4');
    $('.small-mode').removeClass('col-xs-7');
    $('.small-mode').removeClass('col-xs-5');
    $('.small-mode').css('text-align', 'center');
    $('.small-mode .spread-likes').css('width', '100%');
    $('.small-mode .spread-likes').css('padding-top', '10px');
    $('.small-mode .spread-likes').css('margin-right', '0px');
    $('.tags-group').css('margin-left', '0px');
    $('.tags-group').css('width', '100%');
    $('.small-mode .time').css('width', '100%');
    $('.small-mode .time').css('margin-right', '0px');
    $('.spread').css('height', '705px');
  }

  function normalMode() {
    $('.small-mode3').addClass('col-xs-4');
    $('.small-mode5').addClass('col-xs-5');
    $('.small-mode7').addClass('col-xs-7');
    $('.small-mode9').addClass('col-xs-8');
    $('.small-mode').css('text-align', '');
    $('.small-mode .spread-likes').css('width', '');
    $('.small-mode .spread-likes').css('padding-top', '');
    $('.small-mode .spread-likes').css('margin-right', '30px');
    $('.tags-group').css('margin-left', '30px');
    $('.tags-group').css('width', '215px');
    $('.small-mode .time').css('width', '');
    $('.small-mode .time').css('margin-right', '30px');
    $('.spread').css('height', '650px');
  }

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

// login-register modal
  function showLoginForm(){
      $('#newsletterModal .registerBox').fadeOut('fast',function(){
          $('.newsletterBox').fadeIn('fast');
          $('.register-footer').fadeOut('fast',function(){
              $('.newsletter-footer').fadeIn('fast');
          });

          $('.modal-title').html('Login with');
      });
       $('.error').removeClass('alert alert-danger').html('');
  }

  function openLoginModal(){
      showLoginForm();
      setTimeout(function(){
          $('#newsletterModal').modal('show');
      }, 230);

  }

  function shakeModal(){
      $('#newsletterModal .newsletter-modal-dialog').addClass('shake');
               $('input[type="password"]').val('');
               setTimeout( function(){
                  $('#newsletterModal .newsletter-modal-dialog').removeClass('shake');
      }, 1000 );
  }

// Prompt Newsletter
  function promptNewsletter() {
    if (!localStorage.subscribed) {
      openLoginModal();
      newsletter_popped_up = true;
      return newsletter_popped_up;
    }
  }

// Hide Navbar when scroll down
  function toggleNavbarOnScroll(amount_scrolled, prev) {
    //$('.navbar-default').toggleClass('hidden', amount_scrolled > prev);
    prev = amount_scrolled;
    return prev;
  }

// Toggle Navbar
  function showNavbar() {
    $('.navbar').addClass('navbar-fixed-top');
    $('.navbar-logo img').addClass('nav-img');
    $('.navbar-logo .first-logo').addClass('display-logo');
    $('.navbar-logo .second-logo').removeClass('display-logo');
    $('.navbar-collapse').addClass('navbar-color');
    $('.navbar-default').css('background', 'white');
    var divs = document.querySelectorAll('.main-nav li a');
    for (var i = 0; i < divs.length; i++) {
        divs[i].classList.add('black-font');
    }
    $('.main-nav').css('position', 'relative');
    $('.main-nav').css('left', '0%');
    $('.navbar-toggle').css('position', 'relative');
    $('.navbar-toggle').css('left', '0%');
    $('.navbar-img').css('padding-top', '0px');
    $('.navbar-img').css('margin-top', '0px');
    if($(window).width() > 767) {
      $('.navbar-img').css('width', '40px');
    } else {
      $('.navbar-img').css('width', '35px');
    }
    $('.navbar-logo').css('padding-left', '40px');
    $('.navbar-default').css('box-shadow', '0 2px 2px rgba(0,0,0,0.2)');
  }

  function hideNavbar() {
    $('.navbar').removeClass('navbar-fixed-top');
    $('.navbar-logo img').removeClass('nav-img');
    $('.navbar-collapse').removeClass('navbar-color');
    $('.navbar-logo .first-logo').removeClass('display-logo');
    $('.navbar-logo .second-logo').addClass('display-logo');
    $('.navbar-default').css('background', 'transparent');
    var divs = document.querySelectorAll('.main-nav li a');
    for (var i = 0; i < divs.length; i++) {
        divs[i].classList.remove('black-font');
    }
    $('.main-nav').css('position', 'absolute');
    $('.main-nav').css('left', '-500%');
    $('.navbar-toggle').css('position', 'absolute');
    $('.navbar-toggle').css('left', '-500%');
    $('.navbar-img').css('padding-top', '20px');
    $('.navbar-img').css('width', '60px');
    var logo_padding_left = ($(window).width() - 60) / 2;
    $('.navbar-logo').css('padding-left', logo_padding_left + 'px');
    $('.navbar-default').css('box-shadow', 'none');
  }