'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	$.get("/project/"+idNumber, addDetails);
	console.log("/project/"+idNumber);

	//console.log("User clicked on project " + idNumber);
}

function addDetails(res){
	//console.log(res);
	var proj = "#project" + res.id;
	var projdet = proj + " .details";
	var image = res.image;
	var summary = res.summary;
	var title = res.title;
	var date = res.date;

	$(projdet).html('<img src="' + image + '"class="detailsImage"><h5>'+ title+ '</h5><h5>'+date+'</h5><p>'+summary+'</p>');
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	console.log("User clicked on color button");
	$.get("/palette", rando);
}

function rando(res){
	var colors = res.colors.hex;
	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}


//<img src="res.image" class="detailsImage"><h3>res.date</h3><p>res.summary</p>