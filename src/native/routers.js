import React from 'react';

import { Router, Scene, Tabs, Stack } from 'react-native-router-flux';
import { Icon } from 'native-base';

import AuctionList from './components/AuctionList';
import AccountInfo from './components/AccountInfo';

export default class routers extends React.Component {
    render() {
        return (
            <Router>
                <Stack>
                    <Scene hideNavBar>
                        <Tabs
                            key="tabbar"
                            swipeEnabled
                            type="replace"
                            showLabel={true}
                        >
                            <Stack
                                key="autionlist"
                                title="AuctionList"
                                icon={() => <Icon name="logo-bitcoin" />}
                            >
                                <Scene key="autionlist" component={AuctionList} />
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
                </Stack>
            </Router>
        );
    }
}
