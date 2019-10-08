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
import DrawerLayout from 'react-native-drawer-layout';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import HeaderMap from './../components/headers/HeaderMap';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => 
        <HeaderMap toggleDrawer={navigation.getParam('toggleDrawer')} />,
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      drawerActive: false,
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({ toggleDrawer: this.toggleDrawer });
  }

  toggleDrawer() {
    const { drawerActive } = this.state;

    if (drawerActive) {
      this.drawer.closeDrawer();
    } else {
      this.drawer.openDrawer();
    }
  }

  render() {
    const navigationView = (
      <View>
        <Text>Hello there!</Text>
      </View>
    );

    return (
      <View style={styles.wrapper}>
        <StatusBar backgroundColor={colors.green01} barStyle="dark-content" />
        <DrawerLayout
          drawerBackgroundColor={colors.white}
          drawerWidth={300}
          ref={drawer => {
            return (this.drawer = drawer);
          }}
          renderNavigationView={() => navigationView}
          onDrawerOpen={() => this.setState({ drawerActive: true })}
          onDrawerClose={() => this.setState({ drawerActive: false })}
        >
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={this.state.region}
          />
        </DrawerLayout>
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