angular.module('myApp').factory('gameService', ['$http', function($http) {
  var service = {
    status: function() {
      return $http.get('/status').then(function (result) {
          return result.status;
      });
    },
  };
  return service;
}]);
