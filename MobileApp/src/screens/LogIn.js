/*
 * Created on Thu Sep 12 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
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

class LogIn extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: <NavBarButton
      handleButtonPress={() => {}}
      location="right"
      color={colors.white}
      text="Forgot Password"
    />,
    headerLeft: <NavBarButton
      handleButtonPress={() => {}}
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
  }

  render() {
    const {
      formValid,
      validEmail,
      validPassword
    } = this.state;
    const background = colors.green01;
    return (
      <KeyboardAvoidingView
        style={[{ backgroundColor: background }, styles.wrapper]}
        behavior="padding"
      >
        <View style={styles.scrollViewWrapper}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.loginHeader}>
              Log In
            </Text>
            <InputField
              labelText="EMAIL ADDRESS"
              labelTextSize={14}
              labelColor={colors.white}
              textColor={colors.white}
              borderBottomColor={colors.white}
              inputType="email"
              customStyle={{ marginBottom: 30 }}
              onChangeText={() => {}}
              showCheckmark={validEmail}
              autoFocus
            />
            <InputField
              labelText="PASSWORD"
              labelTextSize={14}
              labelColor={colors.white}
              textColor={colors.white}
              borderBottomColor={colors.white}
              inputType="password"
              customStyle={{ marginBottom: 30 }}
              onChangeText={() => {}}
              showCheckmark={validPassword}
              autoFocus
            />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  
});

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

LogIn.propTypes = {

};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);