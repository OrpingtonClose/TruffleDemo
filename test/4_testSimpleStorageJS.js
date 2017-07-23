// npm install -g truffle
// npm install -g ethereumjs-testrpc
// npm install truffle-contract
// truffle init
// npm install -g ethereum.js    [Note: Alternative as too much problem with npm install web3 on bash/powershell/cmd on windows!!
//                                      However, I'm using truffle and need the ethereum.js web3 Http provider set into truffle-contract provider!]
// Import libraries we need.  For Browser like mist and not for noe
//import { default as Web3} from 'web3';
//import { default as contract } from 'truffle-contract';
// Import our contract artifacts and turn them into usable abstractions.
//import simpleStorage_json from '../build/contracts/SimpleStorage.json'

//Web3 = require('web3');
//Ethereum.js: Web3 Provider for RPC connection.  Its work but I better use the Truffle web3 env so I commeted this out
/*
var web3 = require('ethereum.js');
web3.setProvider(new web3.providers.HttpProvider('http://quorumdemo7nodes.eastasia.cloudapp.azure.com:22000'));

web3.eth.getBlock(2, function(error, result){
    if(!error)
        console.log(result)
    else
        console.error(error);
})*/

const contract = require('truffle-contract')
var simpleStorage_abi = require('../build/contracts/SimpleStorage.json')

// Contract <-ABI:abstraction, which we'll use through the code below.
var SimpleStorage = contract(simpleStorage_abi);
//console.log(SimpleStorage);

///SimpleStorage.setProvider("http://quorumdemo7nodes.eastasia.cloudapp.azure.com:22000");
// Ref: https://pastebin.com/Ux6s75cq
// set the web3 HttpProvider to Azure Quroum7nodes node1 with rcp port 22000
var web3 = require('ethereum.js');
SimpleStorage.setProvider(new web3.providers.HttpProvider('http://quorumdemo7nodes.eastasia.cloudapp.azure.com:22000'))
// set the default Txn acct to node 1 acct key
var account_one = "0xed9d02e382b34818e88b88a309c7fe71e65f419d"; // node1  TM PubKey BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo=  Refer to /quorum-examples/examples/7nodes/keys$
SimpleStorage.defaults({from: account_one});
//console.log(SimpleStorage);

// For SimpleStorage
function set (storeValue) {
    console.log("Initiating transaction to set value: " + storeValue + " private to node 1 & 7...");
    //Get information about a contract 
    //https://github.com/BlockchainRepos/truffle-testrpc/tree/master/truffle-deploy-smart-contract 
    //ContractName.deployed().then(function(instance) { return instance.functionName() });
    //OR
    //Get address: contractName.deployed(); 
    //var app = contractName.at("address")
    //Transaction: app.functionName(...)
    SimpleStorage.deployed().then(function(instance) {
      return instance.set(storeValue, {privateFor: ["ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc="]});
    }).catch(function(e) {
      console.log(e);
      console.warn("Error setting storage value; see log." + e);
    }); 
  }

  function get () { 
    SimpleStorage.deployed().then(function(instance) {
       return instance.get();
    }).catch(function(e) {
      console.log(e);
      console.warn("Error getting storage value; see log." + e);
    }); 
  }

  //setting value 5 to the SimpleStorage
set(9);

console.log("Retrieve StoredValue: " + get());