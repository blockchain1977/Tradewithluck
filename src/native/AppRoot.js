import { Router, Stack } from 'react-native-router-flux';

import React, { Component } from 'react';

import { Provider } from 'react-redux';

import { StatusBar, Platform } from 'react-native';

import { Root } from 'native-base';

import PropTypes from 'prop-types';

import Web3 from 'web3';

import routers from './routers';

global.web3 = new Web3(
  new Web3.providers.HttpProvider(
    'http://ec2-54-92-55-120.ap-northeast-1.compute.amazonaws.com:8545/'
  )
);

if (Platform.OS === 'android') StatusBar.setHidden(true);

export default class AppRoot extends Component {
  static propTypes = { store: PropTypes.shape().isRequired };

  render = () => (
    <Root>
      <Provider store={this.props.store}>
        <Router>
          <Stack key="root">{routers}</Stack>
        </Router>
      </Provider>
    </Root>
  );
}
