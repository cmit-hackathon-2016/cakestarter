'use strict';

var myApp = angular.module('myApp', []);

myApp.controller('CakeController', ['$scope', 'playerService', function($scope, playerService) {
  $scope.participants = [];
  $scope.currentTotal = 25 + 12;

  playerService.findAll().then(function(result) {
    $scope.participants = result.data;
  });
}]);
