angular.module('myApp').factory('gameService', ['$http', function($http) {
  var service = {
    getTotal: function() {
      return $http.get('/total');
    },

    isGameOver: function() {
      return $http.get('/isGameOver');
    }
  };
  return service;
}]);
