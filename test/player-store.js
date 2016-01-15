var _ = require('lodash');

var Q = require('q');

var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

var assert = chai.assert;
var expect = chai.expect;

var playerstore = require('../player-store');

describe('redis', function() {
    this.timeout(20000);
    
    it("should save and read", () => 
      
        expect(playerstore.save( { name: "alice" } )).to.be.fulfilled
            .then( () => expect(playerstore.read( "alice" )).to.eventually.have.property("name").equal("alice") )
    );
    
    it("should save and show all", () => 
        expect(
            playerstore.save( { name: "bob" } ).then( () => 
            playerstore.save( { name: "mac" } ))
        ).to.be.fulfilled
        .then( () => { return expect(playerstore.all()).to.eventually.have.length.least(2)} )); 
    
    it("save and retrieve", function (done) {
        
        playerstore.save( { name: "alice" } )
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