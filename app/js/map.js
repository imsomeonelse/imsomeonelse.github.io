var radius= 400;

$(document).ready(function(){
  showMap();
});

function showMap() {
	var mapOptions = {
		center: new google.maps.LatLng(19.2834775, -99.1352799),
		zoom: 16,
		styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]   
	  };     
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);

	var cityCircle = new google.maps.Circle({
		strokeColor: '#FF0000',
		strokeOpacity: 0.8,
		strokeWeight: 0,
		fillColor: '#babfc7',
		fillOpacity: 0.55,
		map: map,
		center: new google.maps.LatLng(19.2834775, -99.1352799),
		radius: radius
	});
	
	var marker0 = new google.maps.Marker({
				position: new google.maps.LatLng(19.2834775, -99.1352799),
        icon:'./img/location-pin.png',
				map: map,
				title: 'Estás aquí :)',
	});
	var infowindow0 = new google.maps.InfoWindow();
	infowindow0.setContent('<div><strong>Tec de Monterrey Ciudad de México</strong><br>Calle del Puente 222, Tlalpan, Ejidos de Huipulco, San Bartolo el Chico, 14380 Ciudad de México, CDMX, Mexico');
    infowindow0.open(map, marker0);
	
	var input = document.getElementById('place');
    var options = {
        componentRestrictions: {country: 'mx'}
    };
    var autocomplete = new google.maps.places.Autocomplete(input, options);
	
	autocomplete.bindTo('bounds', map);

  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });

  autocomplete.addListener('place_changed', function() {
	infowindow0.close();
    marker0.setVisible(false);
	cityCircle.setMap(null);
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(16);  // Why 17? Because it looks good.
    }
    marker.setIcon(/** @type {google.maps.Icon} */({
      url: 'pin2.png',
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

	la=place.geometry.location.lat();
	lo=place.geometry.location.lng();

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }
	cityCircle.setOptions({center:place.geometry.location, fillColor: '#E42D9F', map:map});

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    infowindow.open(map, marker);
  });
}