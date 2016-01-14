var playerStore = require('./player-store');

function registerEndpoints(app) {
  app.get('/players', function(req, res, next) {
    var players = playerStore.all();
    res.json(players);
    next();
  });

  app.get('/players/:address', function(req, res, next) {
    var address = req.params.address;
    var player = playerStore.read(address);
    if (typeof player !== 'undefined') {
      res.json(player);
    } else {
      res.status(404).json({ error : "No such player" });
    }
    next();
  });

  app.put('/players/:address', function(req, res, next) {
    var address = req.params.address;
    var player = req.body;
    playerStore.save(address, player);
    res.json(player);
    next();
  });
}

module.exports = registerEndpoints;
