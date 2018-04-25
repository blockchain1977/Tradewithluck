import Store from "../stores";

export const initialState = Store;

export default auctionListReducer = (state = initialState, action = {} => {
  const { type, payload } = action;
  switch (type) {
    case 'ADD_AUCTION':
      return Object.assign({}, state, {
        chatLog: payload
      });
    case 'CHANGE_AUCTION':
      return Object.assign({}, state, {
        statusMessage: payload
      });
    default:
      return state;
  }
});
