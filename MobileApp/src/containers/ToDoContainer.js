/*
 * Created on Thu Oct 03 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import colors from './../styles/colors';
import HeaderToDo from './../components/headers/HeaderToDo';

const TODOS = [
  {id: 1, name: 'TASK 1'},
  {id: 2, name: 'TASK 2'},
  {id: 3, name: 'TASK 3'},
  {id: 4, name: 'TASK 4'},
  {id: 5, name: 'TASK 5'},
  {id: 6, name: 'TASK 6'},
  {id: 7, name: 'TASK 7'},
  {id: 8, name: 'TASK 8'},
  {id: 9, name: 'TASK 9'},
  {id: 10, name: 'TASK 10'},
];

class ToDoContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => <HeaderToDo navigation={navigation} />,
    }
  };

  constructor(props) {
    super(props);
  }

  renderListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: colors.gray04,
        }}
      />
    );
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <StatusBar backgroundColor={colors.green01} barStyle="dark-content" />
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={TODOS}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.listRow}>
              <View style={styles.listLeft}>
                <Text>{item.name}</Text>
              </View>
              <View style={styles.listRight}>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.listButton}>Add Reminder</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ItemSeparatorComponent={this.renderListItemSeparator}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.gray02,
  },
  listContainer: {
    padding: 10,
    backgroundColor: colors.white,
  },
  listRow: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: colors.white,
  },
  listLeft: {
    flex: 7,
  },
  listRight: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  listButton: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.green01,
  },
});

export default ToDoContainer;