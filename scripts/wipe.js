var redis = require('../redis.js');

var Q     = require('q');
var _     = require('lodash');

redis().then( function (cli) {
    
    cli.keys("players:*", function (err, keys) {
        console.log(keys);
        
        Q.all( _.map( keys, function (e) { 
            var deferred = Q.defer();
            
            cli.del( e, function () {
                deferred.resolve();
            });
            
            return deferred.promise;
        }) ).then( function () {
            
            Q.del( 'players', function () {
            
                process.exit();
                 
            })
        })
              
    });
    
});
