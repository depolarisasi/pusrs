/*
 * Created on Thu Sep 12 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import colors from './../../styles/colors';

export default class InputField extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      labelText,
      labelTextSize,
      labelTextWeight,
      labelColor,
      textColor,
      borderBottomColor,
      inputType,
      customStyle,
      inputStyle,
      onChangeText,
      showCheckmark,
      autoFocus,
      autoCapitalize,
      placeholder,
      defaultValue,
    } = this.props;
    const fontSize = labelText || 14;
    const fontWeight = labelTextWeight || '700';
    const color = labelColor || colors.white;

    return (
      <View style={[styles.wrapper]}>
        <Text style={[{ fontWeight, color, fontSize }, styles.label]}>
          {labelText}
        </Text>
        <TextInput
          style={[{ color: inputColor, borderBottomColor: borderBottom }, inputStyle, styles.inputField]}
          secureTextEntry={secureInput}
          onChangeText={this.onChangeText}
          keyboardType={keyboardType}
          autoFocus={autoFocus}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          underlineColorAndroid="transparent"
          placeholder={placeholder}
          defaultValue={inputValue}
          value={inputValue}
        />
      </View>
    );
  }
}

InputField.propTypes = {
  labelText: PropTypes.string.isRequired,
  labelTextSize: PropTypes.number,
  labelColor: PropTypes.string,
  textColor: PropTypes.string,
  borderBottomColor: PropTypes.string,
  inputType: PropTypes.string.isRequired,
  customStyle: PropTypes.object,
  onChangeText: PropTypes.func,
  showCheckmark: PropTypes.bool.isRequired,
  autoFocus: PropTypes.bool,
  autoCapitalize: PropTypes.bool,
  labelTextWeight: PropTypes.number,
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
  }
});