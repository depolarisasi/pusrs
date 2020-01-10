import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import colors from './../../styles/colors';

const POSTS = [
  {id: 1, name: '1 month ago'},
  {id: 2, name: '2 months ago'},
  {id: 3, name: '2 months ago'},
  {id: 4, name: '2 months ago'},
  {id: 5, name: '2 months ago'},
  {id: 6, name: '2 months ago'},
  {id: 7, name: '2 months ago'},
  {id: 8, name: '2 months ago'},
  {id: 9, name: '2 months ago'},
  {id: 10, name: '2 months ago'},
];

class Timeline extends Component {
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
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.text, styles.bold]}>Timeline</Text>
          <View style={styles.right}>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.text}>Add post</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={POSTS}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.listRow}>
              <View style={styles.listLeft} />
              <View style={styles.listRight}>
                <Text style={styles.listRightText}>{item.name}</Text>
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
  container: {
    flex: 1,
    backgroundColor: colors.green01,
  },
  header: {
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    width: 100,
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
  listContainer: {
    padding: 10,
    backgroundColor: colors.white,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  listLeft: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: colors.gray02,
  },
  listRight: {
    padding: 10,
  },
  listRightText: {
    fontSize: 12,
  },
});

export default Timeline;