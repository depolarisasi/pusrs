/*
 * Created on Thu Sep 12 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { setLicenseKey } from 'react-native-arcgis-mapview';
import { Root, configureStore } from './src/navigators/AppNavigator';

class App extends Component {
  constructor(props) {
    super(props);
    
    setLicenseKey('runtimelite,1000,rud1706202086,none,S080TK8ELBK0F5KHT118');
  }

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