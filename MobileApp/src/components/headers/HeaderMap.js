/*
 * Created on Thu Oct 03 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import colors from './../../styles/colors';

export default class HeaderMap extends Component {
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.col}>
                    <TouchableOpacity
                        onPress={navigation.getParam('toggleDrawer')}>
                        <Icon name="ios-menu" color={colors.white} size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={navigation.getParam('onLogOutPress')}>
                        <Text style={styles.text}>Log-out</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.col}>
                    <Text style={[styles.text, styles.bold]}>Map</Text>
                    <TouchableOpacity
                        onPress={navigation.getParam('onBntShowUserLocation')}>
                        <Icon
                            name="ios-compass"
                            color={colors.gray03}
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.col}>
                    <TouchableOpacity
                        onPress={navigation.getParam('showActionSheet')}>
                        <Icon name="ios-add" color={colors.gray03} size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Legend')}>
                        <Text style={styles.text}>Legend</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

HeaderMap.propTypes = {
    //
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: colors.green01,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    col: {
        height: 50,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
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
