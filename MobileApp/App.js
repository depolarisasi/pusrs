/*
 * Created on Thu Sep 12 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, { Component } from 'react';
import { StatusBar, AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { Root, configureStore } from './src/navigators/AppNavigator';

StatusBar.setBarStyle('light-content', true);

class App extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <Root />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('App', () => App);

export default App;