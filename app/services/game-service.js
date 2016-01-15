angular.module('myApp').factory('gameService', ['$http', function($http) {
  var service = {
    status: function() {
      return $http.get('/status');
    },
  };
  return service;
}]);
