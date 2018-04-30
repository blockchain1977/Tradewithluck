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
          location: item.location
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
    default:
      return state;
  }
}
