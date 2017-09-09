$(document).ready(function(){
  getHeight();
});

window.onresize = function() {
    getHeight();
}

function getHeight(){
	var h=$(window).outerHeight()-$("#header").outerHeight()-$("#nav-options").outerHeight()-35;

	if($(window).width() < 999)
	{   
		h/=2;
	}

	$('#list').height(h);
	$('#map').height(h);
}