/*
 * Created on Thu Oct 03 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import colors from './../../styles/colors';

export default class HeaderMap extends Component {
  render() {
    return (
      <View style={styles.container}></View>
    );
  }
}

HeaderMap.propTypes = {
  //
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: 50,
    backgroundColor: colors.green01,
  }
});