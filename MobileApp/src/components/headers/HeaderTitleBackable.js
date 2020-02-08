/*
 * Created on Thu Dec 05 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../styles/colors';

export default class HeaderTitleBackable extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.left}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}>
                        <Icon
                            name="ios-arrow-back"
                            size={24}
                            color={colors.white}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={[styles.text, styles.bold]}>
                    {this.props.title}
                </Text>
            </View>
        );
    }
}

HeaderTitleBackable.propTypes = {
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
    left: {
        width: 80,
        height: 50,
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
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
