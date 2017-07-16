// This is to test Ethereum in calling the Smartcontract to write a value.  
// The result indicate all 7 nodes can see the update value as long as the initial Truffle migrate didn't speccific the privatefor specific node from Quorum
// The from: account_one has no affect of the value 10 being write to all nodes 
// Before runing this script, remove the private for specific node from the mirgate(2_deploy_simplestorage.js) so that every node can see the contract
// And if all node see this contract, E.g.  instance.set(65, {privateFor: ["ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc="]}) will no longer work.  The privatefor need to be set in the intial contract deployment
// checking the value: 
//    $ truffle console or E.g. truffle console --netowrk nodefour
//    > SimpleStorage.deployed().then(function(instance) { return instance.get(); })

var SimpleStorage = artifacts.require("SimpleStorage");
var account_one = "0xed9d02e382b34818e88b88a309c7fe71e65f419d"; // node1
var account_four = "0x9186eb3d20cbd1f5f992a950d808c4495153abd5"; // node4  PubKey: oNspPPgszVUFw0qmGFfWwh1uxVUXgvBxleXORHj07g8=
var storageAcct;

module.exports = function(done) {
    SimpleStorage.deployed().then(function(instance) {
        storageAcct = instance;
        console.log("Setting value to 10...");
        return storageAcct.set(10, {from: account_one});  //from acct don't matter, all nodes will see it
    }).then(function(result) {
        // If this callback is called, the transaction was successfully processed.
        console.log("Transaction:", result.tx);
        console.log("Transaction successful!")
        done();
    }).catch(function(e) {
        // There was an error! Handle it.
        console.log(e);
        done();
    });
};