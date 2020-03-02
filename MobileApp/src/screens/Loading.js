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
    Alert,
    StyleSheet,
} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import auth from '@react-native-firebase/auth';
import colors from './../styles/colors';
import {getGenerateTokenArchGIS} from './GenerateTokenArchGIS';
import {saveUserToken} from './UtilsHelper';
import {getUserToken} from './UtilsHelper';

export default class Loading extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: null,
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            loadingLabel: 'Sedang Memuat..',
            loading: true,
            access_token: '',
            expires_in: '',
            date: new Date(),
        };
    }

    componentDidMount() {
        if (this.state.loading) {
            this.fetchGenerateToken();
        }
        this.fetchGetToken();
    }

    setHandlerUserLogin() {
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

    fetchGetToken = () => {
        getUserToken('accessToken')
            .then(data => {
                console.log(`accessToken: ${data}`);
            })
            .catch(err => {
                alert(`getUserToken: ${err}`);
            });
    };

    fetchGenerateToken = () => {
        getGenerateTokenArchGIS()
            .then(data => {
                this.setState({
                    accessToken: data.access_token,
                    loading: false,
                });
                saveUserToken('accessToken', data.access_token).then();
                console.log(`DateNow: ${this.state.date}`);

                this.setHandlerUserLogin();
            })
            .catch(error =>
                Alert.alert('Pemberitahuan', `${error}`, [
                    {
                        text: 'OK',
                        onPress: async () => {
                            this.fetchGenerateToken();
                        },
                    },
                ]),
            );
    };

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <StatusBar
                        backgroundColor={colors.green01}
                        barStyle="dark-content"
                    />
                    <Text>Memeriksa Token..</Text>
                    <ActivityIndicator size="large" />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <StatusBar
                        backgroundColor={colors.green01}
                        barStyle="dark-content"
                    />
                    <Text>Sedang Memuat..</Text>
                    <ActivityIndicator size="large" />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
