/*
 * Created on Thu Dec 12 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Text, TextInput} from 'react-native';
import colors from './../../styles/colors';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reportedBy: '',
            address: '',
            barangay: '',
            residence: '',
            condition: 'Probable Case',
            age: '',
            gender: '',
            lat: '',
            long: '',
            notes: '',
        };
    }

    render() {
        return (
            <ScrollView
                contentContainerStyle={{paddingBottom: 20}}
                style={styles.scrollView}>
                <View style={styles.formGroup}>
                    <Text style={styles.fieldLabel}>Reported by</Text>
                    <TextInput
                        value={this.state.reportedBy}
                        style={styles.fieldInput}
                        underlineColorAndroid="transparent"
                        onChangeText={reportedBy => this.setState({reportedBy})}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.fieldLabel}>Address</Text>
                    <TextInput
                        value={this.state.address}
                        style={styles.fieldInput}
                        underlineColorAndroid="transparent"
                        onChangeText={address => this.setState({address})}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.fieldLabel}>Barangay</Text>
                    <TextInput
                        value={this.state.barangay}
                        style={styles.fieldInput}
                        underlineColorAndroid="transparent"
                        onChangeText={barangay => this.setState({barangay})}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.fieldLabel}>Residence</Text>
                    <TextInput
                        value={this.state.residence}
                        style={styles.fieldInput}
                        underlineColorAndroid="transparent"
                        onChangeText={residence => this.setState({residence})}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.fieldLabel}>Condition</Text>
                    <TextInput
                        value={this.state.condition}
                        style={styles.fieldInput}
                        underlineColorAndroid="transparent"
                        onChangeText={condition => this.setState({condition})}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.fieldLabel}>Age</Text>
                    <TextInput
                        value={this.state.age}
                        style={styles.fieldInput}
                        underlineColorAndroid="transparent"
                        onChangeText={age => this.setState({age})}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.fieldLabel}>Gender</Text>
                    <TextInput
                        value={this.state.gender}
                        style={styles.fieldInput}
                        underlineColorAndroid="transparent"
                        onChangeText={gender => this.setState({gender})}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.fieldLabel}>Lat</Text>
                    <TextInput
                        value={this.state.lat}
                        style={styles.fieldInput}
                        underlineColorAndroid="transparent"
                        onChangeText={lat => this.setState({lat})}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.fieldLabel}>Long</Text>
                    <TextInput
                        value={this.state.long}
                        style={styles.fieldInput}
                        underlineColorAndroid="transparent"
                        onChangeText={long => this.setState({long})}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.fieldLabel}>Notes</Text>
                    <TextInput
                        value={this.state.notes}
                        style={styles.fieldInput}
                        underlineColorAndroid="transparent"
                        onChangeText={notes => this.setState({notes})}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    formGroup: {
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray05,
    },
    fieldLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.gray03,
        marginBottom: 5,
    },
    fieldInput: {
        backgroundColor: colors.gray05,
        paddingHorizontal: 10,
        color: colors.gray03,
        fontSize: 12,
    },
});

export default Details;
