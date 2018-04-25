import React from 'react';
import { StatusBar, Platform } from "react-native";
import { Root } from 'native-base';

import routers from './routers';

if (Platform.OS === 'android') StatusBar.setHidden(true);

export default class AppRoot extends React.Component {
  render() {
    return (
      <Root>
        <Provider store={propts.store}>
          {routers}
        </Provider>
      </Root>
    );
  }
}