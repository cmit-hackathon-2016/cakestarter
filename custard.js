var playerStore = require('./player-store');
var gameStore = require('./game-store');

function registerEndpoints(app) {
  app.post('/games', function(req, res) {
    gameStore.createGame().then( function (game) {
        res.json(game);
    });
  });

  app.get('/players', function(req, res) {
    playerStore.all().then( function (players) {
        res.json(players);
    });
  });

  app.get('/players/:address', function(req, res) {
    var address = req.params.address;
    playerStore.read(address).then( function (player) {
        if (typeof player !== 'undefined') {
            res.json(player);
        } else {
            res.status(404).json({ error : "No such player" });
        }
    })
  });

  app.put('/players/:address', function(req, res) {
    var address = req.params.address;
    var player = req.body;
    player.address = address;
    playerStore.save(player).then( function (player) {
        res.json(player);
    });
  });

  app.put('/players/:address/targets/:target', function(req, res) {
    var address = req.params.address;
    var target  = req.params.target;

    playerStore.read(address).then( function (player) {
        player.targets = target;
        playerStore.save(player).then( function () {
            res.end();
        } );
    }).fail( function (err) {
        console.log('error: ', err)
    });

    var player = req.body;
    player.address = address;
    playerStore.save(player).then( function (player) {
        res.json(player);
    });
  });

  app.get('/total', function (req, res) {
      res.json(42);
  });

  app.get('/isGameOver', function (req, res) {
      res.json(false);
  });

}

module.exports = registerEndpoints;
