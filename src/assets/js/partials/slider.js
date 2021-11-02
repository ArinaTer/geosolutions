/**
 * Slider
 */

(function() {

	"use strict";

    var dots = $('.sections-nav_item');
    var slides = $('.section');
    var states = {
    	active: '__active',
    	hide: '__hide',
    	def: '__default'
    }
    var animationSpeed = 1000;
	var current = 0;
    var canScroll = true;
    var scrollings = [];
    var callbacks = {};
    var prevTime = new Date().getTime();

    var slider = {
        getActive: function() {
	    	return slides.filter( function( index ) {
	    		return $( this ).hasClass( '__default' ) || $( this ).hasClass( '__active' );
	    	});
	    },
        getCurrent: function() {
            return current;
        },
	    getNext: function( direction ) {
	    	var next = current; 
	    	var count = dots.length - 1;

	    	switch( direction ) {
	    		case 'increment': next + 1 > count ? next = 0 : next++; break;
	    		case 'decrement': next - 1 < 0 ? next = count : next--; break;
	    	}

	    	return next;
	    },
	    goTo: function( index ) {
	    	if( index !== current ) {
                applyCallback( 'change' );
		    	changeDot( index );
	    		changeSlide( index );
	    	}
	    },
        on: function( name, callback ) {
            callbacks[name] = callback;
        }
    }

    function applyCallback( name ) {
        if ( typeof callbacks[name] !== 'undefined' ) {
            callbacks[name].apply( this );
        }
    }

	function changeSlide( index ) {
		canScroll = false;

    	slides
    		.removeClass( getValues( states ).join( ' ' ) )
    		.eq( current )
    		.addClass( states.hide )
    		.end()
			.eq( index )
			.addClass( states.active );

		setTimeout( function(){
            canScroll = true;
        }, animationSpeed );

		current = index;
    }

    function changeDot( dot ) {
    	dots
			.removeClass( states.active )
			.eq( dot )
			.addClass( states.active );
    }

    function getIndex( collection, el ) {
    	return $( collection ).index( el );
    }

    function getAverage( elements, number ){
        var sum = 0;
        var lastElements = elements.slice( Math.max( elements.length - number, 1 ) );

        for( var i = 0; i < lastElements.length; i++ ){
            sum = sum + lastElements[i];
        }

        return Math.ceil( sum/number );
    }

    function getValues( obj ) {
    	var arr = [];

    	for( var item in obj ) {
    		arr.push( obj[item] );
    	}

    	return arr;
    }

    function handleDotClick( e ) {
    	var next = getIndex( dots, e.currentTarget );

    	slider.goTo( next );
    }

    function handleWheelMove( e ) {
    	e = e || window.event;
        var value = e.wheelDelta || -e.deltaY || -e.detail;
        var delta = Math.max( -1, Math.min( 1, value ) );
    	var curTime = new Date().getTime();
        var timeDiff = curTime - prevTime;
        var next;

        e.preventDefault();

        if( scrollings.length > 149 ){
            scrollings.shift();
        }

        scrollings.push( Math.abs( value ) );

        prevTime = curTime;

        if( timeDiff > 200 ){
            scrollings = [];
        }

        if( canScroll ){
            var averageEnd = getAverage( scrollings, 10 );
            var averageMiddle = getAverage( scrollings, 70 );
            var isAccelerating = averageEnd >= averageMiddle;

            if(isAccelerating){
                if ( delta < 0 ) {
                    next = slider.getNext( 'increment' );
                }else {
                    next = slider.getNext( 'decrement' );
                }

		    	slider.goTo( next );
            }
        }
    }

    function attachWheelEvent( el, callback ) {
		if ( el.addEventListener ) {
			if ( 'onwheel' in document ) {
				el.addEventListener( "wheel", callback );
			} else if ( 'onmousewheel' in document ) {
				el.addEventListener( "mousewheel", callback );
			} else {
				el.addEventListener( "MozMousePixelScroll", callback );
			}
		} else {
			el.attachEvent( "onmousewheel", callback );
		}
    }

    dots.on( 'click', handleDotClick );
    attachWheelEvent( document, handleWheelMove );

    window.slider = slider;

})();

