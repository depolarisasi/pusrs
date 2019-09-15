/*
 * Created on Sun Sep 15 2019
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
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from './../redux/actions';
import NavBarButton from './../components/buttons/NavBarButton';
import styles from './styles/LogIn';
import colors from './../styles/colors';
import transparentHeaderStyle from './../styles/navigation';
import InputField from './../components/form/InputField';
import NextArrowButton from './../components/buttons/NextArrowButton';

class SignUp extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <NavBarButton
      handleButtonPress={() => navigation.goBack()}
      location="left"
      icon={<Icon name="angle-left" color={colors.gray01} size={30} />}
    />,
    headerStyle: transparentHeaderStyle,
    headerTransparent: true,
    headerTintColor: colors.white,
  });

  constructor(props) {
    super(props);
    this.state = {
      formValid: true,
      validUsername: false,
      validEmail: false,
      username: '',
      emailAddress: '',
      password: '',
      validPassword: false,
    };

    this.handleNextButton = this.handleNextButton.bind(this);
  }

  handleNextButton() {
    const { navigation } = this.props;
    const { navigate } = navigation;

    navigate('Home');
  }

  toggleNextButtonState() {
    return false;
  }

  render() {
    const {
      formValid,
      validUsername,
      validEmail,
      validPassword
    } = this.state;
    const background = colors.white;
    return (
      <KeyboardAvoidingView
        style={[{ backgroundColor: background }, styles.wrapper]}
        behavior="padding"
      >
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <View style={styles.scrollViewWrapper}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.loginHeader}>
              Create Account
            </Text>
            <InputField
              labelText="USERNAME"
              labelTextSize={14}
              labelColor={colors.gray01}
              textColor={colors.gray01}
              borderBottomColor={colors.gray02}
              inputType="text"
              customStyle={{ marginBottom: 30 }}
              onChangeText={() => {}}
              showCheckmark={validUsername}
              autoFocus
            />
            <InputField
              labelText="EMAIL ADDRESS"
              labelTextSize={14}
              labelColor={colors.gray01}
              textColor={colors.gray01}
              borderBottomColor={colors.gray02}
              inputType="email"
              customStyle={{ marginBottom: 30 }}
              onChangeText={() => {}}
              showCheckmark={validEmail}
            />
            <InputField
              labelText="PASSWORD"
              labelTextSize={14}
              labelColor={colors.gray01}
              textColor={colors.gray01}
              borderBottomColor={colors.gray02}
              inputType="password"
              customStyle={{ marginBottom: 30 }}
              onChangeText={() => {}}
              showCheckmark={validPassword}
            />
          </ScrollView>
          <NextArrowButton
            handleNextButton={this.handleNextButton}
            disabled={this.toggleNextButtonState()}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  
});

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);