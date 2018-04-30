import * as Expo from 'expo';
import { Router, Stack } from 'react-native-router-flux';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StatusBar, Platform } from 'react-native';
import { Root } from 'native-base';
import PropTypes from 'prop-types';
import Web3 from 'web3';
import routers from './routers';
import Adoption from './blockchain/Adoption';

if (Platform.OS === 'android') StatusBar.setHidden(true);

export default class AppRoot extends Component {
  static propTypes = { store: PropTypes.shape().isRequired };

  constructor() {
    super();
    this.state = { isReady: false };
  }

  async componentWillMount() {
    this.loadFonts();
    this.setupWeb3();
    this.setupAdoptionContract();
  }

  setupWeb3() {
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
    this.web3 = new Web3(new Web3.providers.HttpProvider(BLOCKCHAIN_PROVIDER_URL));
  }

  setupAdoptionContract() {
    Adoption.init(this.web3.web3Provider);
  }

  async loadFonts() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf')
    });
    this.setState({ isReady: true });
  }

  render = () => {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <Root>
        <Provider store={this.props.store}>
          <Router>
            <Stack key="root">{routers}</Stack>
          </Router>
        </Provider>
      </Root>
    );
  };
}
