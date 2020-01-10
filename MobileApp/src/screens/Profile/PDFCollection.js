/*
 * Created on Thu Dec 05 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  StatusBar,
  View,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import colors from './../../styles/colors';
import HeaderTitleBackable from './../../components/headers/HeaderTitleBackable';

const PDF = [
  {id: 1, img: require('./../../img/pdf/1.jpg')},
  {id: 2, img: require('./../../img/pdf/2.jpg')},
  {id: 3, img: require('./../../img/pdf/3.jpg')},
  {id: 4, img: require('./../../img/pdf/4.jpg')},
  {id: 5, img: require('./../../img/pdf/5.jpg')},
  {id: 6, img: require('./../../img/pdf/6.jpg')},
];

class PDFCollection extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => <HeaderTitleBackable navigation={navigation} title="PDF Collection" />,
    }
  };

  renderItem({item, index}) {
    return (
      <View style={styles.pdfInnerContainer}>
        <View style={styles.imageContainer}>
          <Image source={item.img} style={styles.image} />
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <StatusBar backgroundColor={colors.green01} barStyle="dark-content" />
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={PDF}
          renderItem={this.renderItem}
          numColumns={2}
          keyExtractor={(item, index) => `pdf-${item.id}`}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  listContainer: {
    padding: 10,
  },
  pdfInnerContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 5,
  },
  imageContainer: {
    height: 300,
    backgroundColor: colors.white,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
});

export default PDFCollection;