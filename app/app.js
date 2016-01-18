'use strict';

var myApp = angular.module('myApp', []);

myApp.controller('CakeController', ['$scope', 'playerService', 'gameService', '$interval', function($scope, playerService, gameService, $interval) {
    $scope.participants = [];
    $scope.currentTotal = 0;
    $scope.gameOver = false;
    $scope.losingParticipant = "placeholder";
    $scope.inputAmount = .042; //Max

    $scope.joinGame = function() {
        playerService.join($scope.userName).then(function(result) {
            updateGameState();
        });
    }

    function updateGameState() {
        playerService.findAll().then(function(players) {
            $scope.participants = players;
        });

        gameService.status().then(function(status) {
            $scope.currentTotal = status.amount;
            $scope.gameOver = status.gameOver;
        });
    }

    $interval(updateGameState, 2000);

    $scope.$watchCollection("participants", function(next, prev){
        if(next == true){
            var audio = new Audio('audio_file.mp3'); //play some audio when new player joins
            audio.play();
        }
    });

    $scope.$watch("currentTotal", function(next, prev){
        if(next >= prev){
            var audio = new Audio('audio_file.mp3'); //play some audio when pool increases (someone pays bitcoins)
            audio.play();
        }
    });

    $scope.$watch("gameOver", function(){
        if($scope.gameOver === true){
            var audio = new Audio('audio_file.mp3'); //play some sound when bomb explodes
            audio.play();
        }
    });
}]);
