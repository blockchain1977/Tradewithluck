import Web3 from 'web3';

import React from 'react';
import setupStore from './src/redux/stores';
import AppRoot from './src/native/AppRoot';
import Adoption from './src/blockchain/Adoption';

const store = setupStore();

const BLOCKCHAIN_PROVIDER_URL =
  'http://ec2-54-92-55-120.ap-northeast-1.compute.amazonaws.com:8545/';
/*
    First, we check if there's a web3 instance already active. 
    (Ethereum browsers like Mist or Chrome with the MetaMask extension will inject their own 
    web3 instances.) If an injected web3 instance is present, we get its provider and use it 
    to create our web3 object.
    */
// if (typeof this.state.web3 !== 'undefined') {
//   this.setState({
//     web3Provider: this.state.web3.currentProvider
//   });
// } else {
//   this.setState({
//     web3Provider: new Web3.providers.HttpProvider(BLOCKCHAIN_PROVIDER_URL)
//   });
// }
// this.setState({ web3: new Web3(this.state.web3Provider) });
export const web3 = new Web3(new Web3.providers.HttpProvider(BLOCKCHAIN_PROVIDER_URL));

export const adoption = new Adoption().init(web3.web3Provider);

export default function App() {
  return <AppRoot store={store} />;
}
