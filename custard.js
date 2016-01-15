var playerStore = require('./player-store');
var gameStore = require('./game-store');

var threshold = 0.042;

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

  app.post('/players', function(req, res) {
    if (req.body.name) {
        playerStore.join(req.body.name).then( function (player) {
            res.json(player);
        });
    } else {
        res.status(400).json({ error: "Player missing name property" });
    }
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



  app.get('/status', function (req, res) {

      playerStore.all().then( function (players) {
        var total = 0;
        for (var i = 0; i < players.length; ++i) {
            if (players[i].hasOwnProperty('amount')) {
                total += players[i].amount;    
            }
        }
        res.json({amount: total, gameOver: total >= threshold});
      }).fail( function (err) {
          res.json('error');
      });
  
  });
  
}

module.exports = registerEndpoints;