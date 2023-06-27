import Web3 from 'web3';

let web3: Web3;

if (
  typeof window !== 'undefined' &&
  typeof (window as any).ethereum !== 'undefined'
) {
  // We are in the browser and metamask is running.
  (window as any).ethereum.request({ method: 'eth_requestAccounts' });
  web3 = new Web3((window as any).ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    'https://sepolia.infura.io/v3/1556cf7b5c114e4187a0f76b2f46925e'
  );
  web3 = new Web3(provider);
}

export default web3; // @ts-ignore
