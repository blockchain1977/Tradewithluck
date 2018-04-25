import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const middleware = [thunk];

const setupStore = () => {
  const store = createStore(
    reducer,
    applyMiddleware(...middleware),
  );

  return store;
};

export default setupStore;