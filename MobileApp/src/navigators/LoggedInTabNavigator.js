/*
 * Created on Thu Oct 03 2019
 *
 * Copyright (c) 2019 Justin
 */

import React from 'react';
import {PropTypes} from 'prop-types';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import MapContainer from './../containers/MapContainer';
import ProfileContainer from './../containers/ProfileContainer';
import NewsContainer from './../containers/NewsContainer';
import VideoContainer from './../containers/VideoContainer';
import ToDoContainer from './../containers/ToDoContainer';
import ProbableCases from '../screens/ProbableCases/ProbableCases';
import MoquitoCases from '../screens/MoquitoCases/MoquitoCases';
import DetailMoquitoCases from '../screens/MoquitoCases/DetailMoquitoCases';
import DetailProbableCases from '../screens/ProbableCases/DetailProbableCases';
import Legend from './../screens/Legend';
import colors from './../styles/colors';

import PDFCollectionScreen from './../screens/Profile/PDFCollection';
import ClinicalDataScreen from './../screens/Profile/ClinicalData';
import UpdateProfileScreen from './../screens/Profile/UpdateProfile';
import SignAndSymptoms from '../screens/Profile/SignAndSymptoms';

const MapTab = createStackNavigator({
    MapContainer: {
        screen: MapContainer,
    },
    ProbableCases: {
        screen: ProbableCases,
    },
    MoquitoCases: {
        screen: MoquitoCases,
    },
    DetailMoquitoCases: {
        screen: DetailMoquitoCases,
    },
    DetailProbableCases: {
        screen: DetailProbableCases,
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
        },
    },
});

MapTab.navigationOptions = ({navigation}) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    };
};
const ProfileTab = createStackNavigator({
    ProfileContainer: {
        screen: ProfileContainer,
    },
    PDFCollection: {
        screen: PDFCollectionScreen,
    },
    ClinicalData: {
        screen: ClinicalDataScreen,
    },
    UpdateProfile: {
        screen: UpdateProfileScreen,
    },
    SignAndSymptoms: {
        screen: SignAndSymptoms,
    },
});

ProfileTab.navigationOptions = ({navigation}) => {
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
        screen: NewsContainer,
    },
});

const VideosTab = createStackNavigator({
    VideoContainer: {
        screen: VideoContainer,
    },
});

const ToDoTab = createStackNavigator({
    ToDoContainer: {
        screen: ToDoContainer,
    },
});

const CustomTabBarIcon = (name, size) => {
    const icon = ({tintColor}) => (
        <Icon name={name} size={size} color={tintColor} />
    );

    icon.propTypes = {
        tintColor: PropTypes.string.isRequired,
    };

    return icon;
};

const LoggedInTabNavigator = createBottomTabNavigator(
    {
        Map: {
            screen: MapTab,
            navigationOptions: {
                tabBarLabel: 'Peta',
                tabBarIcon: CustomTabBarIcon('ios-map', 22),
            },
        },
        Profile: {
            screen: ProfileTab,
            navigationOptions: {
                tabBarLabel: 'Profil',
                tabBarIcon: CustomTabBarIcon('ios-person', 22),
            },
        },
        News: {
            screen: NewsTab,
            navigationOptions: {
                tabBarLabel: 'Berita',
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
    },
    {
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
    },
);

export default LoggedInTabNavigator;
