/**
 * Map
 */

(function() {

	"use strict";

	var latlng = [55.7228681, 37.5016837];

	$('.gm-map').gmap3({
		center: latlng,
		zoom: 16,
		mapTypeId : google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true,
	    scrollwheel: false
	}).marker({
		position: latlng,
		icon: './assets/img/marker.png'
	});

})();

