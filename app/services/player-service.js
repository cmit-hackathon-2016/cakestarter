angular.module('myApp').factory('playerService', ['$http', function($http) {
  var service = {
    findAll: function() {
      return $http.get('/players');
    },
    findByAddress: function(address) {
      return $http.get('/players/' + address);
    },
    chooseTarget: function(playerAddress, targetAddress) {
	  return $http.put('/players/' + playerAddress + '/targets/' + targetAddress);
	},
    save: function(address, player) {
      return $http.put('/players/' + address, {
        data: player
      });
    }
  };
  return service;
}]);
