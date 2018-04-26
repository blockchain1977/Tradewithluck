export default function auctionListReducer(
  state = { autions: [{ kye: "Test" }, { key: "Try" }] },
  action = {}
) {
  const { type, payload } = action;
  switch (type) {
    case "AUCTIONS_UPDATE":
      return Object.assign({}, state, {
        auctions: payload
      });
    default:
      return state;
  }
}
