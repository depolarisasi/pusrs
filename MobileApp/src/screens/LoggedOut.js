/*
 * Created on Sat Sep 14 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, { Component } from 'react';
import {
  StatusBar,
  Alert,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import colors from './../styles/colors';
import RoundedButton from './../components/buttons/RoundedButton';
import styles from './styles/LoggedOut';

const imgBg = require('./../img/bg.jpg');
const appIcon = require('./../img/app-icon.jpg');

export default class LoggedOut extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
  });

  constructor(props) {
    super(props);
    this.onLoginPress = this.onLoginPress.bind(this);
    this.onSignUpPress = this.onSignUpPress.bind(this);
  }

  onLoginPress() {
    setTimeout(() => this.props.navigation.navigate('LogIn'), 500);
  }

  onSignUpPress() {
    setTimeout(() => Alert.alert(
      'Privacy Policy and Terms & Conditions',
      'Do you agree with our Privacy Policy and Terms & Conditions?',
      [
        {text: 'No', style: 'cancel'},
        {text: 'Yes, I Agree', onPress: () => this.props.navigation.navigate('SignUp')},
      ]
    ), 500);
  }

  render() {
    return (
      <ImageBackground source={imgBg} style={styles.bg}>
        <ScrollView style={styles.wrapper}>
          <StatusBar translucent backgroundColor={colors.transparent} barStyle="dark-content" />
          <View style={styles.wrapperInner}>
            <Image
              source={appIcon}
              style={styles.appIcon}
            />
            <Text style={styles.appName}>Mozzify</Text>
            <View style={[styles.termsAndConditions, { marginTop: 50, marginBottom: 5 }]}>
              <Text style={styles.termsText}>
                By Signing up, you are agreeing to our
              </Text>
            </View>
            <View style={[styles.termsAndConditions, { marginBottom: 50 }]}>
              <TouchableHighlight>
                <Text style={[styles.termsText, styles.linkText]}>
                  Privacy Policy
                </Text>
              </TouchableHighlight>
              <Text style={styles.termsText}>
                {" and "}
              </Text>
              <TouchableHighlight>
                <Text style={[styles.termsText, styles.linkText]}>
                  Terms & Conditions
                </Text>
              </TouchableHighlight>
            </View>
            <RoundedButton
              text="Log In"
              textColor={colors.white}
              background={colors.transparent}
              borderColor={colors.white}
              handleOnPress={this.onLoginPress}
            />
            <RoundedButton
              text="Sign Up"
              textColor={colors.white}
              background={colors.transparent}
              borderColor={colors.white}
              handleOnPress={this.onSignUpPress}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}