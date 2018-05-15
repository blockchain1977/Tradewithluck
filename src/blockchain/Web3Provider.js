import Web3, { providers } from 'web3';

const blockchainUrl = 'http://ec2-52-199-0-93.ap-northeast-1.compute.amazonaws.com:8545/';

export const web3 = new Web3(new providers.HttpProvider(blockchainUrl));
