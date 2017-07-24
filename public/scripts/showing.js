(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

window.___gcfg = {
  lang: 'en-US',
  parsetags: 'onload'
};

window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };

  return t;
}(document, "script", "twitter-wjs"))


$(document).ready(function() {

  document.addEventListener('DOMContentLoaded', function(){
    var trigger = new ScrollTrigger({
      offset: {
        x: 0,
        y: 10
      },
      once: true,
      addHeight: true
    }, document.body, window);
  });

  $('.social-whatsapp-share').attr('href', window.location.href);
  var tweet_link = $('.social-twitter-share').attr('href');
  $('.social-twitter-share').attr('href', tweet_link + window.location.href);

  var window_width = $(window).innerWidth();
  var window_height = $(window).height();
  if(window_width > 768) {
    $('.social-nav').removeClass('navbar-fixed-bottom');
    $('.social-nav').css('top', (window_height - 250) / 2 + 'px');
    $('.social-icons-row').css('position', 'fixed');
  } else {
    $('.social-nav').addClass('navbar-fixed-left');
    $('.social-icons-row').css('position', 'static');
  }


  $(window).resize(function() {
    var window_width = $(window).innerWidth();
    var window_height = $(window).height();
    if(window_width > 768) {
      $('.social-nav').removeClass('navbar-fixed-bottom');
      $('.social-nav').css('top', (window_height - 250) / 2 + 'px');
      $('.social-icons-row').css('position', 'fixed');
    } else {
      $('.social-nav').addClass('navbar-fixed-left');
      $('.social-icons-row').css('position', 'static');
    }
  })

  $(window).scroll(function() {
    if($(window).scrollTop() > 0) {
      $('.social-icons-row').css({'animation': 'slideIn 1.5s ease-out', 'animation-fill-mode': 'forwards'})
    } else {
      $('.social-icons-row').css({'animation': 'slideOut 1.5s ease-out', 'animation-fill-mode': 'forwards'})
    }
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