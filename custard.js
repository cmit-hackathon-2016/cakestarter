var playerStore = require('./player-store');

function registerEndpoints(app) {
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
        res.end();
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
