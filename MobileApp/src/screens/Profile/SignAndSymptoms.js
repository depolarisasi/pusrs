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
} from 'react-native';
import {Image} from 'react-native';
import {CheckBox} from 'react-native';
import Slider from '@react-native-community/slider';
import HeaderTitleBackable from '../../components/headers/HeaderTitleBackable';
import colors from '../../styles/colors';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

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
                    title="Sign And Symptoms"
                />
            ),
        };
    };
    constructor(props) {
        super(props);
        this.state = {};
    }

    async readSignAndSymptoms() {
        let userId = auth().currentUser.uid;
        const refDb = database().ref(`/posts/${userId}`);
        refDb
            .once('value')
            .then(snapshot => {
                this.setState({});
            })
            .catch(error => {
                this.setState({});
            });
    }

    async submitSignAndSymptoms() {}

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
                            Do you have fever?
                        </Text>
                        <CheckBox
                            title="value1"
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            checked={this.state.radioButton === 'value1'}
                            onPress={() =>
                                this.setState({radioButton: 'value1'})
                            }
                        />
                        <CheckBox
                            title="value2"
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            checked={this.state.radioButton === 'value2'}
                            onPress={() =>
                                this.setState({radioButton: 'value2'})
                            }
                        />
                    </View>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>
                            if yes, for how many days?
                        </Text>
                        <View>
                            <TextInput
                                style={styles.fieldInput}
                                placeholder="-"
                                placeholderTextColor={colors.gray04}
                                underlineColorAndroid="transparent"
                                onChangeText={age => this.setState({age})}
                            />
                        </View>
                    </View>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>
                            Your average temperature is?
                        </Text>
                        <View>
                            <TextInput
                                style={styles.fieldInput}
                                placeholder="-"
                                placeholderTextColor={colors.gray04}
                                underlineColorAndroid="transparent"
                                onChangeText={age => this.setState({age})}
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
                            Do you have headache?
                        </Text>
                        <TextInput
                            //  value={this.state.age}
                            style={styles.fieldInput}
                            placeholderTextColor={colors.gray04}
                            underlineColorAndroid="transparent"
                            onChangeText={age => this.setState({age})}
                        />
                    </View>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>
                            Do you feel pain behind your eyes?
                        </Text>
                        <View>
                            <TextInput
                                style={styles.fieldInput}
                                placeholder="-"
                                placeholderTextColor={colors.gray04}
                                underlineColorAndroid="transparent"
                                onChangeText={age => this.setState({age})}
                            />
                        </View>
                    </View>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>
                            Do you feel pain around your eyes?
                        </Text>
                        <View>
                            <TextInput
                                style={styles.fieldInput}
                                placeholder="-"
                                placeholderTextColor={colors.gray04}
                                underlineColorAndroid="transparent"
                                onChangeText={age => this.setState({age})}
                            />
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
                            Do you feel nauseaous?
                        </Text>
                        <TextInput
                            //  value={this.state.age}
                            style={styles.fieldInput}
                            placeholderTextColor={colors.gray04}
                            underlineColorAndroid="transparent"
                            onChangeText={age => this.setState({age})}
                        />
                    </View>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>
                            if yes, from 1 to 5, 5 is the highest,what degree?
                        </Text>
                        <View>
                            <Slider
                                style={{
                                    width: '85%',
                                    height: 40,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                minimumValue={0}
                                maximumValue={1}
                                minimumTrackTintColor="#FFFFFF"
                                maximumTrackTintColor={colors.green01}
                            />
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
                <View style={styles.rowGroup}>
                    <View style={styles.fieldInputRow}>
                        <Text style={styles.fieldLabelRow}>
                            Do you bleeding?
                        </Text>
                        <TextInput
                            //  value={this.state.age}
                            style={{
                                height: 40,
                                width: 50,
                                borderColor: 'gray',
                                borderWidth: 1,
                            }}
                            placeholderTextColor={colors.gray04}
                            underlineColorAndroid="transparent"
                            onChangeText={age => this.setState({age})}
                        />
                        <Text style={styles.fieldLabelRow}>Where</Text>
                        <TextInput
                            //  value={this.state.age}
                            style={{
                                height: 40,
                                width: 50,
                                borderColor: 'gray',
                                borderWidth: 1,
                            }}
                            placeholderTextColor={colors.gray04}
                            underlineColorAndroid="transparent"
                            onChangeText={age => this.setState({age})}
                        />
                    </View>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>
                            if yes, from 1 to 5, 5 is the highest,what degree?
                        </Text>
                        <View>
                            <Slider
                                style={{
                                    width: '85%',
                                    height: 40,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                minimumValue={0}
                                maximumValue={1}
                                minimumTrackTintColor="#FFFFFF"
                                maximumTrackTintColor={colors.green01}
                            />
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
                            Are you having diarrhea?
                        </Text>
                        <TextInput
                            //  value={this.state.age}
                            style={styles.fieldInput}
                            placeholderTextColor={colors.gray04}
                            underlineColorAndroid="transparent"
                            onChangeText={age => this.setState({age})}
                        />
                    </View>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>
                            if yes, for how may times a days?
                        </Text>
                        <View>
                            <TextInput
                                style={styles.fieldInput}
                                placeholder="-"
                                placeholderTextColor={colors.gray04}
                                underlineColorAndroid="transparent"
                                onChangeText={age => this.setState({age})}
                            />
                        </View>
                    </View>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>Color:</Text>
                        <View>
                            <TextInput
                                style={styles.fieldInput}
                                placeholder="-"
                                placeholderTextColor={colors.gray04}
                                underlineColorAndroid="transparent"
                                onChangeText={age => this.setState({age})}
                            />
                        </View>
                    </View>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>Consistency:</Text>
                        <View>
                            <TextInput
                                style={styles.fieldInput}
                                placeholder="-"
                                placeholderTextColor={colors.gray04}
                                underlineColorAndroid="transparent"
                                onChangeText={age => this.setState({age})}
                            />
                        </View>
                    </View>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>
                            Do you feel pain in your stomach?
                        </Text>
                        <View>
                            <TextInput
                                style={styles.fieldInput}
                                placeholder="-"
                                placeholderTextColor={colors.gray04}
                                underlineColorAndroid="transparent"
                                onChangeText={age => this.setState({age})}
                            />
                        </View>
                    </View>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>
                            if yes, from 1 to 5, 5 is the highest,what degree?
                        </Text>
                        <View>
                            <Slider
                                style={{
                                    width: '85%',
                                    height: 40,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                minimumValue={0}
                                maximumValue={1}
                                minimumTrackTintColor="#FFFFFF"
                                maximumTrackTintColor={colors.green01}
                            />
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
                            Do you have muscke pains?
                        </Text>
                        <TextInput
                            //  value={this.state.age}
                            style={styles.fieldInput}
                            placeholderTextColor={colors.gray04}
                            underlineColorAndroid="transparent"
                            onChangeText={age => this.setState({age})}
                        />
                    </View>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>
                            if yes, from 1 to 5, 5 is the highest,what degree?
                        </Text>
                        <View>
                            <Slider
                                style={{
                                    width: '85%',
                                    height: 40,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                minimumValue={0}
                                maximumValue={1}
                                minimumTrackTintColor="#FFFFFF"
                                maximumTrackTintColor={colors.green01}
                            />
                        </View>
                    </View>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>
                            Do you feel pain in your joints?
                        </Text>
                        <TextInput
                            //  value={this.state.age}
                            style={styles.fieldInput}
                            placeholderTextColor={colors.gray04}
                            underlineColorAndroid="transparent"
                            onChangeText={age => this.setState({age})}
                        />
                    </View>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>
                            if yes, from 1 to 5, 5 is the highest,what degree?
                        </Text>
                        <View>
                            <Slider
                                style={{
                                    width: '85%',
                                    height: 40,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                minimumValue={0}
                                maximumValue={1}
                                minimumTrackTintColor="#FFFFFF"
                                maximumTrackTintColor={colors.green01}
                            />
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
                            Do you have muscke pains?
                        </Text>
                        <TextInput
                            //  value={this.state.age}
                            style={styles.fieldInput}
                            placeholderTextColor={colors.gray04}
                            underlineColorAndroid="transparent"
                            onChangeText={age => this.setState({age})}
                        />
                    </View>
                    <View style={styles.mb5}>
                        <Text style={styles.fieldLabel}>
                            if yes, from 1 to 5, 5 is the highest,what degree?
                        </Text>
                        <View>
                            <Slider
                                style={{
                                    width: '85%',
                                    height: 40,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                minimumValue={0}
                                maximumValue={1}
                                minimumTrackTintColor="#FFFFFF"
                                maximumTrackTintColor={colors.green01}
                            />
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
                                Fever
                            </Text>
                        </View>
                        {this.renderFever()}
                        <View style={styles.sectionTitle}>
                            <Text style={[styles.text, styles.bold]}>
                                Headache and retro
                            </Text>
                        </View>
                        {this.renderHeadache()}
                        <View style={styles.sectionTitle}>
                            <Text style={[styles.text, styles.bold]}>
                                Nausea and vomiting
                            </Text>
                        </View>
                        {this.renderNauseaAndVomitting()}
                        <View style={styles.sectionTitle}>
                            <Text style={[styles.text, styles.bold]}>
                                Bleeding
                            </Text>
                        </View>
                        {this.renderBleeding()}
                        <View style={styles.sectionTitle}>
                            <Text style={[styles.text, styles.bold]}>
                                Diarrhea and abdominal pain
                            </Text>
                        </View>
                        {this.renderDiarrhea()}
                        <View style={styles.sectionTitle}>
                            <Text style={[styles.text, styles.bold]}>
                                Muscle and joint pains
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
                            onPress={() => {}}
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
        textAlign: 'center',
        backgroundColor: colors.transparent,
        paddingHorizontal: 5,
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
});

export default SignAndSymptoms;
