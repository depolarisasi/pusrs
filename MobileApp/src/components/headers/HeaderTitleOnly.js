/*
 * Created on Fri Nov 29 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../../styles/colors';

export default class HeaderTitleOnly extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.text, styles.bold]}>
                    {this.props.title}
                </Text>
            </View>
        );
    }
}

HeaderTitleOnly.propTypes = {
    //
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: colors.green01,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: '500',
        color: colors.white,
        marginHorizontal: 15,
    },
    bold: {
        fontWeight: 'bold',
    },
});
