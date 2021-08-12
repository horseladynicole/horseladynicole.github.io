(function ($) {
	'use strict';

  // GLOBAL VARIABLES
  var RB = {};

  RB.site = function() {
    return {
      init: function () {
        console.log('test123123123');
        RB.site.initEvents();
      },
      initEvents: function () {
        RB.site.isTouch();
        // RB.site.parallaxHelpers();
        RB.site.carouselHeight();
        RB.site.navigationScrolling();
        RB.site.settingsConfigOptions();
        $(window).on('load resize orientationchange', function(){ 
          RB.site.carouselHeight();
        });
      },
      queryString: function(name)
      {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.search);
        if(results == null)
        return "";
        else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
      },
      isTouch: function(){
        var isTouch = ('ontouchstart' in document.documentElement);
        if ( isTouch ) {
            $('html').addClass('touch');
        }
        else {
            $('html').addClass('no-touch');
        }
      },
      parallaxHelpers: function() {
        if($('html').hasClass('no-touch')){
          var myParaxify = paraxify('.paraxify');
          $(window).scrollTop(1);
        }
      },
      carouselHeight: function() {
        if ($('.carousel').length) {
          $('.carousel').each(function(){
            var items = $('.carousel-item', this);
            items.css('min-height', 0);
            items.find('.carousel-inner').css('min-height',0);
            var maxHeight = Math.max.apply(null, 
                items.map(function(){
                    return $(this).outerHeight();
                }).get() );
            items.css('min-height', maxHeight + 'px');
            items.find('.carousel-inner').css('min-height', maxHeight + 'px');
          });
        }
      },
      navigationScrolling: function() {
        if ($('.sticky-nav').length) {
          var windowHeightHalf = $(window).height() / 4;
          if ($('body').scrollTop() <= windowHeightHalf) {
            $('.sticky-nav').removeClass('scrolled');
          } else {
            $('.sticky-nav').addClass('scrolled');
          }
          $('body').on('scroll',function(){
            if ($(this).scrollTop() <= windowHeightHalf) {
              $('.sticky-nav').removeClass('scrolled');
            } else {
              $('.sticky-nav').addClass('scrolled');
            }
          });
        }
      },
      settingsConfigOptions: function() {
        $('.settings-block .settings-init').click(function(){
          $(this).parents('.settings-block').toggleClass('active');
        });
        if ($('#turn_on_sticky_nav').length) { 
          $('#turn_on_sticky_nav').change(function(){
            if ($('#turn_on_sticky_nav').is(':checked')) {
              $('.header-wrapper').addClass('sticky-nav');
              RB.site.navigationScrolling();
            } else {
              $('.header-wrapper').removeClass('sticky-nav');
            }
          });
        }
        if ($('#turn_off_utility_nav').length) {
          $('#turn_off_utility_nav').change(function() {
            if ($('#turn_off_utility_nav').is(':checked')) {
              $('.header-wrapper').addClass('no-utility');
            } else {
              $('.header-wrapper').removeClass('no-utility');
            }
          });
        }
      }
    };
  }();
  $( window ).on('load',function() {
    RB.site.init();
  });
})(jQuery);