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
import RoundedButton from './../components/buttons/RoundedButton';
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

  static onFacebookPress() {
    alert('Facebook button pressed');
  }

  static onCreateAccountPress() {
    alert('Create Account button pressed');
  }

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
          <RoundedButton
            text="Continue with Facebook"
            textColor={colors.green01}
            background={colors.white}
            icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
            handleOnPress={this.onFacebookPress}
          />
          <RoundedButton
            text="Create Account"
            textColor={colors.white}
            handleOnPress={this.onCreateAccountPress}
          />
        </View>
      </ScrollView>
    );
  }
}