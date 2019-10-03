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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from './../redux/actions';
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
                  Log In
                </Text>
              </View>
              <InputField
                labelText="EMAIL ADDRESS"
                labelTextSize={12}
                labelColor={colors.white}
                textColor={colors.white}
                borderBottomColor={colors.white}
                inputType="email"
                customStyle={{ marginBottom: 30 }}
                onChangeText={() => {}}
                showCheckmark={validEmail}
              />
              <InputField
                labelText="PASSWORD"
                labelTextSize={12}
                labelColor={colors.white}
                textColor={colors.white}
                borderBottomColor={colors.white}
                inputType="password"
                customStyle={{ marginBottom: 30 }}
                onChangeText={() => {}}
                showCheckmark={validPassword}
              />
              <View style={styles.bottomWrapper}>
                <RoundedButton
                  text="Continue"
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

const mapStateToProps = state => ({
  
});

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

LogIn.propTypes = {
  logIn: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);