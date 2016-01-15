var redis  = require('./redis');

var Q      = require('q');

var uuid = require('node-uuid');

function GameStore() {
}

GameStore.prototype.createGame = function() {
    var gameKey = uuid.v4();
    redis().then(function(cli) {
        cli.sadd('games', gameKey, function (err, reply) {
            if (err) {
                console.error(err);
            } else if (reply === 1) {
                console.log("Successfully added game key")
            } else {
                console.error("Collision for key " + gameKey);
            }
        });
    });
    var game = {
      gameKey : gameKey
    }
    return Q(game);
}

module.exports = new GameStore();
