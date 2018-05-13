import { Router, Stack } from 'react-native-router-flux';

import React, { Component } from 'react';

import { Provider } from 'react-redux';

import { StatusBar, Platform } from 'react-native';

import { Root } from 'native-base';

import PropTypes from 'prop-types';

import routers from './routers';

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
