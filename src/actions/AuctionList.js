export function getAuctionList() {
  return dispatch =>
    dispatch({
      type: "AUCTIONS_UPDATE",
      payload: [{ kye: "Test" }, { key: "Try" }]
    });
}
