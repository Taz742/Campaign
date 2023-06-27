require('dotenv').config();

const MNEMONIC_PHRASES = process.env.MNEMONIC_PHRASES;
const SOPHELIA_ENDPOINT = process.env.SOPHELIA_ENDPOINT;

const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('Web3');

const { writeToEnvFile } = require('./utils');

const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(MNEMONIC_PHRASES, SOPHELIA_ENDPOINT);
const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();

    const result = await new web3.eth.Contract(compiledFactory.abi)
      .deploy({
        data: compiledFactory.evm.bytecode.object,
      })
      .send({
        from: accounts[0],
        gas: '3000000',
      });

    writeToEnvFile('CONTRACT_ADDRESS', result.options.address);
    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
  } catch (err) {
    console.log(err);
  }
};
deploy();
