/*
 * Created on Wed Dec 11 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, { Component } from 'react';
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import colors from './../styles/colors';
import HeaderForm from './../components/headers/HeaderForm';

class ProbableCases extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => <HeaderForm navigation={navigation} />,
    }
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <StatusBar backgroundColor={colors.green01} barStyle="dark-content" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.black,
  },
});

export default ProbableCases;