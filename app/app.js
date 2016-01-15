'use strict';

var myApp = angular.module('myApp', []);

myApp.controller('CakeController', ['$scope', 'playerService', 'gameService', '$interval', function($scope, playerService, gameService, $interval) {
    $scope.participants = [];
    $scope.currentTotal = 25 + 12;
    $scope.gameOver=false;
    $scope.losingParticipant = "placeholder";

    $scope.inputAmount = 100;

    $scope.joinGame = function() {

        playerService.join($scope.userName).then(function(result) {
            updateGameState();
        });

     }




    function updateGameState() {
        playerService.findAll().then(function(result) {
            $scope.participants = result.data;
        });

        gameService.getTotal().then(function(result) {
            $scope.currentTotal = result.data;
        });

        gameService.isGameOver().then(function(result){
           $scope.gameOver = result.data;
        });
    }

    $interval(updateGameState, 500);

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
