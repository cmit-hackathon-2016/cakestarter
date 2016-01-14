angular.service('playerService', ['$http', function($http) {
  var service = {
    findAll: function() {
      return $http.get('/players');
    },
    findByAddress: function(address) {
      return $http.get('/players/' + address);
    },
    save: function(address, player) {
      return $http.put('/players/' + address, {
        data: player
      });
    }
  };
  return service;
});
