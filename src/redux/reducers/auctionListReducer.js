export default function auctionListReducer(
  state = { auctions: [{ key: 'Test', image: 'http://images.clipartpanda.com/auctioneer-clipart-New-Auction-Gavel-Clip-Art-Logo.jpg' }] },
  action,
) {
  const { type, payload } = action;
  switch (type) {
    case 'AUCTIONS_UPDATE': {
      // return Object.assign([], state, {
      //   auctions: payload,
      // });
      let auctions = [];
      if (payload && typeof payload === 'object') {
        auctions = payload.map(item => ({
          key: item.key,
          image: item.image,
        }));
      }
      return {
        ...state,
        auctions,
      };
    }
    default:
      return state;
  }
}
