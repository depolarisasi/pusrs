/*
 * Created on Sat Nov 02 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, { Component } from 'react';
import {
  StatusBar,
  View,
  Text,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import auth from '@react-native-firebase/auth';
import colors from './../styles/colors';

export default class Loading extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    }
  };

  componentDidMount() {
    setTimeout(() => {
      auth().onAuthStateChanged(user => {
        this.props.navigation.navigate(user ? 'LoggedIn' : 'LoggedOut');
      });
    }, 2000);
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.green01} barStyle="dark-content" />
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});