/*
 * Created on Thu Dec 12 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from './../../styles/colors';

class Attachments extends Component {
  render() {
    return (
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        style={styles.scrollView}
      >
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={() => {}}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>Add Attachment</Text>
          <Icon name="ios-camera" color={colors.green01} size={30} />
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  addButton: {
    backgroundColor: colors.gray05,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.green01,
  }
});

export default Attachments;