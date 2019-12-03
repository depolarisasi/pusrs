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
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import colors from './../styles/colors';
import HeaderTitleOnly from './../components/headers/HeaderTitleOnly';

const entryBorderRadius = 8;
const VIDEOS = [
  {id: 1, img: require('./../img/mosquito1.jpg'), title: 'Dengue Virus', subtitle: 'This is an example of local video.'},
  {id: 2, img: require('./../img/mosquito2.jpg'), title: 'Dengue Symptoms and Treatment', subtitle: 'CNN Philippines'},
  {id: 3, img: require('./../img/mosquito3.jpg'), title: 'Dengue Virus', subtitle: 'This is an example of local video.'},
];

class VideoContainer extends Component {
  static navigationOptions = () => {
    return {
      header: () => <HeaderTitleOnly title="Videos" />,
    }
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <StatusBar backgroundColor={colors.green01} barStyle="dark-content" />
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={VIDEOS}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.videoContainer}>
              <View style={styles.imageContainer}>
                <Image source={item.img} style={styles.image} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              </View>
            </View>
          )}
          keyExtractor={item => `video-${item.id}`}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.gray05,
  },
  listContainer: {
    padding: 15,
  },
  videoContainer: {
    width: '100%',
    height: 300,
    marginBottom: 15,
  },
  imageContainer: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
  },
  textContainer: {
    justifyContent: 'center',
    paddingTop: 20 - entryBorderRadius,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius
  },
  title: {
    color: colors.black,
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  subtitle: {
    color: colors.black,
    fontSize: 14,
    letterSpacing: 0.5,
    marginBottom: 10,
  },
});

export default VideoContainer;