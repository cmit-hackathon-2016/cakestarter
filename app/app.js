'use strict';

var myApp = angular.module('myApp', []);

myApp.controller('CakeController', ['$scope', function($scope) {

    $scope.participants = [{"name": "name1"}, {"name": "name2"}];

    $scope.currentTotal = 25 + 12;

    
}]);
