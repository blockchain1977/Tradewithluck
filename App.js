import React from "react";
import setupStore from "./src/redux/stores";
import AppRoot from './src/native/AppRoot';

const store = setupStore();

export default class App extends React.Component {
  render() {
    return <AppRoot store={store}/>;
  }
}