import { Router, Stack } from 'react-native-router-flux';

import PropTypes from 'prop-types';

import React from 'react';

import { Provider } from 'react-redux';

import { StatusBar, Platform } from 'react-native';
import { Root } from 'native-base';

import routers from './routers';

if (Platform.OS === 'android') StatusBar.setHidden(true);

const AppRoot = ({ store }) => (
  <Root>
    <Provider store={store}>
      <Router>
        <Stack key="root">{routers}</Stack>
      </Router>
    </Provider>
  </Root>
);

AppRoot.propTypes = {
  store: PropTypes.shape({}).isRequired,
};

export default AppRoot;
