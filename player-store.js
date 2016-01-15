var redis  = require('redis');
var Q      = require('q');

var _      = require('lodash');

function PlayerStore() {
    var client = null;
    var context = this;
    var init = function init(callback) {   
        if (client) {
            callback(null, client);
        }
        else {
            var unauth_client = redis.createClient("redis:pub-redis-17864.dal-05.1.sl.garantiadata.com:17864")   
            unauth_client.auth("n9ip3fwvWOwzu4wi", function (err, reply) {
            
                if (err) {
                    callback(err);
                } 
                else {
                    client = unauth_client;
                    callback(null, client); 
                }           
            });
        }          
    }
    
    this.all = function () { 
        var deferred = Q.defer();
        
        init( function (err, cli) {
            if (err) {
                deferred.reject(err);
            }
            else {
                
                cli.smembers('players', function (err, reply) {
                    
                    if (err) {
                        deferred.reject(err);
                    }
                    else {
                        Q.all( _.map( reply, context.read ) ).then( result => deferred.resolve(result) )
                    }
                });
                
            }
        });
        
        return deferred.promise;    
    };

    this.read = function (address) {
        var deferred = Q.defer();
        init( function (err, cli) {
            if (err) {
                deferred.reject(err);
            }
            else {
                cli.get("players:" + address, function (err, player) {
                    if (err) {
                        deferred.reject(err);
                    }
                    else {
                        deferred.resolve(JSON.parse(player));   
                    }    
                });
            }
        });

        return deferred.promise;                    
    }
    
    this.save = function (address, player) {
        var deferred = Q.defer();
        
        player.address = address;
        
        init( function (err, cli) {
            if (err) {
                deferred.reject(err);
            }
            else {
                cli.sadd('players', address, function (err) {
                    
                    cli.set( 'players:' + address, JSON.stringify(player), function (err) {
                        deferred.resolve(player);
                    });
                });
            }
        });

        return deferred.promise;    
    };        
}

module.exports = new PlayerStore();