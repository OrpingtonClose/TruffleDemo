// [Important] 1. start the Quorum node on Azure: cd ../../quorum-examples/examples/7nodes$, sudo su, ./init.sh, ./start.sh
// 2. "truffle migrate" under migrations folder which set initial value to 42 for node 1 and 7 (private to node 1 & 7)
// 3. "truffle exec QuorumTx.js" (this JS) will update the value being set to 65 (only for node 1 & 7 )
// checking the value: 
//    $ truffle console  or E.g. truffle console --netowrk nodefour
//    > SimpleStorage.deployed().then(function(instance) { return instance.get(); })
// Note: if the initial migrate(2_deploy_simplestorage.js), step 2 didn't specify the privatefor, all node can see the contract, then this script won't able to update
//
// Additional: running cakeshop on the Quorum7nodesDemo vm: 
// - sudo su, cd /opt
// - git clone https://github.com/jpmorganchase/cakeshop.git (clone cakeshop)
//
// ---To Run the cakeshop in attach mode - attach to exisitng network: https://github.com/jpmorganchase/cakeshop/wiki/Getting-Started#attach-mode
// --- Edit :/opt/cakeshop/data/local/application.properties
// --- geth.url=http\://localhost\:22000 
//
// - apt install docker.io  (to install docker )
// - sudo su, cd /opt/cakeshop, docker run -p 8080:8080 -v "$PWD/data":/opt/cakeshop/data jpmc/cakeshop
// cd 7nodes,  docker run -p 8080:8080 -v "$PWD/qdata/":/opt/cakeshop/data jpmc/cakeshop
// - Browser: http://quorumdemo7nodes.eastasia.cloudapp.azure.com:8080/cakeshop

var SimpleStorage = artifacts.require("SimpleStorage");
///console.log(SimpleStorage);

module.exports = function(done) {
  console.log("Getting deployed version of SimpleStorage...")
  SimpleStorage.deployed().then(function(instance) {
    console.log("Setting value to 65...");
    return instance.set(65, {privateFor: ["ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc="]});  //node7 PubKey private for node 1 & 7
    // OR
    ///return instance.set(65, {privateFor: ["oNspPPgszVUFw0qmGFfWwh1uxVUXgvBxleXORHj07g8="]});  //node4 PubKey private for node 1 & 4
  }).then(function(result) {
    console.log("Transaction:", result.tx);
    console.log("Finished!");
    done();
  }).catch(function(e) {
    console.log(e);
    done();
  });
};

// webpack http://truffleframework.com/tutorials/bundling-with-webpack 
// $ npm install webpack webpack-dev-server truffle-solidity-loader --save-dev
// setup webpack config
// 