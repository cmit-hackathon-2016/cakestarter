angular.module('myApp').factory('playerService', ['$http', function($http) {
  var service = {
    findAll: function() {
      return $http.get('/players');
    },
    join: function() {
      return $http.post('/players');
    }
  };
  return service;
}]);
