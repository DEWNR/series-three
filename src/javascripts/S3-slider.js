/**
 * Initialise the homepage slider.
 *
 * Requires jQuery.
 *
 * Must be concatenated and minified before use in a production environment.
 **/

/*global

    $, Modernizr

*/

var sliderUI = {};

(function () {

    "use strict";


    // Require jQuery

    if (typeof window.jQuery === 'undefined') {

        return false;

    }


    // Require at least two spotlights

    if ($('.js-slider-stage li').length < 2) {

        // Remove the loading class

        $('.js-slider-stage').removeClass("slider__stage--loading");

        // Exit the script

        return false;

    }


    // Define CDN script location and local fallback

    var cdnScript = "//cdnjs.cloudflare.com/ajax/libs/flickity/1.0.2/flickity.pkgd.min.js", localScript = "/files/templates/00000000-0000-0000-0000-000000000000/f88a7f3c-df7e-430a-825c-24cfa8dec9a8/flickity.1.0.2.min.js";


    // Initialise the slider

    sliderUI.load = function () {

        var controlsHTML, sliderOptions = {
            accessibility:      false,
            autoPlay:           5000,
            cellAlign:          'left',
            imagesLoaded:       true,
            pageDots:           false,
            percentPosition:    true,
            prevNextButtons:    false,
            wrapAround:         true
        };


        sliderUI.slider = $('.js-slider-stage').flickity(sliderOptions);


        controlsHTML = '<div class="slider__controls"><button class="slider__control  slider__control--fill    toggle  toggle--brand  is-active    js-slider-autoplay" type="button"><svg class="slider__icon    toggle__icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" viewBox="0 0 30 30"><g class="toggle__layer  toggle__layer--active"><polygon points="11,8 11,22 14,22 14,8"></polygon><polygon points="19,8 19,22 16,22 16,8"></polygon></g><polygon class="toggle__layer" points="11,8 11,22 22,15"/></svg></button><button class="slider__control  slider__control--stroke    toggle  toggle--brand    js-slider-previous" type="button"><svg class="slider__icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" viewBox="0 0 30 30"><polyline fill="none" points="19,8 9,15 19,22" /></svg></button><button class="slider__control  slider__control--stroke    toggle  toggle--brand    js-slider-next" type="button"><svg class="slider__icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" viewBox="0 0 30 30"><polyline fill="none" points="11,8 21,15 11,22" /></svg></button></div>';


        // Toggle the autoplay status

        sliderUI.autoPlay = {};

        sliderUI.autoPlay.isPlaying = true;

        sliderUI.autoPlay.mode = function (action) {

            var flkty = sliderUI.slider.data('flickity'), target = '.js-slider-autoplay', triggerClass = 'is-active';


            // If the mode is set to toggle, choose the behaviour based on the player's state

            if (action === 'toggle') {

                if (sliderUI.autoPlay.isPlaying) {

                    action = 'stop';

                } else {

                    action = 'play';

                }

            }


            // Start or stop the player

            if (action === 'stop' && sliderUI.autoPlay.isPlaying) {

                flkty.player.stop();

                $(target).removeClass(triggerClass);

                sliderUI.autoPlay.isPlaying = false;

            } else if (action === 'play' && !sliderUI.autoPlay.isPlaying) {

                flkty.player.play();

                $(target).addClass(triggerClass);

                sliderUI.autoPlay.isPlaying = true;

            }

        };


        // Remove the loading class (which hides all but the first slide)

        $('.js-slider-stage').removeClass("slider__stage--loading");


        // Add the controls

        $('.js-slider').prepend(controlsHTML);


        // Add button functionality

        // Previous

        $('.js-slider-previous').on('click', function () {

            sliderUI.slider.flickity('previous');

        });

        // Next

        $('.js-slider-next').on('click', function () {

            sliderUI.slider.flickity('next');

        });

        // Stop autoplay
        $('.js-slider-previous, .js-slider-next').on('click', function () {

            if (sliderUI.autoPlay.isPlaying) {

                sliderUI.autoPlay.mode('stop');

            }

        });


        // Toggle autoplay

        $('.js-slider-autoplay').on('click', function () {

            sliderUI.autoPlay.mode('toggle');

        });


        sliderUI.slider.on('pointerDown', function () {

            if (sliderUI.autoPlay.isPlaying) {

                sliderUI.autoPlay.mode('stop');

            }

        });


        // Make sure only the current slide accessible via keyboard

        sliderUI.slider.on('cellSelect', function () {

            $(".js-slider-stage .slider__cell a").attr("tabindex", "-1");

            $(".js-slider-stage .slider__cell.is-selected a").attr("tabindex", "");

        });

    };


    // Load the Flickity script and initialise the slider

    $.getScript(cdnScript)
        .done(function () {

            sliderUI.load();

        })
        .fail(function () {

            $.getScript(localScript)

                .done(function () {

                    sliderUI.load();

                });

        });

}());
