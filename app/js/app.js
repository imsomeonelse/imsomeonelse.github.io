(function() {
  var app = angular.module('melp', []);

  app.controller('RestaurantsController', function($scope, $http) {
    $http.get("https://s3-us-west-2.amazonaws.com/lgoveabucket/data_melp.json").then(function (response) {
        $scope.restaurants = response.data;
    });

    $scope.range = function(count){
      var ratings = []; 
      for (var i = 0; i < count; i++) { 
        ratings.push(i) 
      } 
      return ratings;
    }
  });

})();