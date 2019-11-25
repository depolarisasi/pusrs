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

export default class HeaderToDo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.text, styles.bold]}>To-Do!</Text>
        <View style={styles.right}>
          <TouchableOpacity onPress={() => this.props.navigation.state.params.toggleModalAddToDo(true)}>
            <Text style={styles.text}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

HeaderToDo.propTypes = {
  //
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: colors.green01,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    width: 80,
    height: 50,
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '500',
    color: colors.white,
    marginHorizontal: 15,
  },
  bold: {
    fontWeight: 'bold',
  },
});