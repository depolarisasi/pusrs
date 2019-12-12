/*
 * Created on Thu Dec 12 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, { Component } from 'react';
import {
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import colors from './../../styles/colors';
import HeaderTitleBackable from './../../components/headers/HeaderTitleBackable';

class ClinicalData extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => <HeaderTitleBackable navigation={navigation} title="Clinical Data" />,
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      diagnosis: '',
      dengueTest: '',
      ns1ag: '',
      igg: '',
      igm: '',
      hospitalName: '',
      address: '',
      dateAdmitted: '',
      roomNumber: '',
      attendingPhysician: '',
      numberOfDays: '',
    };
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <StatusBar backgroundColor={colors.green01} barStyle="dark-content" />
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20 }}
          style={styles.scrollView}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>CLINICAL DATA</Text>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={styles.fieldLabel}>Diagnosis</Text>
              <TextInput
                value={this.state.diagnosis}
                style={styles.fieldInput}
                placeholder="Main diagnosis"
                placeholderTextColor={colors.gray04}
                underlineColorAndroid="transparent"
                onChangeText={diagnosis => this.setState({ diagnosis })}
              />
            </View>
            <View style={styles.formGroup}>
              <View style={styles.mb5}>
                <Text style={styles.fieldLabel}>Dengue Test/s</Text>
                <TextInput
                  value={this.state.dengueTest}
                  style={styles.fieldInput}
                  underlineColorAndroid="transparent"
                  onChangeText={dengueTest => this.setState({ dengueTest })}
                />
              </View>
              <View style={styles.mb5}>
                <Text style={styles.fieldLabel}>NS1Ag</Text>
                <TextInput
                  value={this.state.ns1ag}
                  style={styles.fieldInput}
                  placeholder="Positive or Negative"
                  placeholderTextColor={colors.gray04}
                  underlineColorAndroid="transparent"
                  onChangeText={ns1ag => this.setState({ ns1ag })}
                />
              </View>
              <View style={styles.mb5}>
                <Text style={styles.fieldLabel}>IgG</Text>
                <TextInput
                  value={this.state.igg}
                  style={styles.fieldInput}
                  placeholder="Positive or Negative"
                  placeholderTextColor={colors.gray04}
                  underlineColorAndroid="transparent"
                  onChangeText={igg => this.setState({ igg })}
                />
              </View>
              <View>
                <Text style={styles.fieldLabel}>IgM</Text>
                <TextInput
                  value={this.state.igm}
                  style={styles.fieldInput}
                  placeholder="Positive or Negative"
                  placeholderTextColor={colors.gray04}
                  underlineColorAndroid="transparent"
                  onChangeText={igm => this.setState({ igm })}
                />
              </View>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.fieldLabel}>Hospital/Clinic</Text>
              <TextInput
                value={this.state.hospitalName}
                style={styles.fieldInput}
                placeholder="Name of Hospital/Clinic"
                placeholderTextColor={colors.gray04}
                underlineColorAndroid="transparent"
                onChangeText={hospitalName => this.setState({ hospitalName })}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.fieldLabel}>Address</Text>
              <TextInput
                value={this.state.address}
                style={styles.fieldInput}
                placeholder="Unit No./Street, Barangay/Village/Subdivision, Municipality/City"
                placeholderTextColor={colors.gray04}
                underlineColorAndroid="transparent"
                onChangeText={address => this.setState({ address })}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.fieldLabel}>Date Admitted</Text>
              <TextInput
                value={this.state.dateAdmitted}
                style={styles.fieldInput}
                underlineColorAndroid="transparent"
                onChangeText={dateAdmitted => this.setState({ dateAdmitted })}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.fieldLabel}>Room Number/Unit/Ward</Text>
              <TextInput
                value={this.state.roomNumber}
                style={styles.fieldInput}
                placeholder="Room number/unit/ward"
                placeholderTextColor={colors.gray04}
                underlineColorAndroid="transparent"
                onChangeText={roomNumber => this.setState({ roomNumber })}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.fieldLabel}>Attending Physician</Text>
              <TextInput
                value={this.state.attendingPhysician}
                style={styles.fieldInput}
                placeholder="Main attending physician"
                placeholderTextColor={colors.gray04}
                underlineColorAndroid="transparent"
                onChangeText={attendingPhysician => this.setState({ attendingPhysician })}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.fieldLabel}>Number of day/s in the hospital</Text>
              <TextInput
                value={this.state.numberOfDays}
                style={styles.fieldInput}
                placeholder="Number of days co."
                placeholderTextColor={colors.gray04}
                underlineColorAndroid="transparent"
                onChangeText={numberOfDays => this.setState({ numberOfDays })}
              />
            </View>
            <TouchableOpacity onPress={() => {}} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.gray05,
  },
  scrollView: {
    flex: 1,
  },
  titleContainer: {
    backgroundColor: colors.gray02,
    paddingHorizontal: 20,
  },
  titleText: {
    marginTop: 20,
    marginBottom: 5,
    fontWeight: 'bold',
    color: colors.gray04,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  formGroup: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray04,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.gray03,
    marginBottom: 5,
  },
  fieldInput: {
    backgroundColor: colors.gray02,
    paddingHorizontal: 10,
    color: colors.gray03,
    fontSize: 12,
  },
  mb5: {
    marginBottom: 5,
  },
  saveButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: colors.green01,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ClinicalData;