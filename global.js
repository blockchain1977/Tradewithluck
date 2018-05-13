// Inject node globals into React Native global scope.

// let web3Provider;
// if (typeof global.web3 !== 'undefined') {
//   web3Provider = global.web3.currentProvider;
// } else {
//   web3Provider = new Web3.providers.HttpProvider(
//     'http://ec2-54-92-55-120.ap-northeast-1.compute.amazonaws.com:8545/'
//   );
// }

global.Buffer = require('buffer').Buffer;
global.process = require('process');

// global.base64 = require('base-64');

// global.btoa = global.base64.encode;
if (!global.atob) {
  global.atob = require('base-64').decode;
}
if (!global.btoa) {
  global.btoa = require('base-64').encode;
}

const Web3 = require('web3');

global.web3 = new Web3(
  new Web3.providers.HttpProvider(
    'http://ec2-54-92-55-120.ap-northeast-1.compute.amazonaws.com:8545/'
  )
);
// if (typeof atob === 'undefined') {
//   global.atob = function(b64Encoded) {
//     return Buffer.from(b64Encoded, 'base64').toString('binary');
//   };
// }

// if (typeof btoa === 'undefined') {
//   global.btoa = function(str) {
//     return Buffer.from(str, 'base64').toString('binary');
//   };
// }
