var SimpleStorage = artifacts.require("SimpleStorage");

module.exports = function(deployer) {
  // Pass 42 to the contract as the first constructor parameter
  // https://blog.vjrantal.net/2017/05/12/testing-quorum-transaction-privacy-with-truffle/
  // Only node 7 can access this contract, "ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc=" is the node 7 TM Pub Key
  deployer.deploy(SimpleStorage, 42, {privateFor: ["ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc="]})
  ///These will deploy the contract to all nodes wiht initial value set to 42
  ///deployer.deploy(SimpleStorage, 42)
};