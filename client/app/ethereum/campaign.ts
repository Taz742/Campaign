import web3 from './web3';
import campaignJson from '../../../ethereum/build/Campaign.json';

const Campaign = (address: string) =>
  new web3.eth.Contract(campaignJson.abi, address);

export default Campaign;
