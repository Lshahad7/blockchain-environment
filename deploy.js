////Author: My partner
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const { abi, evm } = require('./compile');

// first arg is 12 mnemonics,sec arg is url to which network to connect to.
const provider = new HDWalletProvider(
  'chief coast simple join approve resemble mountain that badge bulk stairs choice',
  // remember to change this to your own phrase!
  'https://sepolia.infura.io/v3/e05cdd88d84a44cdb6491646d9278a07'
  // remember to change this to your own endpoint!
);
//instance of web3 to interact with test netwoek.
const web3 = new Web3(provider);

const deploy = async () => {
  //get list of all unlocked accounts in the provider, because 12 mnemonic generate list of accounts and we should specify which accounts.

  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);
  // deploy and send the transaction to the netwoek.
  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ['Hi there!'] })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
