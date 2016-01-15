var redis  = require('redis');
var Q      = require('q');

var cached_client = null;

module.exports = function () {
    
    if (cached_client) {
        return Q.when(cached_client);
    }
    
    var deferred = Q.defer();
    
    var client = redis.createClient("redis:pub-redis-17864.dal-05.1.sl.garantiadata.com:17864")   
    client.auth("n9ip3fwvWOwzu4wi", function (err, reply) {
        
        if (err) {
            console.log('redis init failed', err);
            deferred.reject(err);
        } 
        else {
            cached_client = client;
            deferred.resolve(client);
        }           
    });
        
    return deferred.promise;
} 