$(document).ready(function() {
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

  // Spread or list display
    var list_mode = false;

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

  // Resize functionality
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