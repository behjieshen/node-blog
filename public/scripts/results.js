$(document).ready(function() {
  var list_mode = false;
  var margin_left_results_section = $('.filters-section').width() + 30;
  $('.results-section').css('margin-left', margin_left_results_section + 'px');

  $('.click-button').click(function() {
    $('.filter-section-main').css('animation', 'leftSlideIn 0.2s linear');
    $('.filter-section-main').css('animation-fill-mode', 'forwards');
    $('body').css('overflow-y', 'hidden');
  })

  $('.filter-section-main-name').click(function() {
    $('.filter-section-name').css('animation', 'leftSlideIn 0.2s linear');
    $('.filter-section-name').css('animation-fill-mode', 'forwards');
  })

  $('.filter-section-main-tags').click(function() {
    $('.filter-section-tags').css('animation', 'leftSlideIn 0.2s linear');
    $('.filter-section-tags').css('animation-fill-mode', 'forwards');
  })

  $('.filter-section-main-time').click(function() {
    $('.filter-section-time').css('animation', 'leftSlideIn 0.2s linear');
    $('.filter-section-time').css('animation-fill-mode', 'forwards');
  })

  $('.filter-section-main-likes').click(function() {
    $('.filter-section-likes').css('animation', 'leftSlideIn 0.2s linear');
    $('.filter-section-likes').css('animation-fill-mode', 'forwards');
  })

  $('.filter-section-main-authors').click(function() {
    $('.filter-section-authors').css('animation', 'leftSlideIn 0.2s linear');
    $('.filter-section-authors').css('animation-fill-mode', 'forwards');
  })

  $('.filter-back').click(function() {
    $('.filter-section-sub').css('animation', 'leftSlideOut 0.2s linear');
    $('.filter-section-sub').css('animation-fill-mode', 'forwards');
  })

  $('.filter-close').click(function() {
    $('.filter-section').css('animation', 'leftSlideOut 0.2s linear');
    $('.filter-section').css('animation-fill-mode', 'forwards');
    $('body').css('overflow-y', 'scroll');
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

  // Spread or list display
    var list_mode = false;

    $('.display-list-icon').click(function() {
      if(list_mode == false) {
        $('.display-list').css('display', 'block');
        $('.display-spread').css('display', 'none');
        $('.fa-list').css('color', '#EB7C10');
        $('.fa-th-large').css('color', "black");
        list_mode = true;
      }
    });
    $('.display-spread-icon').click(function() {
      if(list_mode == true) {
        $('.display-spread').css('display', 'block');
        $('.display-list').css('display', 'none');
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

$(document).ready(function () {
  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     isClosed = false;

    trigger.click(function () {
      hamburger_cross();
    });

    function hamburger_cross() {

      if (isClosed == true) {
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }

  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });
});