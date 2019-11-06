/*
 * Created on Thu Oct 03 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Feather';
import {
  StatusBar,
  View,
  Text,
  Alert,
  Dimensions,
  StyleSheet,
} from 'react-native';
import colors from './../styles/colors';
import DrawerLayout from 'react-native-drawer-layout';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import ArcGISMapView from 'react-native-arcgis-mapview';
import auth from '@react-native-firebase/auth';
import HeaderMap from './../components/headers/HeaderMap';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -6.2103603;
const LONGITUDE = 106.7978743;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

class MapContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => 
        <HeaderMap navigation={navigation} />,
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
      markers: [],
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.onLogOutPress = this.onLogOutPress.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({
      toggleDrawer: this.toggleDrawer,
      onLogOutPress: this.onLogOutPress,
    });
  }

  onMapPress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
          color: randomColor(),
        }
      ]
    })
  }

  onLogOutPress() {
    Alert.alert(
      'Log out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: async () => {
          try {
            await auth().signOut();
            this.props.navigation.reset('LoggedOut');
          } catch (e) {
            console.log(e);
          }
        }},
      ],
    );
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
      <View style={styles.wrapper}>
        <View style={styles.drawerTop}>
          <Text style={styles.drawerTopText}>Log in</Text>
        </View>
        <View style={styles.drawerBottom}>
          <View style={[styles.drawerBottomRow, styles.drawerBottomFirstRow]}>
            <View style={styles.drawerBottomCol1}>
              <Icon2 name="cloud" color={colors.gray01} size={25} />
            </View>
            <View style={styles.drawerBottomCol2}>
              <Text style={styles.drawerBottomText}>Work Online</Text>
            </View>
          </View>
          <View style={[styles.drawerBottomRow, styles.drawerBottomYellow]}>
            <View style={styles.drawerBottomCol1}>
              <Icon2 name="cloud-off" color={colors.white} size={25} />
            </View>
            <View style={styles.drawerBottomCol2}>
              <Text style={[styles.drawerBottomText, { color: colors.white }]}>Working Offline</Text>
            </View>
          </View>
          <View style={styles.drawerBottomRow}>
            <View style={styles.drawerBottomCol1}>
              <Icon name="ios-sync" color={colors.gray01} size={25} />
            </View>
            <View style={styles.drawerBottomCol2}>
              <Text style={styles.drawerBottomText}>Synchronize Offline Map</Text>
              <Text style={[styles.drawerBottomText, { fontSize: 10 }]}>last sync 2019/07/05 14:27</Text>
            </View>
          </View>
          <View style={styles.drawerBottomRow}>
            <View style={styles.drawerBottomCol1}>
              <Icon name="ios-trash" color={colors.gray01} size={25} />
            </View>
            <View style={styles.drawerBottomCol2}>
              <Text style={styles.drawerBottomText}>Delete Offline Map</Text>
            </View>
          </View>
          <View style={styles.drawerFooter}>
            <Text style={styles.drawerFooterText}>Desumo 1.0 (8)</Text>
          </View>
        </View>
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
          {/* <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={this.state.region}
            onPress={e => this.onMapPress(e)}
          >
            {this.state.markers.map(marker => (
              <Marker
                key={marker.key}
                coordinate={marker.coordinate}
                pinColor={marker.color}
              />
            ))}
          </MapView> */}
          <ArcGISMapView
            ref={mapView => this.mapView = mapView}
            style={styles.map}
            initialMapCenter={[{
              latitude: LATITUDE,
              longitude: LONGITUDE,
            }]}
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
  drawerTop: {
    height: 80,
    padding: 20,
    backgroundColor: colors.gray01,
    justifyContent: 'center',
  },
  drawerTopText: {
    color: colors.white,
    fontSize: 14,
  },
  drawerBottom: {
    padding: 10,
    display: 'flex',
    flex: 1,
  },
  drawerBottomRow: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerBottomFirstRow: {
    borderBottomWidth: 2,
    borderBottomColor: colors.gray02,
  },
  drawerBottomCol1: {
    alignItems: 'center',
    width: 40,
    marginRight: 10,
  },
  drawerBottomCol2: {
    width: '100%',
  },
  drawerBottomText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray01,
  },
  drawerBottomYellow: {
    marginTop: 15,
    marginBottom: 10,
    height: 40,
    borderRadius: 3,
    backgroundColor: colors.yellow01,
  },
  drawerFooter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    padding: 10,
  },
  drawerFooterText: {
    color: colors.gray02,
    fontSize: 11,
    fontWeight: 'bold',
  },
});

export default MapContainer;