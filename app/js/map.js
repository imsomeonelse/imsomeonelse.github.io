var restaurants = [];

var count = 0;
var average = 0;
var deviation = 0;

var radius = 100;
var rating = 0;
var zoom = 18;

var currentLoc = new google.maps.LatLng(19.4393641, -99.12963);

var bounds;
var map;

$(document).ready(function(){
  showMap();
  moveSliders();

  $('#filter-button').click(function(){
    cityCircle.set('radius', radius);
    bounds = cityCircle.getBounds();
    zoom=radiusToZoom(radius/100);
    map.setZoom(zoom);
    getStats();
  });
});

function getStats(){
  count=0;
  average=0;
  deviation=0;
  for (var i = 0, l=restaurants.length; i <l; i++){
    var lat = restaurants[i].address.location.lat;
    var lng = restaurants[i].address.location.lng;

    var latlng = {"lat":parseFloat(lat) , "lng":parseFloat(lng)};
    if(bounds.contains(latlng)){
      count++;
      average+=restaurants[i].rating;
    }
  }
  average/=count;
  for (var i = 0, l=restaurants.length; i <l; i++){
    var lat = restaurants[i].address.location.lat;
    var lng = restaurants[i].address.location.lng;

    var latlng = {"lat":parseFloat(lat) , "lng":parseFloat(lng)};
    if(bounds.contains(latlng)){
      deviation+=Math.pow(restaurants[i].rating-average,2);
    }
  }
  console.log(deviation);
  deviation/=count;
  console.log(deviation);
  deviation = Math.sqrt(deviation);

  $('#count').html(count);
  $('#average').html(average.toFixed(1));
  $('#deviation').html(deviation.toFixed(2));
}

function radiusToZoom(radius){
    return Math.round(14-Math.log(radius)/Math.LN2)+4;
}

function moveSliders(){
  $('#radius-range').range({
    min: 100,
    max: 1000,
    start: 100,
    step: 100,
    onChange: function(val) { radius = val; $('#radius').text(radius);}
  });

  $('#rating-range').range({
    min: 0,
    max: 4,
    onChange: function(val) { rating = val; $('#rating').text(rating); }
  });
}

function loadMarkersFromJson(jsonFile){
  var req = $.getJSON(jsonFile, function (restaurantsData) {
        var markers = [];
        var restaurantsSize = restaurantsData.length;
        for (var i = 0, l=restaurantsSize; i <l; i++){

            restaurants.push(restaurantsData[i]);
            var lat = restaurantsData[i].address.location.lat;
            var lng = restaurantsData[i].address.location.lng;

            var latlng = {"lat":parseFloat(lat) , "lng":parseFloat(lng)};

            var marker = new google.maps.Marker({
                title: restaurantsData[i].name,
                rating: restaurantsData[i].rating,
                site: restaurantsData[i].contact.site,               
                address: restaurantsData[i].address.street+', '+restaurantsData[i].address.city+', '+restaurantsData[i].address.state,
                position: latlng,
                icon:'./img/restaurant-pin.png',
                map: map
            });
            markers.push(marker);
        }

        for (var i = 0, l=restaurantsSize; i <l; i++){
          var infowindow = new google.maps.InfoWindow();
          google.maps.event.addListener(markers[i], 'click', function(){
            infowindow.setContent('<div><strong>'+this.title+'</strong><small> '+this.rating+' estrellas</small><br>'+this.address+'<br>'+this.site);
            map.setCenter(this.getPosition());
            infowindow.open(map, this);
          });
        }
  });
  req.done(function(){
    getStats();
  });
}

function showMap() {
	var mapOptions = {
    draggable: true,
		center: currentLoc,
		zoom: zoom,
		styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]   
	  };     
	map = new google.maps.Map(document.getElementById("map"), mapOptions);

  loadMarkersFromJson('https://s3-us-west-2.amazonaws.com/lgoveabucket/data_melp.json');

	cityCircle = new google.maps.Circle({
		strokeColor: '#FF0000',
		strokeOpacity: 0.8,
		strokeWeight: 0,
		fillColor: '#babfc7',
		fillOpacity: 0.55,
		map: map,
		center: currentLoc,
		radius: radius
	});
	
	var marker0 = new google.maps.Marker({
        draggable: true,
				position: currentLoc,
        icon:'./img/location-pin.png',
				map: map,
				title: 'Estás aquí :)',
	});

  bounds = cityCircle.getBounds();

  cityCircle.bindTo('center', marker0, 'position');

	var infowindow0 = new google.maps.InfoWindow();
	infowindow0.setContent('<div><strong>Torres Quintero</strong><br>Centro Histórico, Centro, 06000 Ciudad de México, CDMX, México');
  infowindow0.open(map, marker0);

  marker0.addListener('click', function() {
    map.setCenter(marker0.getPosition());
    infowindow0.open(map, marker0);
  });

  google.maps.event.addListener(marker0, "dragend", function(event) { 
      var lat = event.latLng.lat(); 
      var lng = event.latLng.lng();
      currentLoc = new google.maps.LatLng(lat, lng);
      bounds = cityCircle.getBounds(); 
      getStats();
  }); 
	
	var input = document.getElementById('place');
    var options = {
        componentRestrictions: {country: 'mx'}
    };
    var autocomplete = new google.maps.places.Autocomplete(input, options);
	
	autocomplete.bindTo('bounds', map);

  var infowindow = new google.maps.InfoWindow();

  autocomplete.addListener('place_changed', function() {
	infowindow0.close();
	cityCircle.setMap(null);
    infowindow.close();
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
    marker0.setPosition(place.geometry.location);

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
	cityCircle.setOptions({center:place.geometry.location, map:map});
  bounds = cityCircle.getBounds();
  getStats();

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    infowindow.open(map, marker0);
  });
}