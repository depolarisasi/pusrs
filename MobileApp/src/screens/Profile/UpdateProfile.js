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
} from 'react-native';
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
            username: '',
            age: '',
            gender: '',
            birthday: '',
            address: '',
            work: '',
            schoolCompany: '',
            addressSchoolCompany: '',
            familyMonthlyIncome: '',
            contactNumnber: '',
            question01: '',
            question02: '',
        };
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
                                value={this.state.username}
                                style={styles.fieldInput}
                                placeholder="Last Name, First Name, Middle Name"
                                placeholderTextColor={colors.gray04}
                                underlineColorAndroid="transparent"
                                onChangeText={username =>
                                    this.state({username})
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
                                    value={this.state.gender}
                                    style={styles.fieldInput}
                                    placeholder="Gender"
                                    placeholderTextColor={colors.gray04}
                                    underlineColorAndroid="transparent"
                                    onChangeText={gender =>
                                        this.setState({gender})
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
                                    value={this.state.birthday}
                                    style={styles.fieldInput}
                                    placeholder="Birthday"
                                    placeholderTextColor={colors.gray04}
                                    underlineColorAndroid="transparent"
                                    onChangeText={birthday =>
                                        this.state({birthday})
                                    }
                                />
                            </View>
                        </View>

                        {/*TODO FormGroup ADDRESS*/}
                        <View style={styles.formGroup}>
                            <View style={styles.mb5}>
                                <Text style={styles.fieldLabel}>Address</Text>
                                <TextInput
                                    value={this.state.address}
                                    style={styles.fieldInput}
                                    placeholder="Address"
                                    placeholderTextColor={colors.gray04}
                                    underlineColorAndroid="transparent"
                                    onChangeText={address =>
                                        this.setState({address})
                                    }
                                />
                            </View>
                        </View>

                        {/*TODO FormGroup Work*/}
                        <View style={styles.formGroup}>
                            <View style={styles.mb5}>
                                <Text style={styles.fieldLabel}>Work</Text>
                                <TextInput
                                    values={this.state.work}
                                    style={styles.fieldInput}
                                    placeholder="Name of Work (e.g student, employee, etc.)"
                                    placeholderTextColor={colors.gray04}
                                    underlineColorAndroid={'transparent'}
                                    onChangeText={work => this.setState({work})}
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
                                        value={this.state.addressSchoolCompany}
                                        style={styles.fieldInput}
                                        placeholder="Address School / Company"
                                        placeholderTextColor={colors.gray04}
                                        underlineColorAndroid="transparent"
                                        onChangeText={addressSchoolCompany => {
                                            this.setState({
                                                addressSchoolCompany,
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
                                    value={this.state.familyMonthlyIncome}
                                    style={styles.fieldInput}
                                    placeholder="Family Monthly Income"
                                    placeholderTextColor={colors.gray04}
                                    underlineColorAndroid="transparent"
                                    onChangeText={familyMonthlyIncome =>
                                        this.setState({familyMonthlyIncome})
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
                                    value={this.state.contactNumnber}
                                    style={styles.fieldInput}
                                    placeholder="Contacts number"
                                    placeholderTextColor={colors.gray04}
                                    underlineColorAndroid="transparent"
                                    onChangeText={contactNumnber =>
                                        this.setState({contactNumnber})
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
                                    value={this.state.question01}
                                    style={styles.fieldInput}
                                    placeholderTextColor={colors.gray04}
                                    underlineColorAndroid="transparent"
                                    onChangeText={question01 =>
                                        this.setState({question01})
                                    }
                                />
                            </View>
                        </View>
                        <Text style={styles.fieldLabel}>
                            Did you get Dengvaxia vaccine shots?
                        </Text>
                        <View style={styles.sizeInput}>
                            <TextInput
                                value={this.state.question02}
                                style={styles.fieldInput}
                                placeholderTextColor={colors.gray04}
                                underlineColorAndroid="transparent"
                                onChangeText={question01 =>
                                    this.setState({question01})
                                }
                            />
                        </View>
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
