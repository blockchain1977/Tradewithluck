import * as Expo from 'expo';

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

  constructor() {
    super();
    this.state = { isReady: false };
  }

  async componentWillMount() {
    this.loadFonts();
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
