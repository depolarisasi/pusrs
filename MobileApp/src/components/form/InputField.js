/*
 * Created on Thu Sep 12 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import colors from './../../styles/colors';

export default class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secureInput: !(props.inputType === 'text' || props.inputType === 'email'),
      inputValue: props.defaultValue,
    };
    this.toggleShowPassword = this.toggleShowPassword.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  toggleShowPassword() {
    this.setState({ secureInput: !this.state.secureInput });
  }

  onChangeText(text) {
    this.props.onChangeText(text);
    this.setState({ inputValue: text });
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
      autoFocus,
      autoCapitalize,
      placeholder,
      input,
      error
    } = this.props;
    const { secureInput, inputValue } = this.state;
    const fontSize = labelTextSize || 14;
    const fontWeight = labelTextWeight || '700';
    const color = labelColor || colors.white;
    const inputColor = textColor || colors.white;
    const borderBottom = borderBottomColor || 'transparent';
    const keyboardType = inputType == 'email' ? 'email-address' : 'default';
    const customInputStyle = inputStyle || {};
    if (!inputStyle || inputStyle && !inputStyle.paddingBottom) {
      customInputStyle.paddingBottom = 5;
    }

    return (
      <View style={[customStyle, styles.wrapper]}>
        <Text style={[{ fontWeight, color, fontSize }, styles.label]}>
          {labelText}
        </Text>
        {inputType === 'password'
          ? (
            <TouchableOpacity
              style={styles.showButton}
              onPress={this.toggleShowPassword}
            >
              <Text style={styles.showButtonText}>
                {secureInput ? 'Tampilkan' : 'Sembunyikan'}
              </Text>
            </TouchableOpacity>
          )
          : null}
        <TextInput
          style={[{ color: inputColor, borderBottomColor: borderBottom }, inputStyle, styles.inputField]}
          secureTextEntry={secureInput}
          onChangeText={input.onChange}
          keyboardType={keyboardType}
          autoFocus={autoFocus}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          underlineColorAndroid="transparent"
          placeholder={placeholder}
          defaultValue={inputValue}
          value={input.value}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
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
  autoFocus: PropTypes.bool,
  autoCapitalize: PropTypes.bool,
  labelTextWeight: PropTypes.string,
  inputStyle: PropTypes.object,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
  },
  label: {
    marginBottom: 20,
  },
  inputField: {
    borderBottomWidth: 1,
    paddingTop: 5,
  },
  showButton: {
    position: 'absolute',
    right: 0,
  },
  showButtonText: {
    color: colors.white,
    fontWeight: '700',
  },
  errorText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.red01,
  },
});