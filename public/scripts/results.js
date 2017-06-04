$(document).ready(function() {
  var list_mode = false;
  var margin_left_results_section = $('.filters-section').width() + 30;
  $('.results-section').css('margin-left', margin_left_results_section + 'px');

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

})

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