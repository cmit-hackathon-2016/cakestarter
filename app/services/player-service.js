angular.module('myApp').factory('playerService', ['$http', function($http) {
  var service = {
    findAll: function() {
      return $http.get('/players').then(function (result) {
          return result.data;
      });
    },
    join: function(name) {
      var player = {
        name: name
      };
      return $http.post('/players', player);
    }
  };
  return service;
}]);
