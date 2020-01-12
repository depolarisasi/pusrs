/*
 * Created on Sat Nov 02 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, {Component} from 'react';
import {
    StatusBar,
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import auth from '@react-native-firebase/auth';
import colors from './../styles/colors';

export default class Loading extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: null,
        };
    };

    componentDidMount() {
        setTimeout(() => {
            auth().onAuthStateChanged(user => {
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({
                            routeName: user ? 'LoggedIn' : 'LoggedOut',
                        }),
                    ],
                });
                this.props.navigation.dispatch(resetAction);
            });
        }, 2000);
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={colors.green01}
                    barStyle="dark-content"
                />
                <Text>Loading</Text>
                <ActivityIndicator size="large" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
