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
  Image,
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
const imgUser = require('./../img/user.png');

class SignUp extends Component {
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
      validUsername: false,
      validEmail: false,
      username: '',
      emailAddress: '',
      password: '',
      validPassword: false,
    };

    this.onContinuePress = this.onContinuePress.bind(this);
  }

  onContinuePress() {
    //
  }

  render() {
    const {
      formValid,
      validUsername,
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
                  Daftar
                </Text>
                <Image
                  source={imgUser}
                  style={styles.imgUser}
                />
                <Text style={styles.changeImgText}>
                  Tekan untuk Mengubah
                </Text>
              </View>
              <InputField
                labelText="USERNAME"
                labelTextSize={12}
                labelColor={colors.white}
                textColor={colors.white}
                borderBottomColor={colors.white}
                inputType="text"
                customStyle={{ marginBottom: 30 }}
                onChangeText={() => {}}
                showCheckmark={validUsername}
              />
              <InputField
                labelText="ALAMAT EMAIL"
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
              <RoundedButton
                text="Daftar"
                textColor={colors.blue01}
                background={colors.gray03}
                borderColor={colors.transparent}
                handleOnPress={this.onContinuePress}
              />
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

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);