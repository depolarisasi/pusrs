/*
 * Created on Thu Dec 12 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, {Component} from 'react';
import {
    StatusBar,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    ToastAndroid, DatePickerAndroid,
} from 'react-native';
import colors from './../../styles/colors';
import HeaderTitleBackable from './../../components/headers/HeaderTitleBackable';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

class ClinicalData extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: () => (
                <HeaderTitleBackable
                    navigation={navigation}
                    title="Data klinis"
                />
            ),
        };
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
        this.readClinicalData();
    }

    async readClinicalData() {
        let userId = auth().currentUser.uid;
        const refDb = database().ref(`/posts/${userId}`);
        refDb
            .once('value')
            .then(snapshot => {
                this.setState({
                    diagnosis: snapshot.val().diagnosis,
                    dengueTest: snapshot.val().dengueTest,
                    ns1ag: snapshot.val().ns1ag,
                    igg: snapshot.val().igg,
                    igm: snapshot.val().igm,
                    address: snapshot.val().address,
                    hospitalName: snapshot.val().hospitalName,
                    dateAdmitted: snapshot.val().dateAdmitted,
                    roomNumber: snapshot.val().roomNumber,
                    attendingPhysician: snapshot.val().attendingPhysician,
                    numberOfDays: snapshot.val().numberOfDays,
                });
            })
            .catch(error => {
                this.setState({
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
                });
            });
    }

    async submitClinicalData() {
        let isBoolean = false;
        let clinicData = {};
        clinicData.diagnosis = this.state.diagnosis;
        clinicData.dengueTest = this.state.dengueTest;
        clinicData.ns1ag = this.state.ns1ag;
        clinicData.igg = this.state.igg;
        clinicData.igm = this.state.igm;
        clinicData.hospitalName = this.state.hospitalName;
        clinicData.address = this.state.address;
        clinicData.dateAdmitted = this.state.dateAdmitted;
        clinicData.roomNumber = this.state.roomNumber;
        clinicData.attendingPhysician = this.state.attendingPhysician;
        clinicData.numberOfDays = this.state.numberOfDays;

        let userId = auth().currentUser.uid;
        const refDb = database().ref(`/posts/${userId}`);
        await refDb
            .update(clinicData)
            .then(() => {
                ToastAndroid.show(
                    'Update Data Clinic berhasil',
                    ToastAndroid.SHORT,
                );
                this.props.navigation.goBack();
            })
            .catch(error => {
                console.log(
                    `Gagal menyimpan ke realtime database: ${error.message}`,
                );
            });
    }

    async showDateAdmitted() {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date(),
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                this.setState({dateAdmitted: `${day}/${month + 1}/${year}`});
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <StatusBar
                    backgroundColor={colors.green01}
                    barStyle="dark-content"
                />
                <ScrollView
                    contentContainerStyle={{paddingBottom: 20}}
                    style={styles.scrollView}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>DATA KLINIS</Text>
                    </View>
                    <View style={styles.formContainer}>
                        <View style={styles.formGroup}>
                            <Text style={styles.fieldLabel}>Diagnosa</Text>
                            <TextInput
                                value={this.state.diagnosis}
                                style={styles.fieldInput}
                                placeholder="Diagnosis utama"
                                placeholderTextColor={colors.gray04}
                                underlineColorAndroid="transparent"
                                onChangeText={diagnosis =>
                                    this.setState({diagnosis})
                                }
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <View style={styles.mb5}>
                                <Text style={styles.fieldLabel}>
                                    Tes Demam Berdarah
                                </Text>
                                <TextInput
                                    value={this.state.dengueTest}
                                    style={styles.fieldInput}
                                    underlineColorAndroid="transparent"
                                    onChangeText={dengueTest =>
                                        this.setState({dengueTest})
                                    }
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
                                    onChangeText={ns1ag =>
                                        this.setState({ns1ag})
                                    }
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
                                    onChangeText={igg => this.setState({igg})}
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
                                    onChangeText={igm => this.setState({igm})}
                                />
                            </View>
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.fieldLabel}>
                                Rumah Sakit / Klinik
                            </Text>
                            <TextInput
                                value={this.state.hospitalName}
                                style={styles.fieldInput}
                                placeholder="Nama Rumah Sakit / Klinik"
                                placeholderTextColor={colors.gray04}
                                underlineColorAndroid="transparent"
                                onChangeText={hospitalName =>
                                    this.setState({hospitalName})
                                }
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.fieldLabel}>Alamat</Text>
                            <TextInput
                                value={this.state.address}
                                style={styles.fieldInput}
                                placeholder="Unit No / Nama Jalan, Sub ketat / Desa / Subdivisi, Kotamadya / Kota"
                                placeholderTextColor={colors.gray04}
                                underlineColorAndroid="transparent"
                                onChangeText={address =>
                                    this.setState({address})
                                }
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.fieldLabel}>
                                Tanggal Diakui
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.showDateAdmitted().then('Execute');
                                }}>
                                <TextInput
                                    value={this.state.dateAdmitted}
                                    style={styles.fieldInput}
                                    placeholderTextColor={colors.gray04}
                                    underlineColorAndroid="transparent"
                                    editable={false}
                                    onChangeText={dateAdmitted =>
                                        this.setState({dateAdmitted})
                                    }
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.fieldLabel}>
                                Nomor kamar / unit / Ruang
                            </Text>
                            <TextInput
                                value={this.state.roomNumber}
                                style={styles.fieldInput}
                                placeholder="Nomor kamar / unit / Ruang"
                                placeholderTextColor={colors.gray04}
                                underlineColorAndroid="transparent"
                                onChangeText={roomNumber =>
                                    this.setState({roomNumber})
                                }
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.fieldLabel}>
                                Nama Dokter yang menghadiri
                            </Text>
                            <TextInput
                                value={this.state.attendingPhysician}
                                style={styles.fieldInput}
                                placeholder="Dokter yang merawat utama"
                                placeholderTextColor={colors.gray04}
                                underlineColorAndroid="transparent"
                                onChangeText={attendingPhysician =>
                                    this.setState({attendingPhysician})
                                }
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.fieldLabel}>
                                Jumlah hari di rumah sakit
                            </Text>
                            <TextInput
                                value={this.state.numberOfDays}
                                style={styles.fieldInput}
                                placeholder="Jumlah hari di rumah sakit"
                                keyboardType="number-pad"
                                maxLength={4}
                                placeholderTextColor={colors.gray04}
                                underlineColorAndroid="transparent"
                                onChangeText={numberOfDays =>
                                    this.setState({numberOfDays})
                                }
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                this.submitClinicalData();
                            }}
                            style={styles.saveButton}>
                            <Text style={styles.saveButtonText}>Simpan</Text>
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
