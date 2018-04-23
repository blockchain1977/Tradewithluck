import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';

import { Router, Scene, Tabs, Stack } from 'react-native-router-flux';
import { Icon } from 'native-base';

import AuctionList from './src/components/AuctionList';
import AccountInfo from './src/components/AccountInfo';

if (Platform.OS === 'android') StatusBar.setHidden(true);

export default class App extends React.Component {
  render() {
    return (
      <Router>
      <Stack>
      <Scene hideNavBar>
        <Tabs
          key="tabbar"
          swipeEnabled
          type="replace"
          showLabel={false}
        >
          <Stack
            key="autionlist"
            title="AuctionList"
            icon={() => <Icon name="logo-bitcoin"/>}
          >
            <Scene key="autionlist" component={AuctionList}/>
          </Stack>
  
          <Stack
            key="accountinfo"
            title="AccountInfo"
            icon={() => <Icon name="logo-bitcoin"/>}
          >
            <Scene key="accountinfo" component={AccountInfo}/>
          </Stack>
        </Tabs>
      </Scene>
    </Stack>
    </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
