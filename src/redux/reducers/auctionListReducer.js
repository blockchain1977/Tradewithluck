export default function auctionListReducer(
  state = {
    auctions: [],
    fabstatus: false
  },
  action
) {
  const { type, payload } = action;
  switch (type) {
    case 'AUCTIONS_UPDATE': {
      let auctions = [];
      if (payload && typeof payload === 'object') {
        auctions = payload.map(item => ({
          key: item.key,
          name: item.name,
          image: item.image,
          age: item.age,
          breed: item.breed,
          location: item.location,
          adopted: item.adopted
        }));
      }
      return {
        ...state,
        auctions
      };
    }
    case 'TOGGLE_FAB': {
      return { ...state, fabstatus: !state.fabstatus };
    }
    case 'AUCTIONS_ITEM_BID': {
      const auctions = state.auctions.slice();
      auctions[payload].adopted = true;
      return { ...state, auctions };
    }
    default:
      return state;
  }
}
