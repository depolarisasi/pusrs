/*
 * Created on Thu Oct 03 2019
 *
 * Copyright (c) 2019 Justin
 */

import React from 'react';
import { PropTypes } from 'prop-types';
import {
  createBottomTabNavigator
} from 'react-navigation-tabs';
import {
  createStackNavigator
} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import MapContainer from './../containers/MapContainer';
import ProfileContainer from './../containers/ProfileContainer';
import NewsContainer from './../containers/NewsContainer';
import VideoContainer from './../containers/VideoContainer';
import ToDoContainer from './../containers/ToDoContainer';
import colors from './../styles/colors';
import HeaderMap from './../components/headers/HeaderMap';

const MapTab = createStackNavigator({
  MapContainer: {
    screen: MapContainer,
    navigationOptions: {
      header: props => 
        <HeaderMap openDrawer={props.navigation.getParam('openDrawer')} />,
    },
  },
});

const CustomTabBarIcon = (name, size) => {
  const icon = ({ tintColor }) => (
    <Icon
      name={name}
      size={size}
      color={tintColor}
    />
  );

  icon.propTypes = {
    tintColor: PropTypes.string.isRequired,
  };

  return icon;
};

const LoggedInTabNavigator = createBottomTabNavigator({
  Map: {
    screen: MapTab,
    navigationOptions: {
      tabBarLabel: 'Map',
      tabBarIcon: CustomTabBarIcon('ios-map', 22),
    },
  },
  Profile: {
    screen: ProfileContainer,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: CustomTabBarIcon('ios-person', 22),
    },
  },
  News: {
    screen: NewsContainer,
    navigationOptions: {
      tabBarLabel: 'News',
      tabBarIcon: CustomTabBarIcon('ios-paper', 22),
    },
  },
  Video: {
    screen: VideoContainer,
    navigationOptions: {
      tabBarLabel: 'Video',
      tabBarIcon: CustomTabBarIcon('ios-videocam', 22),
    },
  },
  ToDo: {
    screen: ToDoContainer,
    navigationOptions: {
      tabBarLabel: 'To-Do',
      tabBarIcon: CustomTabBarIcon('ios-list', 22),
    },
  },
}, {
  tabBarOptions: {
    labelStyle: {
      fontWeight: '600',
      marginBottom: 5,
    },
    style: {
      backgroundColor: colors.green01,
    },
    activeTintColor: colors.white,
    inactiveTintColor: colors.gray03,
  },
  tabBarPosition: 'bottom',
});

export default LoggedInTabNavigator;