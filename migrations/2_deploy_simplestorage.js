var SimpleStorage = artifacts.require("SimpleStorage");

module.exports = function(deployer) {
  // Pass 42 to the contract as the first constructor parameter
  // https://blog.vjrantal.net/2017/05/12/testing-quorum-transaction-privacy-with-truffle/
  // Only node 7 can access this contract, "ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc=" is the node 7 TM Pub Key
  deployer.deploy(SimpleStorage, 42, {privateFor: ["ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc="]})
  // OR
  //These will deploy the contract to all nodes with initial value set to 42
  //deployer.deploy(SimpleStorage, 42)
  // Note: deploy contract to public. Then send private Txn between specific node seem able to execute the contract but not sure where its writing to???
  // though the eth.getTransaction indicate its has private payload with 0x25? (Note: private for node 6 & 7 will get payload 0x26?? )
  // eth.getTransaction from the Txv private for TM4.pub shown to address:"0xd9d64b7dc034fafdba5dc2902875a67b5d586420" which donesn't seem belong to any 7 nodes?  Payload is private, 0x25
  // So Quorum can only support private smart contract for now.  Public contract will need to be separtated as another different contract
  // https://github.com/jpmorganchase/quorum/issues/138 [Feature Ask: Enable privateFor for Public Contracts  ]
};