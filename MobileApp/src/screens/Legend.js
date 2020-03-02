/*
 * Created on Wed Oct 16 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, {Component} from 'react';
import {StatusBar, ScrollView, View, Text} from 'react-native';
import styles from './styles/Legend';
import colors from './../styles/colors';

const Pin = ({color}) => (
    <View style={[styles.pin, {backgroundColor: color}]} />
);

export default () => (
    <View style={styles.wrapper}>
        <StatusBar backgroundColor={colors.green01} barStyle="dark-content" />
        <View style={styles.scrollViewWrapper}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.legendItem}>
                    <Text style={styles.legendItemText}>Probable Cases</Text>
                    <Pin color={colors.blue01} />
                </View>
                <View style={styles.legendItem}>
                    <Text style={styles.legendItemText}>Mosquito Cases</Text>
                    <Pin color={colors.yellow01} />
                </View>
                {/*<View style={styles.legendItem}>*/}
                {/*    <Text style={styles.legendItemText}>Hospital Cases</Text>*/}
                {/*    <Pin color={colors.red01} />*/}
                {/*</View>*/}
                {/*<View style={styles.legendItem}>*/}
                {/*    <Text style={styles.legendItemText}>Tapographic</Text>*/}
                {/*</View>*/}
            </ScrollView>
        </View>
    </View>
);
