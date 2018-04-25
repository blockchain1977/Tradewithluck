import { combineReducers } from 'redux'
import auctionListReducer from './reducers/auctionListReducer'

const reducer = combineReducers(auctionListReducer);

export default reducer;