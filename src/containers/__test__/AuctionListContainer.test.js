import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { Stack, Scene, Tabs } from 'react-native-router-flux';
import { Icon, Root } from 'native-base';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

// imported as a connected component!
import AuctionListContainer from '../AuctionListContainer';

import AuctionList from '../../components/AuctionList';

const middlewares = [thunk]; // you can mock any middlewares here if necessary
const mockStore = configureStore(middlewares);

const initialState = {
  auctions: [
    {
      key: 0,
      name: 'Kyle',
      image: 'http://52.199.0.93:3000/images/scottish-terrier.jpeg',
      age: '5',
      breed: 'Test breed',
      location: 'Auckland',
      adopted: false
    }
  ],
  fabstatus: false
};

const store = mockStore(initialState);

configure({ adapter: new Adapter() });

const component = shallow(
  <Root>
    <Provider store={store}>
      <Stack>
        <Scene hideNavBar>
          <Tabs key="tabbar" swipeEnabled type="replace" showLabel>
            <Stack key="autionlist" title="AuctionList">
              <Scene key="autionlist" component={AuctionListContainer} Layout={AuctionList} />
            </Stack>
          </Tabs>
        </Scene>
      </Stack>
    </Provider>
  </Root>
);

describe('Test AuctionListContainer', () => {
  it('check rendered', () => {
    expect(component.dive()).toMatchSnapshot();
  });
});
