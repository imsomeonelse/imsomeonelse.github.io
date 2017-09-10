$(document).ready(function(){
  	getHeight();
  	adaptResponsive();

   	$('.ui.dropdown').dropdown();

   	$('#showSection').click(function(){
   		if($(window).width() < 999){
    		showCorrectSection('#showSection');
    	}
   	});
});

window.onresize = function() {
    getHeight();
    adaptResponsive();
}

function adaptResponsive(){
	if($(window).width() < 999){
		$('#infoModal').removeClass('mini');
		$('#infoModal').addClass('large');
		$('#showSection').removeClass('active');
    	showCorrectSection('#showSection');
	}else{
		$('#infoModal').removeClass('large');
		$('#infoModal').addClass('mini');
		$('#map-container').show();
		$('#list').show();
		$('#showSection').addClass('active');
	}
}

function getHeight(){
	var h=$(window).outerHeight()-$("#header").outerHeight()-$("#nav-options").outerHeight()-35;

	$('#list').height(h);
	$('#map').height(h);
}

function showCorrectSection(section){
	if($(section).hasClass('active')){
		$('#map-container').show();
		$('#list').hide();
		$(section).removeClass('active');
	}else{
		$('#map-container').hide();
		$('#list').show();
		$(section).addClass('active');
	}
}