/*
 * Created on Sat Sep 14 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, { Component } from 'react';
import {
  StatusBar,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from './../styles/colors';
import transparentHeaderStyle from './../styles/navigation';
import NavBarButton from './../components/buttons/NavBarButton';
import styles from './styles/LoggedOut';

const unpadLogo = require('./../img/unpad-logo.png');

export default class LoggedOut extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: <NavBarButton
      handleButtonPress={() => navigation.navigate('LogIn')}
      location="right"
      color={colors.white}
      text="Log In"
    />,
    headerStyle: transparentHeaderStyle,
    headerTransparent: true,
    headerTintColor: colors.white,
  });

  render() {
    return (
      <ScrollView style={styles.wrapper}>
        <StatusBar backgroundColor={colors.green01} barStyle="light-content" />
        <View style={styles.welcomeWrapper}>
          <Image
            source={unpadLogo}
            style={styles.logo}
          />
          <Text style={styles.welcomeText}>
            Welcome to PUSRS.
          </Text>
        </View>
      </ScrollView>
    );
  }
}