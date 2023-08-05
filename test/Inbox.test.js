//Author: My partner and I
const assert = require('assert');//make assertion about test, some value==another value.
const ganache = require('ganache');// local network for testing.
const { Web3 } = require('web3');//Web3 contructor.
const web3 = new Web3(ganache.provider());// create instance in Web3 library and connect it with local netwok using provider().
const { abi, evm } = require('../compile');

let accounts;
let inbox;
//beforEach will be excuted befor excuting every 'it' statment. 
beforeEach(async () => {
  // Get a list of all accounts thta is provided by ganache.
  accounts = await web3.eth.getAccounts();
  //deploy the contract with defult message from the first account provided by ganache.
  inbox = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: ['Hi there!'],
    })
    .send({ from: accounts[0], gas: '1000000' });
});
describe('Inbox', () => {
  //Author: My partner
  //check if the smart contract deployed successfully or not.
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });
  //Author: My partner
  //check if it has the default message that is specified while deploying.
  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi there!');
  });
  //Author: Shahad Alshammary  
  //Check if the function setMessage function in the contract updated the data inside blockchain successfully or not
  it('can change the message', async () => {
    await inbox.methods.setMessage('bye').send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye');
  });
  //Author: My partner 
  //check if the contract allow setting empty message or not. 
  it('can set an empty message', async () => {
    await inbox.methods.setMessage('').send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, '');
  });
});
