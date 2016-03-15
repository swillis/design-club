$(document).on('ready', function() {

  // Fade in nav

  $('.main').waypoint(function() {
    var header = $('.header');
    header.toggle();
    header.toggleClass('bounceInDown');
  });

  // Contact form modal

  var contactButton = $('.button--contact');
  var contactForm = $('.contact-form');
  var contactContent = $('.contact-form__content');
  var contactClose = $('.contact-form__close');

  contactButton.on('click', function() {
    contactForm.fadeToggle(125, function() {
      contactContent.fadeIn();
      contactContent.addClass('fadeInUp');
    });
  });

  contactClose.on('click', function() {
    contactForm.fadeToggle(125)
  });

  // Smooth scroll

  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 400);
          return false;
        }
      }
    });
  });

});