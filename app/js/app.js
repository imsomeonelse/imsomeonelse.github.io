(function() {
  var app = angular.module('melp', []);
  app.filter('rating', function() {
    return function(items, moreThan) {
      var filteredItems = []
      angular.forEach(items, function ( item ) {
          if ( item.rating >= moreThan ) {
            filteredItems.push(item);
          }
      });
      return filteredItems;
    };
  });

  app.filter('radius', function() {
    return function(items) {
      var filteredItems = []
      angular.forEach(items, function ( item ) {
          var loc = new google.maps.LatLng(item.address.location.lat, item.address.location.lng);
          if (bounds.contains(loc)) {
            filteredItems.push(item);
          }
      });
      return filteredItems;
    };
  });

  app.controller('RestaurantsController', function($scope, $http, $filter) {
    $http.get("https://s3-us-west-2.amazonaws.com/lgoveabucket/data_melp.json").then(function (response) {
        $scope.original = response.data;
        $scope.restaurants = response.data;
    });

    $scope.range = function(count){
      var ratings = []; 
      for (var i = 0; i < count; i++) { 
        ratings.push(i) 
      } 
      return ratings;
    }

    $scope.sortBy = function(property){
      $scope.restaurants = $filter('orderBy')($scope.restaurants, property);
    }

    $scope.filterIt = function(){
      $scope.restaurants = $filter('rating')($scope.original, rating);
      if($("#nearMe").is(':checked')){
        $scope.restaurants = $filter('radius')($scope.restaurants); 
      }else{
        $scope.restaurants = $scope.original;
      }
    }

    $scope.selectRestaurant = function(index){
      $scope.selected = $scope.restaurants[index];
      $('.mini.modal')
      .modal('show');
    }

  });

})();