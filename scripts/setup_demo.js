var playerStore = require('../player-store');

playerStore.reset().then( function () {
    
    playerStore.save( { address: "z", name: "Sofus" } ).then( () => 
    playerStore.save( { address: "v", name: "Julian" } ).then( () => 
    playerStore.save( { address: "q", name: "Nok" } ).then( () => 
    playerStore.save( { address: "p", name: "Frederik" } ).then( () => 
    playerStore.save( { address: "o", name: "Rune" } ).then( () => 
    process.exit())))));
    
});
