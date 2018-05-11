import React from 'react';
import setupStore from './src/redux/stores';
import AppRoot from './src/native/AppRoot';
import './shim.js'

const store = setupStore();

export default function App() {
  return <AppRoot store={store} />;
}
