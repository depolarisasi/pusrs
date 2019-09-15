/*
 * Created on Sat Sep 14 2019
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
} from 'react-native';
import NavBarButton from './../components/buttons/NavBarButton';
import colors from './../styles/colors';
import transparentHeaderStyle from './../styles/navigation';

export default class Home extends Component {
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

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <View style={{
          flex: 1,
          display: 'flex',
          marginTop: 30,
          padding: 20,
        }}>
          <Text style={{
            fontSize: 30,
            color: colors.gray01,
            fontWeight: '300',
            marginBottom: 40,
          }}>
            This is Home.
          </Text>
        </View>
      </View>
    );
  }
}