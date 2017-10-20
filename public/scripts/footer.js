$(document).ready(function() {
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
})