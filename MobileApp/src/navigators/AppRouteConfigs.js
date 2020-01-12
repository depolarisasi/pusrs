/*
 * Created on Thu Oct 03 2019
 *
 * Copyright (c) 2019 Justin
 */

import {createStackNavigator} from 'react-navigation-stack';
import Loading from './../screens/Loading';
import LoggedOut from './../screens/LoggedOut';
import LogIn from './../screens/LogIn';
import SignUp from './../screens/SignUp';
import PrivacyTerms from './../screens/PrivacyTerms';
import LoggedInTabNavigator from './LoggedInTabNavigator';

const AppRouteConfigs = createStackNavigator(
    {
        Loading: {screen: Loading},
        LoggedOut: {screen: LoggedOut},
        LogIn: {screen: LogIn},
        SignUp: {screen: SignUp},
        PrivacyTerms: {screen: PrivacyTerms},
        LoggedIn: {
            screen: LoggedInTabNavigator,
            navigationOptions: {
                header: null,
                gesturesEnabled: false,
            },
        },
    },
    {
        initialRouteName: 'Loading',
    },
);

export default AppRouteConfigs;
