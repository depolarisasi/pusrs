/*
 * Created on Sat Sep 14 2019
 *
 * Copyright (c) 2019 Justin
 */

 import React, { Component } from 'react';
 import { PropTypes } from 'prop-types';
 import {
   StatusBar,
   View,
   Text,
 } from 'react-native';
 import colors from './../styles/colors';

 export default class Home extends Component {
   render() {
     return (
       <View style={{ flex: 1, backgroundColor: colors.green01 }}>
        <StatusBar backgroundColor={colors.green01} barStyle="light-content" />
       </View>
     );
   }
 }