/* eslint-disable no-alert */
/**
 * Created by Handika Dwiputra on 19/01/2020.
 * handikadwiputradev@gmail.com
 */

import React, {Component} from 'react';
import {
    StatusBar,
    View,
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    Alert,
} from 'react-native';
import {Image} from 'react-native';
import Slider from '@react-native-community/slider';
import HeaderTitleBackable from '../../components/headers/HeaderTitleBackable';
import colors from '../../styles/colors';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Picker from '@react-native-community/picker/js/Picker';
import {color} from 'react-native-reanimated';

const imagePath01 = require('./../../img/profil/fever.jpeg');
const imagePath02 = require('./../../img/profil/headache.jpeg');
const imagePath03 = require('./../../img/profil/vomiting.jpeg');
const imagePath04 = require('./../../img/profil/bleeding.jpeg');
const imagePath05 = require('./../../img/profil/diarrhea.jpeg');
const imagePath06 = require('./../../img/profil/body_pain.jpeg');
const imagePath07 = require('./../../img/profil/Rashes.jpeg');

class SignAndSymptoms extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: () => (
                <HeaderTitleBackable
                    navigation={navigation}
                    title="Tanda dan Gejala"
                />
            ),
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            dataPicker: ['Yes', 'No'],
            picker01Fever: '',
            hwManyDayFever: '',
            temperatureFever: '',
            picker01Headache: '',
            picker02Headache: '',
            picker03Headache: '',
            picker01Nausea: '',
            sliderNausea: 0,
            picker01Bleeding: 'No',
            whereBleeding: '',
            slider01Bleeding: 0,
            picker01Diarrhea: 'Yes',
            howManyBDiarrhea: '',
            colorDiarrhea: '',
            consistencyDiarrhea: '',
            picker02Diarrhea: 'Yes',
            slider01Diarrhea: 0,
            picker01Muscle: 'Yes',
            slider01Muscle: 0,
            picker02Muscle: 'Yes',
            slider02Muscle: 0,
            picker01Rashes: 'Yes',
            slider01Rashes: 0,
        };
        this.readSignAndSymptoms().then(r => {});
    }

    async readSignAndSymptoms() {
        let userId = auth().currentUser.uid;
        const refDb = database().ref(`/posts/${userId}`);
        refDb
            .once('value')
            .then(snapshot => {
                this.setState({
                    picker01Fever: snapshot.val().picker01Fever,
                    hwManyDayFever: snapshot.val().hwManyDayFever,
                    temperatureFever: snapshot.val().temperatureFever,
                    picker01Headache: snapshot.val().picker01Headache,
                    picker02Headache: snapshot.val().picker02Headache,
                    picker03Headache: snapshot.val().picker03Headache,
                    picker01Nausea: snapshot.val().picker01Nausea,
                    sliderNausea: snapshot.val().sliderNausea,
                    picker01Bleeding: snapshot.val().picker01Bleeding,
                    whereBleeding: snapshot.val().whereBleeding,
                    slider01Bleeding: snapshot.val().slider01Bleeding,
                    picker01Diarrhea: snapshot.val().picker01Diarrhea,
                    howManyBDiarrhea: snapshot.val().howManyBDiarrhea,
                    colorDiarrhea: snapshot.val().colorDiarrhea,
                    consistencyDiarrhea: snapshot.val().consistencyDiarrhea,
                    picker02Diarrhea: snapshot.val().picker02Diarrhea,
                    slider01Diarrhea: snapshot.val().slider01Diarrhea,
                    picker01Muscle: snapshot.val().picker01Muscle,
                    slider01Muscle: snapshot.val().slider01Muscle,
                    slider02Muscle: snapshot.val().slider02Muscle,
                    picker02Muscle: snapshot.val().picker02Muscle,
                    picker01Rashes: snapshot.val().picker01Rashes,
                    slider01Rashes: snapshot.val().slider01Rashes,
                });
            })
            .catch(error => {
                this.setState({
                    picker01Fever: 'Ya',
                    hwManyDayFever: '',
                    temperatureFever: '',
                    picker01Headache: '',
                    picker02Headache: '',
                    picker03Headache: '',
                    picker01Nausea: '',
                    sliderNausea: 0,
                    picker01Bleeding: 'No',
                    whereBleeding: '',
                    slider01Bleeding: 0,
                    picker01Diarrhea: 'Yes',
                    howManyBDiarrhea: '',
                    colorDiarrhea: '',
                    consistencyDiarrhea: '',
                    picker02Diarrhea: 'Yes',
                    slider01Diarrhea: 0,
                    picker01Muscle: 'Yes',
                    slider01Muscle: 0,
                    picker02Muscle: 'Yes',
                    slider02Muscle: 0,
                    picker01Rashes: 'Yes',
                    slider01Rashes: 0,
                });
            });
    }

    async submitSignAndSymptoms() {
        let signAndSyptoms = {};
        signAndSyptoms.picker01Fever = this.state.picker01Fever;
        signAndSyptoms.hwManyDayFever = this.state.hwManyDayFever;
        signAndSyptoms.temperatureFever = this.state.temperatureFever;
        signAndSyptoms.picker01Headache = this.state.picker01Headache;
        signAndSyptoms.picker02Headache = this.state.picker02Headache;
        signAndSyptoms.picker03Headache = this.state.picker03Headache;
        signAndSyptoms.picker01Nausea = this.state.picker01Nausea;
        signAndSyptoms.sliderNausea = this.state.sliderNausea;
        signAndSyptoms.picker01Bleeding = this.state.picker01Bleeding;
        signAndSyptoms.whereBleeding = this.state.whereBleeding;
        signAndSyptoms.slider01Bleeding = this.state.slider01Bleeding;

        signAndSyptoms.picker01Diarrhea = this.state.picker01Diarrhea;
        signAndSyptoms.howManyBDiarrhea = this.state.howManyBDiarrhea;
        signAndSyptoms.colorDiarrhea = this.state.colorDiarrhea;
        signAndSyptoms.consistencyDiarrhea = this.state.consistencyDiarrhea;
        signAndSyptoms.picker02Diarrhea = this.state.picker02Diarrhea;
        signAndSyptoms.slider01Diarrhea = this.state.slider01Diarrhea;
        signAndSyptoms.picker01Muscle = this.state.picker01Muscle;
        signAndSyptoms.slider01Muscle = this.state.slider01Muscle;
        signAndSyptoms.picker02Muscle = this.state.picker02Muscle;
        signAndSyptoms.slider02Muscle = this.state.slider02Muscle;
        signAndSyptoms.picker01Rashes = this.state.picker01Rashes;
        signAndSyptoms.slider01Rashes = this.state.slider01Rashes;

        console.log(`Masuk Sign And Sypmtoms ${this.state.picker01Fever}`);
        if (this.state.picker01Fever === 'Ya') {
            console.log('Masuk Sign And Sypmtoms2');
            if (this.state.hwManyDayFever >= 3) {
                if (this.state.temperatureFever === 37) {
                    Alert.alert(
                        'Peringatan Demam!',
                        'Untuk memastikan penyakit anda lebih lanjut, silahkan kunjungi rumah sakit atau fasilitas kesehatan umum terdekat',
                    );
                }
                if (this.state.temperatureFever >= 38) {
                    Alert.alert(
                        'Peringatan Demam!',

                        'perdarahan trus sama yg lain lain dengan poin diatas 3,Anda bisa jadi terkena Dengue, silahkan datangi rumah sakit atau fasilitas kesehatan umum secepatnya',
                    );
                }
            }
        }

        let userId = auth().currentUser.uid;
        const refDb = database().ref(`/posts/${userId}`);
        await refDb
            .update(signAndSyptoms)
            .then(() => {
                ToastAndroid.show(
                    'Perbarui Data Tanda Dan Gejala berhasil',
                    ToastAndroid.SHORT,
                );
            })
            .catch(error => {
                console.log(
                    `Gagal menyimpan ke realtime database: ${error.message}`,
                );
            });
    }

    renderFever() {
        return (
            <View style={styles.containerForm}>
                <View>
                    <View style={styles.imageContainer}>
                        <Image source={imagePath01} style={styles.image} />
                    </View>
                </View>
                <View style={styles.formGroup}>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>
                            Apakah kamu demam?
                        </Text>
                        <View>
                            <Picker
                                selectedValue={this.state.picker01Fever}
                                style={styles.pickerStyle}
                                onValueChange={(picker01Fever, itemIndex) =>
                                    this.setState({
                                        picker01Fever: picker01Fever,
                                    })
                                }>
                                <Picker.Item label="Ya" value="Ya" />
                                <Picker.Item label="Tidak" value="Tidak" />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>
                            Jika iya, berapa hari?
                        </Text>
                        <View>
                            <TextInput
                                value={this.state.hwManyDayFever}
                                style={styles.fieldInput}
                                keyboardType="number-pad"
                                placeholder="-"
                                placeholderTextColor={colors.gray04}
                                underlineColorAndroid="transparent"
                                onChangeText={hwManyDayFever =>
                                    this.setState({hwManyDayFever})
                                }
                            />
                        </View>
                    </View>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>
                            Suhu rata-rata Anda?
                        </Text>
                        <View>
                            <TextInput
                                value={this.state.temperatureFever}
                                style={styles.fieldInput}
                                placeholder="-"
                                keyboardType="number-pad"
                                placeholderTextColor={colors.gray04}
                                underlineColorAndroid="transparent"
                                onChangeText={temperatureFever =>
                                    this.setState({temperatureFever})
                                }
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    renderHeadache() {
        return (
            <View style={styles.containerForm}>
                <View>
                    <View style={styles.imageContainer}>
                        <Image source={imagePath02} style={styles.image} />
                    </View>
                </View>
                <View style={styles.formGroup}>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>
                            Apakah Anda sakit kepala?
                        </Text>
                        <Picker
                            selectedValue={this.state.picker01Headache}
                            style={styles.pickerStyle}
                            onValueChange={(picker01Headache, itemIndex) =>
                                this.setState({
                                    picker01Headache: picker01Headache,
                                })
                            }>
                            <Picker.Item label="Ya" value="Ya" />
                            <Picker.Item label="Tidak" value="Tidak" />
                        </Picker>
                    </View>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>
                            Apakah Anda merasakan sakit di belakang mata Anda?
                        </Text>
                        <View>
                            <Picker
                                selectedValue={this.state.picker02Headache}
                                style={styles.pickerStyle}
                                onValueChange={(picker02Headache, itemIndex) =>
                                    this.setState({
                                        picker02Headache: picker02Headache,
                                    })
                                }>
                                <Picker.Item label="Ya" value="Ya" />
                                <Picker.Item label="Tidak" value="Tidak" />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>
                            Apakah Anda merasakan sakit di sekitar mata Anda?
                        </Text>
                        <View>
                            <Picker
                                selectedValue={this.state.picker03Headache}
                                style={styles.pickerStyle}
                                onValueChange={(picker03Headache, itemIndex) =>
                                    this.setState({
                                        picker03Headache: picker03Headache,
                                    })
                                }>
                                <Picker.Item label="Ya" value="Ya" />
                                <Picker.Item label="Tidak" value="Tidak" />
                            </Picker>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    renderNauseaAndVomitting() {
        return (
            <View style={styles.containerForm}>
                <View>
                    <View style={styles.imageContainer}>
                        <Image source={imagePath03} style={styles.image} />
                    </View>
                </View>
                <View style={styles.formGroup}>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>
                            Apakah Anda merasa mual?
                        </Text>
                        <Picker
                            selectedValue={this.state.picker01Nausea}
                            style={styles.pickerStyle}
                            onValueChange={(picker01Nausea, itemIndex) =>
                                this.setState({
                                    picker01Nausea: picker01Nausea,
                                })
                            }>
                            <Picker.Item label="Ya" value="Ya" />
                            <Picker.Item label="Tidak" value="Tidak" />
                        </Picker>
                    </View>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>
                            Jika ya, dari 1 hingga 5, 5 adalah yang tertinggi?
                        </Text>
                        <View style={styles.fieldInputRow}>
                            <Slider
                                value={this.state.sliderNausea}
                                style={{
                                    width: '90%',
                                    height: 40,
                                    justifyContent: 'center',
                                }}
                                step={1}
                                minimumValue={0}
                                maximumValue={5}
                                minimumTrackTintColor="#FFFFFF"
                                maximumTrackTintColor={colors.green01}
                                onValueChange={sliderNausea =>
                                    this.setState({sliderNausea})
                                }
                            />
                            <Text style={styles.textStyle}>
                                {this.state.sliderNausea}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    renderBleeding() {
        return (
            <View style={styles.containerForm}>
                <View>
                    <View style={styles.imageContainer}>
                        <Image source={imagePath04} style={styles.image} />
                    </View>
                </View>
                <View style={styles.formGroup}>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>
                            Apakah kamu berdarah?
                        </Text>
                        <Picker
                            selectedValue={this.state.picker01Bleeding}
                            style={styles.pickerStyle}
                            onValueChange={(picker01Bleeding, itemIndex) =>
                                this.setState({
                                    picker01Bleeding: picker01Bleeding,
                                })
                            }>
                            <Picker.Item label="Ya" value="Ya" />
                            <Picker.Item label="Tidak" value="Tidak" />
                        </Picker>
                        <Text style={styles.fieldLabel}>Dimana?</Text>
                        <TextInput
                            value={this.state.whereBleeding}
                            style={styles.fieldInput}
                            placeholder="-"
                            placeholderTextColor={colors.gray04}
                            underlineColorAndroid="transparent"
                            onChangeText={whereBleeding =>
                                this.setState({whereBleeding})
                            }
                        />
                    </View>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>
                            Jika ya, dari 1 hingga 5, 5 adalah yang tertinggi?
                        </Text>
                        <View style={styles.fieldInputRow}>
                            <Slider
                                value={this.state.slider01Bleeding}
                                style={{
                                    width: '90%',
                                    height: 40,
                                    justifyContent: 'center',
                                }}
                                step={1}
                                minimumValue={0}
                                maximumValue={5}
                                minimumTrackTintColor="#FFFFFF"
                                maximumTrackTintColor={colors.green01}
                                onValueChange={slider01Bleeding =>
                                    this.setState({slider01Bleeding})
                                }
                            />
                            <Text style={styles.textStyle}>
                                {this.state.slider01Bleeding}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    renderDiarrhea() {
        return (
            <View style={styles.containerForm}>
                <View>
                    <View style={styles.imageContainer}>
                        <Image source={imagePath05} style={styles.image} />
                    </View>
                </View>
                <View style={styles.formGroup}>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>
                            Apakah Anda mengalami diare?
                        </Text>
                        <Picker
                            selectedValue={this.state.picker01Diarrhea}
                            style={styles.pickerStyle}
                            onValueChange={(picker01Diarrhea, itemIndex) =>
                                this.setState({
                                    picker01Diarrhea: picker01Diarrhea,
                                })
                            }>
                            <Picker.Item label="Ya" value="Ya" />
                            <Picker.Item label="Tidak" value="Tidak" />
                        </Picker>
                    </View>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>
                            Jika iya, berapa kali sehari?
                        </Text>
                        <View>
                            <TextInput
                                value={this.state.howManyBDiarrhea}
                                style={styles.fieldInput}
                                placeholder="-"
                                keyboardType="number-pad"
                                placeholderTextColor={colors.gray04}
                                underlineColorAndroid="transparent"
                                onChangeText={howManyBDiarrhea =>
                                    this.setState({howManyBDiarrhea})
                                }
                            />
                        </View>
                    </View>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>Warna</Text>
                        <View>
                            <TextInput
                                value={this.state.colorDiarrhea}
                                style={styles.fieldInput}
                                placeholder="-"
                                placeholderTextColor={colors.gray04}
                                underlineColorAndroid="transparent"
                                onChangeText={colorDiarrhea =>
                                    this.setState({colorDiarrhea})
                                }
                            />
                        </View>
                    </View>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>Konsistensi</Text>
                        <View>
                            <TextInput
                                value={this.state.consistencyDiarrhea}
                                style={styles.fieldInput}
                                placeholder="-"
                                placeholderTextColor={colors.gray04}
                                underlineColorAndroid="transparent"
                                onChangeText={consistencyDiarrhea =>
                                    this.setState({consistencyDiarrhea})
                                }
                            />
                        </View>
                    </View>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>
                            Apakah Anda merasakan sakit di perut Anda?
                        </Text>
                        <View>
                            <Picker
                                selectedValue={this.state.picker02Diarrhea}
                                style={styles.pickerStyle}
                                onValueChange={(picker02Diarrhea, itemIndex) =>
                                    this.setState({
                                        picker02Diarrhea: picker02Diarrhea,
                                    })
                                }>
                                <Picker.Item label="Ya" value="Ya" />
                                <Picker.Item label="Tidak" value="Tidak" />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>
                            Jika iya, dari 1 hingga 5, 5 adalah yang tertinggi?
                        </Text>
                        <View style={styles.fieldInputRow}>
                            <Slider
                                value={this.state.slider01Diarrhea}
                                style={{
                                    width: '90%',
                                    height: 40,
                                    justifyContent: 'center',
                                }}
                                step={1}
                                minimumValue={0}
                                maximumValue={5}
                                minimumTrackTintColor="#FFFFFF"
                                maximumTrackTintColor={colors.green01}
                                onValueChange={slider01Diarrhea =>
                                    this.setState({slider01Diarrhea})
                                }
                            />
                            <Text style={styles.textStyle}>
                                {this.state.slider01Diarrhea}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    renderMuscle() {
        return (
            <View style={styles.containerForm}>
                <View>
                    <View style={styles.imageContainer}>
                        <Image source={imagePath06} style={styles.image} />
                    </View>
                </View>
                <View style={styles.formGroup}>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>
                            Apakah Anda memiliki sakit otot?
                        </Text>
                        <Picker
                            selectedValue={this.state.picker01Muscle}
                            style={styles.pickerStyle}
                            onValueChange={(picker01Muscle, itemIndex) =>
                                this.setState({
                                    picker01Muscle: picker01Muscle,
                                })
                            }>
                            <Picker.Item label="Ya" value="Ya" />
                            <Picker.Item label="Tidak" value="Tidak" />
                        </Picker>
                    </View>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>
                            Jika ya, dari 1 hingga 5, 5 adalah yang tertinggi,
                            tingkat apa?
                        </Text>
                        <View style={styles.fieldInputRow}>
                            <Slider
                                value={this.state.slider01Muscle}
                                style={{
                                    width: '90%',
                                    height: 40,
                                    justifyContent: 'center',
                                }}
                                step={1}
                                minimumValue={0}
                                maximumValue={5}
                                minimumTrackTintColor="#FFFFFF"
                                maximumTrackTintColor={colors.green01}
                                onValueChange={slider01Muscle =>
                                    this.setState({slider01Muscle})
                                }
                            />
                            <Text style={styles.textStyle}>
                                {this.state.slider01Muscle}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>
                            Apakah Anda merasakan sakit pada persendian?
                        </Text>
                        <Picker
                            selectedValue={this.state.picker02Muscle}
                            style={styles.pickerStyle}
                            onValueChange={(picker02Muscle, itemIndex) =>
                                this.setState({
                                    picker02Muscle: picker02Muscle,
                                })
                            }>
                            <Picker.Item label="Ya" value="Ya" />
                            <Picker.Item label="Tidak" value="Tidak" />
                        </Picker>
                    </View>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>
                            jika ya, dari 1 hingga 5, 5 adalah yang tertinggi?
                        </Text>
                        <View style={styles.fieldInputRow}>
                            <Slider
                                value={this.state.slider02Muscle}
                                style={{
                                    width: '90%',
                                    height: 40,
                                    justifyContent: 'center',
                                }}
                                step={1}
                                minimumValue={0}
                                maximumValue={5}
                                minimumTrackTintColor="#FFFFFF"
                                maximumTrackTintColor={colors.green01}
                                onValueChange={slider02Muscle =>
                                    this.setState({slider02Muscle})
                                }
                            />
                            <Text style={styles.textStyle}>
                                {this.state.slider02Muscle}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    renderRashes() {
        return (
            <View style={styles.containerForm}>
                <View>
                    <View style={styles.imageContainer}>
                        <Image source={imagePath07} style={styles.image} />
                    </View>
                </View>
                <View style={styles.formGroup}>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>
                            Apakah Anda memiliki nyeri otot?
                        </Text>
                        <Picker
                            selectedValue={this.state.picker01Rashes}
                            style={styles.pickerStyle}
                            onValueChange={(picker01Rashes, itemIndex) =>
                                this.setState({
                                    picker01Rashes: picker01Rashes,
                                })
                            }>
                            <Picker.Item label="Ya" value="Ya" />
                            <Picker.Item label="Tidak" value="Tidak" />
                        </Picker>
                    </View>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>
                            jika ya, dari 1 hingga 5, 5 adalah yang tertinggi?
                        </Text>
                        <View style={styles.fieldInputRow}>
                            <Slider
                                value={this.state.slider01Rashes}
                                style={{
                                    width: '90%',
                                    height: 40,
                                    justifyContent: 'center',
                                }}
                                step={1}
                                minimumValue={0}
                                maximumValue={5}
                                minimumTrackTintColor="#FFFFFF"
                                maximumTrackTintColor={colors.green01}
                                onValueChange={slider01Rashes =>
                                    this.setState({slider01Rashes})
                                }
                            />
                            <Text style={styles.textStyle}>
                                {this.state.slider01Rashes}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
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
                    <View style={styles.container}>
                        <View style={styles.sectionTitle}>
                            <Text style={[styles.text, styles.bold]}>
                                Demam
                            </Text>
                        </View>
                        {this.renderFever()}
                        <View style={styles.sectionTitle}>
                            <Text style={[styles.text, styles.bold]}>
                                Sakit kepala dan retro
                            </Text>
                        </View>
                        {this.renderHeadache()}
                        <View style={styles.sectionTitle}>
                            <Text style={[styles.text, styles.bold]}>
                                Mual dan muntah
                            </Text>
                        </View>
                        {this.renderNauseaAndVomitting()}
                        <View style={styles.sectionTitle}>
                            <Text style={[styles.text, styles.bold]}>
                                Perdarahan
                            </Text>
                        </View>
                        {this.renderBleeding()}
                        <View style={styles.sectionTitle}>
                            <Text style={[styles.text, styles.bold]}>
                                Diare dan sakit perut
                            </Text>
                        </View>
                        {this.renderDiarrhea()}
                        <View style={styles.sectionTitle}>
                            <Text style={[styles.text, styles.bold]}>
                                Nyeri otot dan sendi
                            </Text>
                        </View>
                        {this.renderMuscle()}
                        <View style={styles.sectionTitle}>
                            <Text style={[styles.text, styles.bold]}>
                                Rashes (Petechiae)
                            </Text>
                        </View>
                        {this.renderRashes()}
                        <TouchableOpacity
                            onPress={() => {
                                this.submitSignAndSymptoms();
                            }}
                            style={styles.saveButton}>
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
    container: {
        backgroundColor: colors.gray05,
    },
    containerForm: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: colors.gray05,
    },
    header: {
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: '500',
        color: colors.gray04,
        marginHorizontal: 15,
    },
    bold: {
        fontWeight: 'bold',
    },
    sectionTitle: {
        backgroundColor: colors.gray01,
        paddingVertical: 3,
    },
    imageContainer: {
        display: 'flex',
        flex: 1,
        backgroundColor: colors.gray05,
    },
    image: {
        flex: 1,
        height: 150,
        alignSelf: 'center',
        marginTop: '2%',
        marginBottom: '5%',
        resizeMode: 'contain',
    },
    title: {
        color: colors.black,
        fontSize: 14,
        letterSpacing: 0.5,
    },
    mb5: {
        marginBottom: 5,
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
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    fieldInputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.transparent,
        paddingHorizontal: 5,
        paddingVertical: 3,
        color: colors.gray03,
        fontSize: 12,
    },
    fieldLabelRow: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.white,
        textAlign: 'center', // <-- the magic
    },
    buttonGroup: {
        paddingVertical: 10,
    },
    rowGroup: {
        paddingVertical: 5,
        borderBottomWidth: 1,
        alignContent: 'stretch',
        borderBottomColor: colors.transparent,
    },
    saveButton: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: colors.green01,
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButtonText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: 'bold',
    },
    pickerStyle: {
        backgroundColor: colors.gray02,
        fontSize: 12,
        borderColor: colors.white,
        borderWidth: 1,
        color: colors.gray03,
    },
    textStyle: {
        alignItems: 'center',
        textAlign: 'center',
        color: colors.white,
    },
});

export default SignAndSymptoms;
