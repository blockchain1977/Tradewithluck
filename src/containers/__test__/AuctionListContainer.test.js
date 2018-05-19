import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { Stack, Router } from 'react-native-router-flux';
import { Root } from 'native-base';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

// imported as a connected component!
import routers from '../../native/routers';

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
      <Router>
        <Stack key="root">{routers}</Stack>
      </Router>
    </Provider>
  </Root>
);

describe('Test AuctionListContainer', () => {
  it('check rendered', () => {
    expect(component.dive()).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Root>
          <Provider store={store}>
            <Router>
              <Stack key="root">{routers}</Stack>
            </Router>
          </Provider>
        </Root>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
