$(document).ready(function() {
  var scrolled = false;
  var scrolled2 = false;
  var transparent = true;

  var list_mode = false;

  var innerWidths = $(window).innerWidth();
  var submitIcon = $(".searchbox-icon");
  var inputBox = $(".searchbox-input");
  var searchBox = $(".searchbox");
  var isOpen = false;
  // When search icon is clicked in desktop mode
    submitIcon.click(function() {
      if (isOpen == false) {
        searchBox.addClass("searchbox-open");
        $('.searchbox-open').css('width', innerWidths + 'px');
        inputBox.focus();
        $('.searchbox-icon, .searchbox-submit').css('background', 'black');
        isOpen = true;
      } else {
        $('.searchbox-open').css('width', '0px');
        searchBox.removeClass("searchbox-open");
        inputBox.focusout();
        setTimeout(function() {
          $('.searchbox-icon, .searchbox-submit').css('background', 'white');
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

    $('.seperator-line').css('width', $('.post-container').width() - 60 + 'px');
  }

  $('.display-list-icon').click(function() {
    if(list_mode == false) {
      $('.display-list').css('position', 'relative');
      $('.display-list').css('left', '0');
      $('.display-spread').css('position', 'absolute');
      $('.display-spread').css('left', '-5000%');
      $('.fa-list').css('color', '#EB7C10');
      $('.fa-th-large').css('color', "black");
      list_mode = true;
    }
  });
  $('.display-spread-icon').click(function() {
    if(list_mode == true) {
      $('.display-spread').css('position', 'relative');
      $('.display-spread').css('left', '0');
      $('.display-list').css('position', 'absolute');
      $('.display-list').css('left', '-5000%');
      $('.fa-th-large').css('color', '#EB7C10');
      $('.fa-list').css('color', "black");
      list_mode = false;
    }
  });

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

  var logo_width = ($(window).width() - 60) / 2;
  $('.navbar-logo').css('padding-left', logo_width + 'px');
  $(window).resize(function() {
    var window_height = $(window).height();
    var window_width = $(window).width();
    var top = window_height / 100 * 46;
    $('.carousel-indicators').css('top', top + 'px');
    var logo_width = ($(window).width() - 60) / 2;  //$(window).width() / 100 * 47.8;
    $('.navbar-logo').css('padding-left', logo_width + 'px');

    if(window_height > window_width) {
      $('.item1').css('background-image', 'linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url("/images/phone1.jpg")');
      $('.item2').css('background-image', 'linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url("/images/phone2.jpg")');
      $('.item3').css('background-image', 'linear-gradient(rgba(0,0,0,0.45),rgba(0,0,0,0.45)), url("/images/phone3.jpg")');
    } else {
      $('.item1').css('background-image', 'linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url("/images/pic1.jpeg")');
      $('.item2').css('background-image', 'linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url("/images/pic2.jpeg")');
      $('.item3').css('background-image', 'linear-gradient(rgba(0,0,0,0.45),rgba(0,0,0,0.45)), url("/images/pic3.jpeg")');
    }

    $('.seperator-line').css('width', $('.post-container').width() - 60 + 'px');
  })

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
