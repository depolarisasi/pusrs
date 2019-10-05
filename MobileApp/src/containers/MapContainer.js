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
  Dimensions,
  StyleSheet,
} from 'react-native';
import colors from './../styles/colors';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <StatusBar backgroundColor={colors.green01} barStyle="dark-content" />
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={this.state.region}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapContainer;