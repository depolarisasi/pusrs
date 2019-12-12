/*
 * Created on Thu Dec 12 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';
import colors from './../../styles/colors';

class Attachments extends Component {
  render() {
    return (
      <ScrollView style={styles.scrollView}>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 10,
  },
});

export default Attachments;