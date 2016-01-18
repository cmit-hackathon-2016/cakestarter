'use strict';

var myApp = angular.module('myApp', ['ja.qr']);

myApp.controller('CakeController', ['$scope', 'playerService', 'gameService', '$interval', function($scope, playerService, gameService, $interval) {
    $scope.participants = [];
    $scope.currentTotal = 0;
    $scope.gameOver = false;
    $scope.losingParticipant = "placeholder";
    $scope.inputAmount = .042; //Max
    
    $scope.qrCode = null;
    $scope.setQR = function (qrCode) {
        $scope.qrCode = qrCode;
    };

    $scope.joinGame = function() {
        playerService.join($scope.userName).then(function(result) {
            updateGameState();
        });
    };

    function updateGameState() {
        playerService.findAll().then(function(players) {
            $scope.participants = players;
        });

        gameService.status().then(function(status) {
            $scope.currentTotal = status.amount;
            $scope.gameOver = status.gameOver;
        });
    }

    updateGameState();

    $interval(updateGameState, 2000);

}]);
