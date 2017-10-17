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

function subtractLikes() {
    $('.post-like-button-number').css('color', 'grey');
    $('.post-like-button-icon').css('color', 'grey');
    var number = parseInt($('.post-like-button-number').text());
    number-=1;
    $('.post-like-button-number').html("&nbsp" + number);
}

function addLikes() {
    $('.post-like-button-number').css('color', '#CC0000');
    $('.post-like-button-icon').css('color', '#CC0000');
    var number = parseInt($('.post-like-button-number').text());
    number+=1;
    $('.post-like-button-number').html("&nbsp" + number);
}