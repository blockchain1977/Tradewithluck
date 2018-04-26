import { combineReducers } from "redux";
import auctionListReducer from "./reducers/auctionListReducer";

const reducer = combineReducers({ auctions: auctionListReducer });

export default reducer;
