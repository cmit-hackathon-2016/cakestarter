var _ = require('lodash');

var Q = require('q');

var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

var assert = chai.assert;
var expect = chai.expect;

var playerstore = require('../player-store');

describe('redis', function() {
    this.timeout(5000);
    
    it("should save and read", () => 
      
        expect(playerstore.save( { name: "alice", address: "add0" } )).to.be.fulfilled
            .then( () => expect(playerstore.read( "add0" )).to.eventually.have.property("name").equal("alice") )
    );
    
    it("should save and show all", () => 
        expect(
            playerstore.save( { name: "bob", address: "add10" } ).then( () => 
            playerstore.save( { name: "mac", address: "add11" } ))
        ).to.be.fulfilled
        .then( () => { return expect(playerstore.all()).to.eventually.have.length.least(2)} )); 
    
    it("save and retrieve", function (done) {
        
        playerstore.save( { name: "alice", address: "add1" } )
        .then( function () {
            playerstore.all()
                .then( function (res) {
                    
                    assert.isArray(res);
                    assert( res.length > 0 );
                    
                    assert.isDefined( _.find( res, e => e.name === "alice" ) );
                    
                    done();
                })
                .fail( function (err) {
                    done(err);
                })
                .catch(function (err) {
                   done(err); 
                });
        })
        .fail( function (err) {
            assert(false);
            done();
        });
        
    });
});