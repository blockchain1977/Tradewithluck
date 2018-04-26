export default function auctionListReducer(
  state = { auctions: [{ key: 'Test' }, { key: 'Try' }] },
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
