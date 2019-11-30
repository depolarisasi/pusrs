/*
 * Created on Thu Oct 03 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  StatusBar,
  Dimensions,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import colors from './../styles/colors';
import HeaderTitleOnly from './../components/headers/HeaderTitleOnly';
import Carousel from 'react-native-snap-carousel';

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const slideHeight = viewportHeight * 0.75;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);
const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;
const entryBorderRadius = 8;

class ProfileContainer extends Component {
  static navigationOptions = () => {
    return {
      header: () => <HeaderTitleOnly title="Profile" />,
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      entries: [
        {img: require('./../img/carousels/1.jpg'), title: 'Profile'},
        {img: require('./../img/carousels/2.jpg'), title: 'Sign and Symptoms'},
        {img: require('./../img/carousels/3.jpg'), title: 'Clinical Date'},
        {img: require('./../img/carousels/4.jpg'), title: 'PDF Collection'},
      ]
    };
  }

  renderItem({item, index}) {
    return (
      <View style={styles.sliderInnerContainer}>
        <View style={styles.imageContainer}>
          <Image source={item.img} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <StatusBar backgroundColor={colors.green01} barStyle="dark-content" />
        <Carousel
          ref={c => { this._carousel = c; }}
          data={this.state.entries}
          renderItem={this.renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.green01,
  },
  sliderInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18,
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
    letterSpacing: 0.5
  },
});

export default ProfileContainer;