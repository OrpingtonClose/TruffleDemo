// 1. start the Quorum node on Azure: cd 7nodes, sudo su, init.sh, start.sh
// 2. "truffle migrate" under migrations folder which set initial value to 42 for node 1 and 7 (private to node 1 & 7)
// 3. "truffle exec QuorumTx.js" (this JS) will update the value being set to 65 (only for node 1 & 7 )
// checking the value: 
//    $ truffle console  or E.g. truffle console --netowrk nodefour
//    > SimpleStorage.deployed().then(function(instance) { return instance.get(); })
// Note: if the initial migrate(2_deploy_simplestorage.js), step 2 didn't specify the privatefor, all node can see the contract, then this script won't able to update
var SimpleStorage = artifacts.require("SimpleStorage");

module.exports = function(done) {
  console.log("Getting deployed version of SimpleStorage...")
  SimpleStorage.deployed().then(function(instance) {
    console.log("Setting value to 65...");
    return instance.set(65, {privateFor: ["ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc="]});  //node7 PubKey private for node 1 & 7
  }).then(function(result) {
    console.log("Transaction:", result.tx);
    console.log("Finished!");
    done();
  }).catch(function(e) {
    console.log(e);
    done();
  });
};
