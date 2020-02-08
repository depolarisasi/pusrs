/**
 * Created by Handika Dwiputra on 12/01/2020.
 * handikadwiputradev@gmail.com
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
    ToastAndroid,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import HeaderTitleBackable from '../../components/headers/HeaderTitleBackable';
import colors from '../../styles/colors';

class UpdateProfile extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: () => (
                <HeaderTitleBackable navigation={navigation} title="Profile" />
            ),
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            age: '',
            Gender: '',
            Birthday: '',
            Address: '',
            Work: '',
            schoolCompany: '',
            schoolCompanyAddress: '',
            income: '',
            contactNumbers: '',
            DengueText: '',
            DengvaxiaText: '',
        };
        this.readProfil();
    }

    async readProfil() {
        let userId = auth().currentUser.uid;
        const refDb = database().ref(`/posts/${userId}`);
        refDb
            .once('value')
            .then(snapshot => {
                this.setState({
                    fullName: snapshot.val().fullName,
                    age: snapshot.val().age,
                    Gender: snapshot.val().Gender,
                    Birthday: snapshot.val().Birthday,
                    Address: snapshot.val().Address,
                    Work: snapshot.val().Work,
                    schoolCompany: snapshot.val().schoolCompany,
                    schoolCompanyAddress: snapshot.val().schoolCompanyAddress,
                    income: snapshot.val().income,
                    contactNumbers: snapshot.val().contactNumbers,
                    DengueText: snapshot.val().DengueText,
                    DengvaxiaText: snapshot.val().DengvaxiaText,
                });
            })
            .catch(error => {
                this.setState({
                    fullName: '',
                    age: '',
                    Gender: '',
                    Birthday: '',
                    Address: '',
                    Work: '',
                    schoolCompany: '',
                    schoolCompanyAddress: '',
                    income: '',
                    contactNumbers: '',
                    DengueText: '',
                    DengvaxiaText: '',
                });
            });
    }

    async submitUpdateProfil() {
        let isBoolean = false;
        let account = {};
        account.fullName = this.state.fullName;
        account.age = this.state.age;
        account.Gender = this.state.Gender;
        account.Birthday = this.state.Birthday;
        account.Address = this.state.Address;
        account.Work = this.state.Work;
        account.schoolCompany = this.state.schoolCompany;
        account.schoolCompanyAddress = this.state.schoolCompanyAddress;
        account.income = this.state.income;
        account.contactNumbers = this.state.contactNumbers;
        account.DengueText = this.state.DengueText;
        account.DengvaxiaText = this.state.DengvaxiaText;

        if (!account.fullName.toString().trim()) {
            alert('Masukkan username');
            isBoolean = true;
        }

        if (!account.age.toString().trim()) {
            alert('Masukkan umur anda.');
            isBoolean = true;
        }

        if (!account.Gender.toString().trim()) {
            alert('Masukkan jenis kelamin anda.');
            isBoolean = true;
        }

        if (!account.Birthday.toString().trim()) {
            alert('Masukkan tanggal ulang tahun anda.');
            isBoolean = true;
        }

        if (!account.Address.toString().trim()) {
            alert('Masukkan alamat lengkap anda.');
            isBoolean = true;
        }

        if (!account.Work.toString().trim()) {
            alert('Masukkan jenis kelamin anda.');
            isBoolean = true;
        }

        if (!account.schoolCompany.toString().trim()) {
            alert('Masukkan Nama Sekolah / Perusahaan.');
            isBoolean = true;
        }

        if (!account.schoolCompanyAddress.toString().trim()) {
            alert('Masukkan alamat sekolah / perusahaan.');
            isBoolean = true;
        }

        if (!account.income.toString().trim()) {
            alert('Masukkan pemasukkan uang bulanan.');
            isBoolean = true;
        }

        if (!account.contactNumbers.toString().trim()) {
            alert('Masukkan Nomor Handphone anda');
            isBoolean = true;
        }

        if (!isBoolean) {
            let userId = auth().currentUser.uid;
            const refDb = database().ref(`/posts/${userId}`);
            await refDb
                .update(account)
                .then(() => {
                    ToastAndroid.show(
                        'Update Profile berhasil',
                        ToastAndroid.SHORT,
                    );
                    this.props.navigation.goBack();
                })
                .catch(error => {
                    console.log(
                        `Gagal menyimpan ke realtime database: ${
                            error.message
                        }`,
                    );
                });
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
                    contentContainerStyle={{paddingBottom: 150}}
                    style={styles.scrollView}>
                    <View style={styles.titleContainer}>
                        <View style={styles.borderLine}>
                            <Text style={styles.titleText}>Profile</Text>
                        </View>
                    </View>

                    <View style={styles.formContainer}>
                        {/*TODO Username / name */}
                        <View style={styles.formGroup}>
                            {/*TODO Username FieldInput*/}
                            <Text style={styles.fieldLabel}>Username/Name</Text>
                            <TextInput
                                value={this.state.fullName}
                                style={styles.fieldInput}
                                placeholder="Last Name, First Name, Middle Name"
                                placeholderTextColor={colors.gray04}
                                underlineColorAndroid="transparent"
                                onChangeText={fullName =>
                                    this.setState({fullName})
                                }
                            />
                        </View>

                        {/*TODO GENDER / AGE*/}
                        <View style={styles.formGroup}>
                            {/*TODO AGE : FieldInput */}
                            <View style={styles.mb5}>
                                <Text style={styles.fieldLabel}>Age</Text>
                                <TextInput
                                    value={this.state.age}
                                    style={styles.fieldInput}
                                    placeholder="Age"
                                    placeholderTextColor={colors.gray04}
                                    underlineColorAndroid="transparent"
                                    onChangeText={age => this.setState({age})}
                                />
                            </View>
                            {/*TODO Gender : FieldInput */}
                            <View style={styles.mb5}>
                                <Text style={styles.fieldLabel}>Gender</Text>
                                <TextInput
                                    value={this.state.Gender}
                                    style={styles.fieldInput}
                                    placeholder="Gender"
                                    placeholderTextColor={colors.gray04}
                                    underlineColorAndroid="transparent"
                                    onChangeText={Gender =>
                                        this.setState({Gender})
                                    }
                                />
                            </View>
                        </View>

                        {/*TODO FromGroup Birthday*/}
                        <View style={styles.formGroup}>
                            <View style={styles.mb5}>
                                <Text style={styles.fieldLabel}>
                                    Date of Birthday
                                </Text>
                                <TextInput
                                    value={this.state.Birthday}
                                    style={styles.fieldInput}
                                    placeholder="Birthday"
                                    placeholderTextColor={colors.gray04}
                                    underlineColorAndroid="transparent"
                                    onChangeText={Birthday =>
                                        this.setState({Birthday})
                                    }
                                />
                            </View>
                        </View>

                        {/*TODO FormGroup ADDRESS*/}
                        <View style={styles.formGroup}>
                            <View style={styles.mb5}>
                                <Text style={styles.fieldLabel}>Address</Text>
                                <TextInput
                                    value={this.state.Address}
                                    style={styles.fieldInput}
                                    placeholder="Address"
                                    placeholderTextColor={colors.gray04}
                                    underlineColorAndroid="transparent"
                                    onChangeText={Address =>
                                        this.setState({Address})
                                    }
                                />
                            </View>
                        </View>

                        {/*TODO FormGroup Work*/}
                        <View style={styles.formGroup}>
                            <View style={styles.mb5}>
                                <Text style={styles.fieldLabel}>Work</Text>
                                <TextInput
                                    values={this.state.Work}
                                    style={styles.fieldInput}
                                    placeholder="Name of Work (e.g student, employee, etc.)"
                                    placeholderTextColor={colors.gray04}
                                    underlineColorAndroid={'transparent'}
                                    onChangeText={Work => this.setState({Work})}
                                />
                            </View>
                        </View>

                        {/*TODO School / Company*/}
                        <View style={styles.formGroup}>
                            <View style={styles.mb5}>
                                <Text style={styles.fieldLabel}>
                                    School/Company
                                </Text>
                                <View style={styles.sizeInput}>
                                    <TextInput
                                        value={this.state.schoolCompany}
                                        style={styles.fieldInput}
                                        placeholder="Name of school or company"
                                        placeholderTextColor={colors.gray04}
                                        underlineColorAndroid="transparent"
                                        onChangeText={schoolCompany =>
                                            this.setState({schoolCompany})
                                        }
                                    />
                                </View>

                                <View style={styles.sizeInput}>
                                    <TextInput
                                        value={this.state.schoolCompanyAddress}
                                        style={styles.fieldInput}
                                        placeholder="Address School / Company"
                                        placeholderTextColor={colors.gray04}
                                        underlineColorAndroid="transparent"
                                        onChangeText={schoolCompanyAddress => {
                                            this.setState({
                                                schoolCompanyAddress,
                                            });
                                        }}
                                    />
                                </View>
                            </View>
                        </View>

                        {/*TODO Family Monthly Income*/}
                        <View style={styles.formGroup}>
                            <View style={styles.mb5}>
                                <Text style={styles.fieldLabel}>
                                    Family Monthly Income
                                </Text>
                                <TextInput
                                    value={this.state.income}
                                    style={styles.fieldInput}
                                    placeholder="Family Monthly Income"
                                    placeholderTextColor={colors.gray04}
                                    underlineColorAndroid="transparent"
                                    onChangeText={income =>
                                        this.setState({income})
                                    }
                                />
                            </View>
                        </View>

                        {/*TODO Contacts number/s */}
                        <View style={styles.sizeInput}>
                            <View style={styles.mb5}>
                                <Text style={styles.fieldLabel}>
                                    Contacts number/s
                                </Text>
                                <TextInput
                                    value={this.state.contactNumbers}
                                    style={styles.fieldInput}
                                    placeholder="Contacts number"
                                    placeholderTextColor={colors.gray04}
                                    underlineColorAndroid="transparent"
                                    onChangeText={contactNumbers =>
                                        this.setState({contactNumbers})
                                    }
                                />
                            </View>
                        </View>

                        <View style={styles.borderLine}>
                            <Text style={styles.titleText}>Health</Text>
                        </View>

                        <View style={styles.sizeInput}>
                            <Text style={styles.fieldLabel}>
                                Have you had Dengue before?
                            </Text>
                            <View style={styles.sizeInput}>
                                <TextInput
                                    value={this.state.DengueText}
                                    style={styles.fieldInput}
                                    placeholderTextColor={colors.gray04}
                                    underlineColorAndroid="transparent"
                                    onChangeText={DengueText =>
                                        this.setState({DengueText})
                                    }
                                />
                            </View>
                        </View>
                        <Text style={styles.fieldLabel}>
                            Did you get Dengvaxia vaccine shots?
                        </Text>
                        <View style={styles.sizeInput}>
                            <TextInput
                                value={this.state.DengvaxiaText}
                                style={styles.fieldInput}
                                placeholderTextColor={colors.gray04}
                                underlineColorAndroid="transparent"
                                onChangeText={DengvaxiaText =>
                                    this.setState({DengvaxiaText})
                                }
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                this.submitUpdateProfil();
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
    borderLine: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray04,
    },
    sizeInput: {
        paddingVertical: 10,
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

export default UpdateProfile;
