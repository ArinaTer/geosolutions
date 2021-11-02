/**
 * Bid Validate
 */

(function() {

	"use strict";

    var _locale = locale.bid.messages;

    var form = $('.form.__bid');
    var elements = form.find('.form-control');
    var submit = form.find('[type="submit"]');

    form.validate({
        rules: {
            name: "required",
            phone: "required",
            email: {
                required: true,
                email: true
            },
            question: "required"
        },
        messages: {
            name: _locale.name,
            phone: _locale.phone,
            email: _locale.email,
            question: _locale.question
        }
    });

    function isValid() {
        for( var i = 0; i < elements.length; i++ ) {
            if ( elements[i].value === '' ) {
                return false;
            }
        }
        return true;
    }

    function handleFocus() {
        if( this.value === '') {
            this.value = '+ ';
        }
    }

    function handleBlur() {
        if( this.value === '+ ') {
            this.value = '';
        }
    }

    function validatePhone( e ) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {

            if( this.value === '+ ' && e.keyCode === 8) {
                e.preventDefault();
            }

            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    }

    function handleKeyUp() {
        if( isValid() ) {
            submit.attr( 'disabled', false );
        } else {
            submit.attr( 'disabled', true );
        }
    }

    form.on( 'focus', 'input[name="phone"]', handleFocus )
    form.on( 'blur', 'input[name="phone"]', handleBlur )
    form.on( 'keydown', 'input[name="phone"]', validatePhone );
    form.on( 'keyup', 'input, textarea', handleKeyUp );

})();

