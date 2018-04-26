import React from "react";

import { Scene, Tabs, Stack } from "react-native-router-flux";
import { Icon } from "native-base";

import AuctionListContainer from "../containers/AuctionListContainer";
import AuctionList from "./components/AuctionList";
import AccountInfo from "./components/AccountInfo";

export default class routers extends React.Component {
  render() {
    return (
      <Stack>
        <Scene hideNavBar>
          <Tabs key="tabbar" swipeEnabled type="replace" showLabel={true}>
            <Stack
              key="autionlist"
              title="AuctionList"
              icon={() => <Icon name="logo-bitcoin" />}
            >
              <Scene
                key="autionlist"
                component={AuctionListContainer}
                Layout={AuctionList}
              />
            </Stack>

            <Stack
              key="accountinfo"
              title="AccountInfo"
              icon={() => <Icon name="logo-bitcoin" />}
            >
              <Scene key="accountinfo" component={AccountInfo} />
            </Stack>
          </Tabs>
        </Scene>
        <Scene
          key="autionlist"
          component={AuctionListContainer}
          Layout={AuctionList}
        />
      </Stack>
    );
  }
}
