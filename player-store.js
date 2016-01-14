function PlayerStore() {
  this.players = {};
}

PlayerStore.prototype.all = function() {
  var players = this.players;
  var result = [];
  Object.getOwnPropertyNames(players).sort().forEach(function(address) {
    var player = players[address];
    result.push(player);
  });
  return result;
}

PlayerStore.prototype.save = function(address, player) {
  var normalized = {
    address : address,
    name : player.name
  };
  this.players[address] = normalized;
};

PlayerStore.prototype.read = function(address) {
  if (this.players.hasOwnProperty(address)) {
    return this.players[address];
  }
};

module.exports = new PlayerStore();
