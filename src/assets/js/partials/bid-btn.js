/**
 * Bid Button
 */

(function() {

	"use strict";

    var _locale = locale.bid.labels;
   
    var btn = $('.bid-btn');
    var currentSlide;
    var bidSlide = 2;
    var opened = false;

    function changeLabel( state ) {
        btn.text( state ? _locale.opened : _locale.closed );
        opened = state;
    }

    function changeSlide() {
        if( slider.getCurrent() !== bidSlide ) {
            currentSlide = slider.getCurrent();
            slider.goTo( bidSlide );
        } else {
            slider.goTo( currentSlide );
        }
    }

    function handleSlideChange() {
        if( slider.getCurrent() === 2 ) {
            changeLabel( false ); 
        }
    }

    function handleClick( e ) {
        e.preventDefault();
        changeLabel( !opened );
        changeSlide();
    }

    btn.on( 'click', handleClick );
    slider.on( 'change', handleSlideChange );

})();

