const assert = require('assert');
const ganache = require('ganache');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts = [];
let factory;
let campaign;
let campaignAddress;
let caller;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  caller = accounts[0];

  factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({
      data: compiledFactory.evm.bytecode.object,
    })
    .send({
      from: caller,
      gas: '10000000',
    });

  await factory.methods.createCampaign('100').send({
    from: caller,
    gas: '10000000',
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});

describe('Campaigns', () => {
  it('deploys a factory and a campaign', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
    console.log(factory.options.address, campaign.options.address);
  });

  it('marks caller as the campaign manager', async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(caller, manager);
  });

  it('allows people to contribute money and marks them as approver', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: '101',
    });

    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });

  it('requires a minimum amount to contribute', async () => {
    try {
      await campaign.methods.contribute().send({
        from: accounts[1],
        value: '100',
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it('allows a manager to make a payment request', async () => {
    await campaign.methods.createRequest('By cables', '100', accounts[1]).send({
      from: caller,
      gas: '1000000',
    });

    const request = await campaign.methods.requests(0).call();
    assert.equal('By cables', request.description);
  });

  it('processes requests', async () => {
    await campaign.methods.contribute().send({
      from: caller,
      value: web3.utils.toWei('10', 'ether'),
    });
    await campaign.methods
      .createRequest('By cables', web3.utils.toWei('5', 'ether'), accounts[1])
      .send({
        from: caller,
        gas: '1000000',
      });

    await campaign.methods.approveRequest(0).send({
      from: caller,
      gas: '1000000',
    });

    await campaign.methods.finalizeRequest(0).send({
      from: caller,
      gas: '1000000',
    });

    const contractBalanceBefore = await campaign.methods
      .getContractBalance()
      .call();
    console.log(web3.utils.fromWei(contractBalanceBefore, 'ether'));

    assert(weiToEth(accounts[1] > 1004));
    console.log(
      web3.utils.fromWei(contractBalanceBefore, 'ether'),
      await weiToEth(accounts[0]),
      await weiToEth(accounts[1])
    );

    const contractBalance = await campaign.methods.getContractBalance().call();
    console.log(web3.utils.fromWei(contractBalance, 'ether'));
  });
});

async function weiToEth(account) {
  let balance = await web3.eth.getBalance(account);
  balance = web3.utils.fromWei(balance, 'ether');
  balance = parseFloat(balance);

  return balance;
}
