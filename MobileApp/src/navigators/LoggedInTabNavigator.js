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
import Legend from './../screens/Legend';
import colors from './../styles/colors';

import PDFCollectionScreen from './../screens/Profile/PDFCollection';

const MapTab = createStackNavigator({
  MapContainer: {
    screen: MapContainer
  },
  Legend: {
    screen: Legend,
    navigationOptions: {
      title: 'Legend',
      headerStyle: {
        backgroundColor: colors.green01,
      },
      headerTintColor: colors.white,
      headerTitleStyle: {
        fontWeight: '500',
      },
    }
  },
});

const ProfileTab = createStackNavigator({
  ProfileContainer: {
    screen: ProfileContainer
  },
  PDFCollection: {
    screen: PDFCollectionScreen
  },
});

ProfileTab.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const NewsTab = createStackNavigator({
  NewsContainer: {
    screen: NewsContainer
  },
});

const VideosTab = createStackNavigator({
  VideoContainer: {
    screen: VideoContainer
  },
});

const ToDoTab = createStackNavigator({
  ToDoContainer: {
    screen: ToDoContainer
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
    screen: ProfileTab,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: CustomTabBarIcon('ios-person', 22),
    },
  },
  News: {
    screen: NewsTab,
    navigationOptions: {
      tabBarLabel: 'News',
      tabBarIcon: CustomTabBarIcon('ios-paper', 22),
    },
  },
  Video: {
    screen: VideosTab,
    navigationOptions: {
      tabBarLabel: 'Videos',
      tabBarIcon: CustomTabBarIcon('ios-videocam', 22),
    },
  },
  ToDo: {
    screen: ToDoTab,
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
  backBehavior: 'none',
});

export default LoggedInTabNavigator;