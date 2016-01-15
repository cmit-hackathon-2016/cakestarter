var redis  = require('./redis');
var Q      = require('q');

var _      = require('lodash');

function PlayerStore() {
    var context = this;

    this.all = function () {
        var deferred = Q.defer();

        redis().then( function (cli) {
            cli.smembers('players', function (err, reply) {

                if (err) {
                    deferred.reject(err);
                }
                else {
                    Q.all( _.map( reply, context.read ) ).then( result => deferred.resolve(_.filter(result, _.isObjectLike)) )
                }
            });
        } );

        return deferred.promise;
    };

    this.read = function (name) {
        var deferred = Q.defer();

        redis().then( function (cli) {
            cli.get("players:" + name, function (err, player) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(JSON.parse(player));
                }
            });
        })

        return deferred.promise;
    }

    this.join = function (name) {
        var deferred = Q.defer();

        redis().then(function(cli) {
            cli.sadd('players', name, function (err, reply) {
                var player = {
                    name: name
                };
                if (reply == 1) {
                    cli.set( 'players:' + name, JSON.stringify(player), function (err) {
                        if (err) {
                            deferred.reject(err);
                        }
                        else {
                            deferred.resolve(player);
                        }
                    });
                } else {
                    deferred.reject("Player " + name + " already joined");
                }
            });
        });

        return deferred.promise;
    }

    this.reset = function () {
        var deferred = Q.defer();

        redis().then( function (cli) {

            cli.del( 'players', function (err) {
               if (err) {
                   deferred.reject(err);
               }
               else {
                   deferred.resolve();
               }

            });

        } );

        return deferred.promise;
    };

    this.save = function (player) {
        var deferred = Q.defer();

        redis().then( function (cli) {
            cli.sadd('players', player.name, function (err) {

                cli.set( 'players:' + player.name, JSON.stringify(player), function (err) {
                    if (err) {
                        deferred.reject(err);
                    }
                    else {
                        deferred.resolve(player);
                    }
                });
            });
        });

        return deferred.promise;
    };
}

module.exports = new PlayerStore();
