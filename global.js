import Web3 from 'web3';

// Inject node globals into React Native global scope.
global.Buffer = require('buffer').Buffer;
global.process = require('process');

let web3Provider = null;
if (typeof global.web3 !== 'undefined') {
  web3Provider = global.web3.currentProvider;
} else {
  web3Provider = new Web3.providers.HttpProvider(
    'http://ec2-54-92-55-120.ap-northeast-1.compute.amazonaws.com:8545/'
  );
}
global.web3 = new Web3(web3Provider);
