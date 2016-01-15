angular.module('myApp').factory('playerService', ['$http', function($http) {
  var service = {
    findAll: function() {
      return $http.get('/players');
    },
    join: function(name) {
      var player = {
        name: name
      };
      return $http.post('/players', {
        data: player
      });
    }
  };
  return service;
}]);
