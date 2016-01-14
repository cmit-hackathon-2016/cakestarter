var CoinKey = require('coinkey')
var bitcoinjslib = require('bitcoinjs-lib');
var bitcoin = require('bitcoin');
var program = require("commander");


function runProgram() {
    program.version('1.0.0')
        .option('-t, --threshold <n>', 'Limit in BTC when to ', parseFloat)
        .option('-a, --address <value>', 'The cake address')
        .option('-m, --main-net', 'Use Main Net instead of Test Net')
        .parse(process.argv);

    var testNet = !program.mainNet;
    
    var client = new bitcoin.Client({
        host: '127.0.0.1',
        port: 8332,
        user: 'username',
        pass: 'jsdjalsdjlkasjdlkasjdlajslkdjsaldjksjdlasjdlajsdlajsldkjasldjlkasjlkdjl1jj1j1j1j!!',
        timeout: 20000
    });
    
    client.getBalance('*', 0, function(err, balance, resHeaders) {
        if (err) return console.log(err)
        else {
            console.log('Total balance:', balance);
        }
    });

}





runProgram();