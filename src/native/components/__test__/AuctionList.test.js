import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// imported as a connected component!
import AuctionList from '../AuctionList';

configure({ adapter: new Adapter() });

const setup = state => {
  const actions = { toggleFAB: jest.fn(), adoptPet: jest.fn() };
  const component = shallow(
    <AuctionList auctions={state.auctions} fabstatus={state.fabstatus} {...actions} />
  );

  return {
    component,
    actions,
    fab: component.find('[position="bottomRight"]')
  };
};

describe('Testing AuctionList', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
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
  });

  it('check rendered', () => {
    const { component } = setup(initialState);
    expect(component.dive()).toMatchSnapshot();
  });

  it('check rendered 2', () => {
    const { component } = setup({ auctions: initialState.auctions, fabstatus: true });
    expect(component.dive()).toMatchSnapshot();
  });
});
