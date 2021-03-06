/*
 * Created on Sat Sep 14 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableHighlight, StyleSheet, View} from 'react-native';
import colors from './../../styles/colors';

const buttonSize = 60;
const buttonWrapperPadding = 0;

export default class NextArrowButton extends Component {
    render() {
        const {disabled, handleNextButton} = this.props;
        const opacityStyle = disabled ? 0.2 : 0.6;
        return (
            <View style={styles.buttonWrapper}>
                <TouchableHighlight
                    style={[{opacity: opacityStyle}, styles.button]}
                    onPress={handleNextButton}
                    disabled={disabled}>
                    <Icon
                        name="angle-right"
                        color={colors.gray01}
                        size={32}
                        style={styles.icon}
                    />
                </TouchableHighlight>
            </View>
        );
    }
}

NextArrowButton.propTypes = {
    disabled: PropTypes.bool,
    handleNextButton: PropTypes.func,
};

const styles = StyleSheet.create({
    buttonWrapper: {
        alignItems: 'flex-end',
        right: 20,
        bottom: 20,
        paddingTop: buttonWrapperPadding,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        width: buttonSize,
        height: buttonSize,
        backgroundColor: colors.gray02,
    },
    icon: {
        marginRight: -2,
        marginTop: -2,
    },
});
