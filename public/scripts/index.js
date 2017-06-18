$(document).ready(function() {

  var window_width = $(window).width();
  if(window_width < 437) {
    smallMode();
  } else {
    normalMode();
  }
  $('.seperator-line').css('width', $('.spread').width() - 60 + 'px');


  $(window).resize(function() {
    $('.seperator-line').css('width', $('.spread').width() - 60 + 'px');
    var window_width = $(window).width();
    if(window_width < 437) {
      smallMode();
    } else {
      normalMode();
    }
  })

  var newsletter_popped_up = false;
  var prev = 0;
  $(window).scroll(function() {
    var window_height = $(window).height();
    var window_width = $(window).width();
    var amount_scrolled = $(window).scrollTop();
    if(window_width > 768) {
      if(amount_scrolled > window_height) {
        $('.navbar-default').toggleClass('hidden', amount_scrolled > prev);
        prev = amount_scrolled;
      }
      if(amount_scrolled > window_height && newsletter_popped_up == false) {
        if (! localStorage.noFirstVisit || !localStorage.subscribed) {
          openLoginModal();
          localStorage.noFirstVisit = "1";
          newsletter_popped_up = true;
        }
      }
    } else {
      if(amount_scrolled > 3 * window_height) {
        $('.navbar-default').toggleClass('hidden', amount_scrolled > prev);
        prev = amount_scrolled;
      }
      if(amount_scrolled > 3 * window_height && newsletter_popped_up == false) {
        if (! localStorage.noFirstVisit || !localStorage.subscribed) {
          openLoginModal();
          localStorage.noFirstVisit = "1";
          newsletter_popped_up = true;
        }
      }
    }
  })

  // Scroll Transitions
    var scrolled = false;
    var scrolled2 = false;
    var transparent = true;
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
              scrolled2 = true;
            }, 2600);
          } else if(amount_scrolled == 0) {
            scrolled = false;
          } else if(scrolled2 == true && amount_scrolled < 3 * window_height) {
            $('.navbar-logo')[0].click();
            scrolled2 = false;
          }
        }


      // Navbar Changes when scrollTop exceeds window height
        if(window_width < 768) {
          if( $(this).scrollTop() >= $(window).height() ) {
            if(transparent) {
              transparent = false;
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
              $('.navbar-img').css('margin-top', '-9px');
              if($(window).width() > 767) {
                $('.navbar-img').css('width', '48px');
              } else {
                $('.navbar-img').css('width', '58px');
              }
              $('.navbar-logo').css('padding-left', '90px');
              $('.navbar-default').css('box-shadow', '0 4px 18px 0 rgba(0,0,0,.12), 0 7px 10px -5px rgba(0,0,0,.15)');
            }
          } else {
            if( !transparent ) {
              transparent = true;
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
              var logo_width = $(window).width() / 100 * 47.8;
              $('.navbar-logo').css('padding-left', logo_width + 'px');
              $('.navbar-default').css('box-shadow', 'none');
            }
          }
        } else {
          if( $(this).scrollTop() >= 3 * $(window).height() ) {
            if(transparent) {
              transparent = false;
              $('.navbar').addClass('navbar-fixed-top');
              $('.navbar-logo img').addClass('nav-img');
              $('.navbar-logo .first-logo').addClass('display-logo');
              $('.navbar-logo .second-logo').removeClass('display-logo');
              $('.navbar-collapse').addClass('navbar-color');
              var divs = document.querySelectorAll('.main-nav li a');
              for (var i = 0; i < divs.length; i++) {
                  divs[i].classList.add('black-font');
              }
              $('.main-nav').css('position', 'relative');
              $('.main-nav').css('left', '0%');
              $('.navbar-toggle').css('position', 'relative');
              $('.navbar-toggle').css('left', '0%');
              $('.navbar-img').css('padding-top', '0px');
              $('.navbar-img').css('margin-top', '-9px');
              if($(window).width() > 767) {
                $('.navbar-img').css('width', '48px');
              } else {
                $('.navbar-img').css('width', '58px');
              }
              $('.navbar-logo').css('padding-left', '90px');
              $('.navbar-default').css('box-shadow', '0 4px 18px 0 rgba(0,0,0,.12), 0 7px 10px -5px rgba(0,0,0,.15)');


            }
          } else {
            if( !transparent ) {
              transparent = true;
              $('.navbar').removeClass('navbar-fixed-top');
              $('.navbar-logo img').removeClass('nav-img');
              $('.navbar-logo .first-logo').removeClass('display-logo');
              $('.navbar-logo .second-logo').addClass('display-logo');
              $('.navbar-collapse').removeClass('navbar-color');
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
              var logo_width = $(window).width() / 100 * 47.8;
              $('.navbar-logo').css('padding-left', logo_width + 'px');
              $('.navbar-default').css('box-shadow', 'none');
            }
          }
        }
    })

  // Change Image according to dimensions
    var window_height = $(window).height();
    var window_width = $(window).width();
    if(window_height > window_width) {
      $('.item1').css({
        'background-image': 'linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url("/images/phone1.jpg")',
        'animation': 'none'
      });
      $('.item2').css({
        'background-image': 'linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url("/images/phone2.jpg")',
        'animation': 'none'
      });
      $('.item3').css({
        'background-image': 'linear-gradient(rgba(0,0,0,0.45),rgba(0,0,0,0.45)), url("/images/phone3.jpg")',
        'animation': 'none'
      });
    }

  // logo settings
    var logo_width = ($(window).width() - 60) / 2;
    $('.navbar-logo').css('padding-left', logo_width + 'px');
    // Infinite Loop of Carousel
      setInterval(function() {
          if($('.progress .first-bar').css('width') == '35px') {
            $('.progress .first-bar').css('width', '0%');
          } else if ($('.progress .middle-bar').css('width') == '35px') {
            $('.progress .middle-bar').css('width', '0%');
          } else if ($('.progress .last-bar').css('width') == '35px') {
            $('.progress .last-bar').css('width', '0%');
          }
          $(".active .progress .progress-bar").css('width', '100%');

      })
})

// Page scroll Animation
  $(function() {
    $(document).on('click', 'a.page-scroll', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 2500, 'easeInOutExpo');
        event.preventDefault();
        $('.navbar-collapse').collapse('hide');
    });
  });

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


