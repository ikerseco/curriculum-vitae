function loadApp() {

	// Create the flipbook

	$('.liburu').turn({
			// Width

			width:1070,
			
			// Height

			height:741,

			// Elevation

			elevation: 50,
			
			// Enable gradients

			gradients: true,
			
			// Auto center this flipbook

			autoCenter: true

	});
	$(".liburu").turn("zoom", 1);
}

// Load the HTML4 version if there's not CSS transform

yepnope({
	test : Modernizr.csstransforms,
	yep: ['turn.js'],
	nope: ['turn.html4.min.js'],
	both: ['basic.css'],
	complete: loadApp
});