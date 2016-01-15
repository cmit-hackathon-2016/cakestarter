var playerStore = require('./player-store');

function registerEndpoints(app) {
  app.get('/players', function(req, res, next) {
    playerStore.all().then( function (players) {
        res.json(players);
        res.end();
    });
  });

  app.get('/players/:address', function(req, res, next) {
    var address = req.params.address;
    playerStore.read(address).then( function (player) {
        if (typeof player !== 'undefined') {
            res.json(player);
        } else {
            res.status(404).json({ error : "No such player" });
        }
        res.end();
    })
  });

  app.put('/players/:address', function(req, res, next) {
    var address = req.params.address;
    var player = req.body;
    playerStore.save(address, player).then( function (player) {
        res.json(player);
        res.end();
    });
  });
}

module.exports = registerEndpoints;
