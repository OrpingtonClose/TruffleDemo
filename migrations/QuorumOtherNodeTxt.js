// This is to test Quorum inital contract that beign deploy to node 1 & 7 can't update other node after
// Beloow private for PubKey is the node4, tm4.pub.
// Result no update on node4 after exec this script
// 1. start Quorum nodes on Azure: 7nodes, sudo su, init.sh, start.sh
// 2. truffle migrate under migration folder (2_deploy_simplestorage) specify private for node 1 and 7.  Init value set to 42
// 3. truffle exec QuorumOtherNodeTx.js 
// 4. truffle console --network nodefour
// 5. SimpleStorage.deployed().then(function(instance) { return instance.get(); })
// Result { [String: '0'] s: 1, e: 0, c: [ 0 ] }
var SimpleStorage = artifacts.require("SimpleStorage");

module.exports = function(done) {
  console.log("Getting deployed version of SimpleStorage...")
  SimpleStorage.deployed().then(function(instance) {
    console.log("Setting value to 65...");
    return instance.set(65, {privateFor: ["oNspPPgszVUFw0qmGFfWwh1uxVUXgvBxleXORHj07g8="]});  //set private to node4 but intial deploy contract only private for node1&7
  }).then(function(result) {
    console.log("Transaction:", result.tx);
    console.log("Finished!");
    done();
  }).catch(function(e) {
    console.log(e);
    done();
  });
};

//checking the value: SimpleStorage.deployed().then(function(instance) { return instance.get(); })
