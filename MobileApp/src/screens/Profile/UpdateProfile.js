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
    DatePickerAndroid,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import HeaderTitleBackable from '../../components/headers/HeaderTitleBackable';
import colors from '../../styles/colors';
import Picker from '@react-native-community/picker/js/Picker';

class UpdateProfile extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: () => (
                <HeaderTitleBackable navigation={navigation} title="Profil" />
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
                        'Update Profil berhasil',
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

    async showDateBirthday() {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date(),
                maxDate: new Date(),
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                this.setState({
                    yearDate: `${year}`,
                    monthDate: `${month}`,
                    dayDate: `${day}`,
                });
                this.setState({Birthday: `${day}/${month + 1}/${year}`});
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }

    validationGender() {
        if (this.state.Gender.length === 0) {
            return (
                <Picker
                    selectedValue={this.state.Gender}
                    style={styles.fieldInput}
                    onValueChange={(Gender, itemIndex) =>
                        this.setState({
                            Gender: Gender,
                        })
                    }>
                    <Picker.Item label="-" value="-" />
                    <Picker.Item label="Pria" value="Pria" />
                    <Picker.Item label="Wanita" value="Wanita" />
                </Picker>
            );
        } else {
            return (
                <Picker
                    selectedValue={this.state.Gender}
                    style={styles.fieldInput}
                    onValueChange={(Gender, itemIndex) =>
                        this.setState({
                            Gender: Gender,
                        })
                    }>
                    <Picker.Item label="Pria" value="Pria" />
                    <Picker.Item label="Wanita" value="Wanita" />
                </Picker>
            );
        }
    }

    validationWork() {
        if (this.state.Work.length === 0) {
            return (
                <Picker
                    selectedValue={this.state.Work}
                    style={styles.fieldInput}
                    onValueChange={(Work, itemIndex) =>
                        this.setState({
                            Work: Work,
                        })
                    }>
                    <Picker.Item label="-" value="-" />
                    <Picker.Item
                        label="Pegawai Negeri / BUMN"
                        value="Pegawai Negeri / BUMN"
                    />
                    <Picker.Item
                        label="Pegawai Swasta"
                        value="Pegawai Swasta"
                    />

                    <Picker.Item label="Wiraswasta" value="Wiraswasta" />
                    <Picker.Item label="TNI / POLRI" value="TNI / POLRI" />
                    <Picker.Item label="Pensiun" value="Pensiun" />
                </Picker>
            );
        } else {
            return (
                <Picker
                    selectedValue={this.state.Work}
                    style={styles.fieldInput}
                    onValueChange={(Work, itemIndex) =>
                        this.setState({
                            Work: Work,
                        })
                    }>
                    <Picker.Item
                        label="Pegawai Negeri / BUMN"
                        value="Pegawai Negeri / BUMN"
                    />
                    <Picker.Item
                        label="Pegawai Swasta"
                        value="Pegawai Swasta"
                    />

                    <Picker.Item label="Wiraswasta" value="Wiraswasta" />
                    <Picker.Item label="TNI / POLRI" value="TNI / POLRI" />
                    <Picker.Item label="Pensiun" value="Pensiun" />
                </Picker>
            );
        }
    }

    validationDengvaxiaText() {
        if (this.state.DengvaxiaText.length === 0) {
            return (
                <Picker
                    selectedValue={this.state.DengvaxiaText}
                    style={styles.fieldInput}
                    onValueChange={(DengvaxiaText, itemIndex) =>
                        this.setState({
                            DengvaxiaText: DengvaxiaText,
                        })
                    }>
                    <Picker.Item label="-" value="-" />
                    <Picker.Item label="Ya" value="Ya" />
                    <Picker.Item label="Tidak" value="Tidak" />
                </Picker>
            );
        } else {
            return (
                <Picker
                    selectedValue={this.state.DengvaxiaText}
                    style={styles.fieldInput}
                    onValueChange={(DengvaxiaText, itemIndex) =>
                        this.setState({
                            DengvaxiaText: DengvaxiaText,
                        })
                    }>
                    <Picker.Item label="Ya" value="Ya" />
                    <Picker.Item label="Tidak" value="Tidak" />
                </Picker>
            );
        }
    }

    validationDengueText() {
        if (this.state.DengueText.length === 0) {
            return (
                <Picker
                    selectedValue={this.state.DengueText}
                    style={styles.fieldInput}
                    onValueChange={(DengueText, itemIndex) =>
                        this.setState({
                            DengueText: DengueText,
                        })
                    }>
                    <Picker.Item label="-" value="-" />
                    <Picker.Item label="Ya" value="Ya" />
                    <Picker.Item label="Tidak" value="Tidak" />
                </Picker>
            );
        } else {
            return (
                <Picker
                    selectedValue={this.state.DengueText}
                    style={styles.fieldInput}
                    onValueChange={(DengueText, itemIndex) =>
                        this.setState({
                            DengueText: DengueText,
                        })
                    }>
                    <Picker.Item label="Ya" value="Ya" />
                    <Picker.Item label="Tidak" value="Tidak" />
                </Picker>
            );
        }
    }

    validationFamilyIncome() {
        if (this.state.income.length === 0) {
            return (
                <Picker
                    selectedValue={this.state.income}
                    style={styles.fieldInput}
                    onValueChange={(income, itemIndex) =>
                        this.setState({
                            income: income,
                        })
                    }>
                    <Picker.Item label="-" value="-" />
                    <Picker.Item label="<= Rp 500.000" value="<= Rp 500.000" />
                    <Picker.Item
                        label="> Rp 500.000 & Rp <= Rp. 1.500.000"
                        value=">= Rp 500.000 & Rp <= Rp. 1.500.000"
                    />
                    <Picker.Item
                        label="> Rp 1.500.000 & Rp <= Rp. 3.000.000"
                        value="> Rp 1.500.000 & Rp <= Rp. 3.000.000"
                    />
                    <Picker.Item
                        label="> Rp 3.000.000 & Rp <= Rp. 6.000.000"
                        value="> Rp 3.000.000 & Rp <= Rp. 6.000.000"
                    />
                    <Picker.Item
                        label="> Rp 6.000.000 & Rp <= Rp. 10.000.000"
                        value="> Rp 6.000.000 & Rp <= Rp. 10.000.000"
                    />
                    <Picker.Item
                        label="> Rp 10.000.000 & Rp <= Rp. 15.000.000"
                        value="> Rp 10.000.000 & Rp <= Rp. 15.000.000"
                    />
                    <Picker.Item
                        label=">= Rp. 15.000.000"
                        value=">= Rp. 15.000.000"
                    />
                </Picker>
            );
        } else {
            return (
                <Picker
                    selectedValue={this.state.income}
                    style={styles.fieldInput}
                    onValueChange={(income, itemIndex) =>
                        this.setState({
                            income: income,
                        })
                    }>
                    <Picker.Item label="<= Rp 500.000" value="<= Rp 500.000" />
                    <Picker.Item
                        label="> Rp 500.000 & Rp <= Rp. 1.500.000"
                        value=">= Rp 500.000 & Rp <= Rp. 1.500.000"
                    />
                    <Picker.Item
                        label="> Rp 1.500.000 & Rp <= Rp. 3.000.000"
                        value="> Rp 1.500.000 & Rp <= Rp. 3.000.000"
                    />
                    <Picker.Item
                        label="> Rp 3.000.000 & Rp <= Rp. 6.000.000"
                        value="> Rp 3.000.000 & Rp <= Rp. 6.000.000"
                    />
                    <Picker.Item
                        label="> Rp 6.000.000 & Rp <= Rp. 10.000.000"
                        value="> Rp 6.000.000 & Rp <= Rp. 10.000.000"
                    />
                    <Picker.Item
                        label="> Rp 10.000.000 & Rp <= Rp. 15.000.000"
                        value="> Rp 10.000.000 & Rp <= Rp. 15.000.000"
                    />
                    <Picker.Item
                        label=">= Rp. 15.000.000"
                        value=">= Rp. 15.000.000"
                    />
                </Picker>
            );
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
                            <Text style={styles.titleText}>Profil</Text>
                        </View>
                    </View>

                    <View style={styles.formContainer}>
                        {/*TODO Username / name */}
                        <View style={styles.formGroup}>
                            {/*TODO Username FieldInput*/}
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
                                <Text style={styles.fieldLabel}>Umur</Text>
                                <TextInput
                                    value={this.state.age}
                                    style={styles.fieldInput}
                                    placeholder="Umur (Contoh: 26)"
                                    keyboardType="number-pad"
                                    placeholderTextColor={colors.gray04}
                                    underlineColorAndroid="transparent"
                                    onChangeText={age => this.setState({age})}
                                />
                            </View>
                            {/*TODO Gender : FieldInput */}
                            <View style={styles.mb5}>
                                <Text style={styles.fieldLabel}>
                                    Jenis Kelamin
                                </Text>
                                {this.validationGender()}
                            </View>
                        </View>

                        {/*TODO FromGroup Birthday*/}
                        <View style={styles.formGroup}>
                            <View style={styles.mb5}>
                                <Text style={styles.fieldLabel}>
                                    Tanggal Kelahiran
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.showDateBirthday().then('Execute');
                                    }}>
                                    <TextInput
                                        value={this.state.Birthday}
                                        style={styles.fieldInput}
                                        placeholder="Tanggal Kelahiran"
                                        placeholderTextColor={colors.gray04}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                        onChangeText={Birthday =>
                                            this.setState({Birthday})
                                        }
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/*TODO FormGroup ADDRESS*/}
                        <View style={styles.formGroup}>
                            <View style={styles.mb5}>
                                <Text style={styles.fieldLabel}>
                                    Alamat Rumah
                                </Text>
                                <TextInput
                                    value={this.state.Address}
                                    style={styles.fieldInput}
                                    placeholder="Alamat Rumah"
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
                                <Text style={styles.fieldLabel}>Pekerjaan</Text>
                                {this.validationWork()}
                            </View>
                        </View>

                        {/*TODO School / Company*/}
                        <View style={styles.formGroup}>
                            <View style={styles.mb5}>
                                <Text style={styles.fieldLabel}>
                                    Sekolah / Perusahaan
                                </Text>
                                <View style={styles.sizeInput}>
                                    <TextInput
                                        value={this.state.schoolCompany}
                                        style={styles.fieldInput}
                                        placeholder="Nama Perusahaan / Sekolah"
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
                                        placeholder="Alamat Perusahaan / Sekolah"
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
                                    Pendapatan Bulanan Keluarga
                                </Text>
                                {this.validationFamilyIncome()}
                            </View>
                        </View>

                        {/*TODO Contacts number/s */}
                        <View style={styles.sizeInput}>
                            <View style={styles.mb5}>
                                <Text style={styles.fieldLabel}>
                                    No. Handphone
                                </Text>
                                <TextInput
                                    value={this.state.contactNumbers}
                                    style={styles.fieldInput}
                                    placeholder="No Handphone"
                                    keyboardType="number-pad"
                                    placeholderTextColor={colors.gray04}
                                    underlineColorAndroid="transparent"
                                    onChangeText={contactNumbers =>
                                        this.setState({contactNumbers})
                                    }
                                />
                            </View>
                        </View>

                        <View style={styles.borderLine}>
                            <Text style={styles.titleText}>Kesehatan</Text>
                        </View>

                        <View style={styles.sizeInput}>
                            <Text style={styles.fieldLabel}>
                                Pernahkah Anda menderita Demam Berdarah?
                            </Text>
                            <View style={styles.sizeInput}>
                                {this.validationDengueText()}
                            </View>
                        </View>
                        <Text style={styles.fieldLabel}>
                            Apakah Anda mendapatkan suntikan vaksin Dengvaxia?
                        </Text>
                        <View style={styles.sizeInput}>
                            {this.validationDengvaxiaText()}
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                this.submitUpdateProfil();
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
