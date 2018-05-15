import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// imported as a connected component!
import AuctionList from '../AuctionList';

import getAuctions from '../../../actions/AuctionList';

configure({ adapter: new Adapter() });

const middlewares = [thunk]; // you can mock any middlewares here if necessary

const initialState = {
  auctioins: [
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

describe('Testing AuctionList', () => {
  const mockStore = configureStore(middlewares);

  // beforeEach(() => {
  //   mockStore.clearActions();
  // });

  it('renders as expected', () => {
    const wrapper = shallow(<AuctionList />, { context: { store: mockStore(initialState) } });
    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('getauction action', async () => {
    await mockStore.dispatch(getAuctions());
    expect(mockStore.getActions()).toMatchSnapshot();
  });
});
