$(document).ready(function() {
  var article_img = $('.article-img').height();
  $('.article-mask').css('height', article_img + 'px');
  var transparent = true;
  var scrolled = false;
  var scrolled2 = false;
  var innerWidths = $(window).innerWidth();
  var submitIcon = $(".searchbox-icon");
  var inputBox = $(".searchbox-input");
  var searchBox = $(".searchbox");
  var isOpen = false;

  var window_width = $(window).width();

  if(window_width < 437) {
    smallMode();
  } else {
    normalMode();
  }

  $('.seperator-line').css('width', $('.spread').width() - 60 + 'px');

  var window_height = $(window).height();
  var margin_top_for_article = window_height - 112;
  $('.post').css('margin-top', margin_top_for_article + 'px');

  $(window).resize(function() {
    var window_height = $(window).height();
    var window_width = $(window).width();
    var margin_top_for_article = window_height - 112;
    $('.post').css('margin-top', margin_top_for_article + 'px');
    var spread_width = $('.spread').width();
    $('.seperator-line').css('width', spread_width - 60 + 'px');
    if(window_width < 437) {
      smallMode();
    } else {
      normalMode();
    }
  })


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
  $(document).scroll(function() {
      if($(window).width() > 768) {
        var amount_scrolled = $(window).scrollTop();
        if(amount_scrolled > 0 && scrolled == false) {
          $(".blog-hyperlink")[0].click();
          scrolled = true;
        }
      }


      if( $(this).scrollTop() >= $(window).height() ) {
        // Navbar Changes when scrollTop exceeds window height
        if(transparent) {
          transparent = false;
          var divs = document.querySelectorAll('.main-nav li a');
          for (var i = 0; i < divs.length; i++) {
              divs[i].classList.add('black-font');
          }
          $('searchbox-icon, .searchbox-submit').css('background', 'white');
          if($(window).width() > 767) {
            $('.navbar-img').css('width', '48px');
          } else {
            $('.navbar-img').css('width', '58px');
          }
          $('.social-icons').css('left', '0%');
          $('.social-icons').css('animation', 'slidein 1s linear forwards');
        }
      } else {
        if( !transparent ) {
          transparent = true;
          var divs = document.querySelectorAll('.main-nav li a');
          for (var i = 0; i < divs.length; i++) {
              divs[i].classList.remove('black-font');
          }
          $('searchbox-icon, .searchbox-submit').css('background', 'transparent');
          $('.social-icons').css('left', '-100%');
          $('.social-icons').css('animation','none');
        }
      }
  });
});

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

function liked() {
  var current_color = $('.likes-number').css('color');
  if(current_color === "rgb(128, 128, 128)") {
    $('.likes-number').css('color', 'red');
    $('.fa-heart').css('color', 'red');
    var number = parseInt($('.likes-number').text());
    number+=1;
    $('.likes-number').html("&nbsp" + number);
  } else {
    $('.likes-number').css('color', 'grey');
    $('.fa-heart').css('color', 'grey');
    var number = parseInt($('.likes-number').text());
    number-=1;
    $('.likes-number').html("&nbsp" + number);
  }
}

function smallMode() {
  $('.small-mode').removeClass('col-xs-9');
  $('.small-mode').removeClass('col-xs-3');
  $('.small-mode').removeClass('col-xs-7');
  $('.small-mode').removeClass('col-xs-5');
  $('.small-mode').css('text-align', 'center');
  $('.small-mode .other-likes').css('width', '100%');
  $('.small-mode .other-likes').css('padding-top', '10px');

  $('.small-mode .other-time').css('width', '100%');
  $('.others').css('height', '700px');
}

function normalMode() {
  $('.small-mode3').addClass('col-xs-3');
  $('.small-mode5').addClass('col-xs-5');
  $('.small-mode7').addClass('col-xs-7');
  $('.small-mode9').addClass('col-xs-9');
  $('.small-mode').css('text-align', '');
  $('.small-mode .other-likes').css('width', '');
  $('.small-mode .other-likes').css('padding-top', '');

  $('.small-mode .other-time').css('width', '');
  $('.others').css('height', '620px');
}