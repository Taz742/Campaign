import web3 from './web3';
import factoryJson from '../../../ethereum/build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  factoryJson.abi,
  '0xa006dD5C9fdAa25e6B0f116ae1aEb020CD22027f'
);

export default instance;
