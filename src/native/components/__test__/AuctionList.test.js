import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

// imported as a connected component!
import AuctionList from '../AuctionList';

import getAuctions from '../../../actions/AuctionList';

const middlewares = []; // you can mock any middlewares here if necessary

const initialState = {
  auctioins: [{
          key: 0,
          name: 'Kyle',
          image: 'http://ec2-54-92-55-120.ap-northeast-1.compute.amazonaws.com:3000/images/scottish-terrier.jpeg',
          age: '5',
          breed: 'Test breed',
          location: 'Auckland',
          adopted: false
  }]
};

describe('Testing AuctionList', () => {
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it('renders as expected', () => {
    const wrapper = shallow(<AuctionList />, { context: { store: mockStore(initialState) } });
    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('getauction action', async () => {
    await mockStore.dispatch(getAuctions());
    expect(mockStore.getActions()).toMatchSnapshot();
  });
});
