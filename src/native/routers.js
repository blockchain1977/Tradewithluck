import { Stack, Scene, Tabs } from 'react-native-router-flux';
import { Icon } from 'native-base';

import React from 'react';
import AuctionListContainer from '../containers/AuctionListContainer';
import AuctionList from './components/AuctionList';
import Auction from './components/Auction';
import AccountInfo from './components/AccountInfo';

const routers = (
  <Stack>
    <Scene hideNavBar>
      <Tabs key="tabbar" swipeEnabled type="replace" showLabel>
        <Stack key="autionlist" title="AuctionList" icon={() => <Icon name="logo-bitcoin" />}>
          <Scene key="autionlist" component={AuctionListContainer} Layout={AuctionList} />
        </Stack>

        <Stack
          key="accountinfo"
          title="AccountInfo"
          icon={() => <Icon name="md-information-circle" />}
        >
          <Scene key="accountinfo" component={AccountInfo} />
        </Stack>
      </Tabs>
    </Scene>
    <Scene key="aution" title="Auction" component={AuctionListContainer} Layout={Auction} />
  </Stack>
);

export default routers;
