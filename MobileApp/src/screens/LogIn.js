/*
 * Created on Thu Sep 12 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StatusBar,
  View,
  Text,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { Field, reduxForm } from 'redux-form';
import NavBarButton from './../components/buttons/NavBarButton';
import styles from './styles/Authentication';
import colors from './../styles/colors';
import transparentHeaderStyle from './../styles/navigation';
import InputField from './../components/form/InputField';
import RoundedButton from './../components/buttons/RoundedButton';

const imgBg = require('./../img/bg.jpg');

class LogIn extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <NavBarButton
      handleButtonPress={() => navigation.goBack()}
      location="left"
      icon={<Icon name="angle-left" color={colors.white} size={30} />}
    />,
    headerStyle: transparentHeaderStyle,
    headerTransparent: true,
    headerTintColor: colors.white,
  });

  constructor(props) {
    super(props);
    this.state = {
      formValid: true,
      validEmail: false,
      emailAddress: '',
      password: '',
      validPassword: false,
    };

    this.onContinuePress = this.onContinuePress.bind(this);
  }

  onContinuePress() {
    this.props.navigation.navigate('LoggedIn');
  }

  renderInput({
    input,
    label,
    type,
    showCheckmark,
    meta: {
      touched,
      error,
      warning
    }
  }) {
    const hasError = error === undefined;
    return <InputField
      {...input}
      labelText={label}
      labelTextSize={12}
      labelColor={colors.white}
      textColor={colors.white}
      borderBottomColor={colors.white}
      inputType={type}
      customStyle={{ marginBottom: 30 }}
      onChangeText={() => {}}
      showCheckmark={showCheckmark}
    />;
  }

  render() {
    const {
      formValid,
      validEmail,
      validPassword
    } = this.state;
    return (
      <ImageBackground source={imgBg} style={styles.bg}>
        <KeyboardAvoidingView
          style={styles.wrapper}
          behavior="padding"
        >
          <StatusBar translucent backgroundColor={colors.transparent} barStyle="dark-content" />
          <View style={styles.scrollViewWrapper}>
            <ScrollView style={styles.scrollView}>
              <View style={styles.topWrapper}>
                <Text style={styles.titleText}>
                  Masuk
                </Text>
              </View>
              <Field
                name="email"
                label="ALAMAT EMAIL"
                type="text"
                showCheckmark={validEmail}
                component={this.renderInput}
              />
              <Field
                name="password"
                label="PASSWORD"
                type="password"
                showCheckmark={validPassword}
                component={this.renderInput}
              />
              <View style={styles.bottomWrapper}>
                <RoundedButton
                  text="Masuk"
                  textColor={colors.blue01}
                  background={colors.gray03}
                  borderColor={colors.transparent}
                  handleOnPress={this.onContinuePress}
                />
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

LogIn.propTypes = {
  logIn: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
};

export default reduxForm({
  form: 'loginForm'
})(LogIn);