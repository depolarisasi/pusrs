/*
 * Created on Wed Dec 11 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, {Component} from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ToastAndroid,
    Modal,
} from 'react-native';
import colors from '../../styles/colors';
import HeaderForm from '../../components/headers/HeaderForm';
import Picker from '@react-native-community/picker/js/Picker';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-picker';
import {addDataProbableCases} from './PostTaskSubProbableCases';
import storage from '@react-native-firebase/storage';
import {getAsyncStorage} from '../UtilsHelper';

let uuid = require('react-native-uuid');

class ProbableCases extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: () => <HeaderForm navigation={navigation} />,
        };
    };

    constructor(props) {
        super(props);
        const {params} = this.props.navigation.state;
        const currentUser = auth().currentUser
        this.state = {
            isLoading: true,
            isUploading: false,
            reportedBy: currentUser.email,
            accessToken: '',
            address: '',
            barangay: '',
            residence: '',
            condition: 'Probable Cases',
            age: '',
            gender: '',
            lat: params.latitude,
            long: params.longitude,
            notes: 'test notes',
            filepath: {
                data: '',
                uri: '',
            },
            fileData: '',
            fileUri: '',
            objectId: '',
            uniqueId: '',
            globalId: '',
            progress: 0,
            loadingLabel: 'Sedang Memuat',
            urlPhotoFirebase: '',
            statResponse: '',
            modalSubmitProbableVisible: false,
        };
        this.fetchGetTokenProbable = this.fetchGetTokenProbable.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.isUploadingLabel = this.isUploadingLabel.bind(this);
        this.renderModulLoadingIndicatior = this.renderModulLoadingIndicatior.bind(
            this,
        );
    }

    async componentDidMount(): void {
        try{
            this.setState({isLoading: true})
            this.props.navigation.setParams({
                checkProbableCases: this.checkProbableCases.bind(this),
            });
            await this.fetchGetTokenProbable();
            this.setState({isLoading: false})
        }catch(err){
            console.log('ERROR ', err.message)
            this.setState({isLoading: false})
        }

        this.submitProbableCases = this.submitProbableCases.bind(this);
    }

    fetchGetTokenProbable() {
        getAsyncStorage('accessToken').then(data => {
            this.setState({
                accessToken: data,
            });
        });
    }

    handleRefreshToken = () => {
        this.setState({isLoading: true}, () => this.fetchGenerateToken());
    };

    toogleModalLoadingIndicator = state =>
        this.setState({modalSubmitProbableVisible: state});

    renderModulLoadingIndicatior() {
        return (
            <Modal
                transparent={true}
                animationType="fade"
                onRequestClose={() => this.toogleModalLoadingIndicator(false)}
                visible={this.state.modalSubmitProbableVisible}>
                <View style={styles.wrapper}>
                    <StatusBar
                        backgroundColor={colors.green01}
                        barStyle="dark-content"
                    />
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>
                            {this.state.condition}
                        </Text>
                    </View>
                    <View style={styles.loadingBackground}>
                        <Text>{this.state.loadingLabel}</Text>
                        {this.isUploadingLabel()}
                        <ActivityIndicator size="large" />
                    </View>
                </View>
            </Modal>
        );
    }

    async addInfoProbableFirebase(objectId, uniqueId, globalId, status, url) {
        // let userId = auth().currentUser.uid;
        const user = auth().currentUser.toJSON()
        let addInfoPro = {};
        addInfoPro.object_id = objectId;
        addInfoPro.uniqueId = uniqueId;
        addInfoPro.globalId = globalId;
        addInfoPro.staResponse = status;
        addInfoPro.imageUrl = url;
        addInfoPro.user = {
            uid: user.uid,
            email: user.email
        }
        // const refDb = database().ref(`/posts/${userId}/probable_cases`);
        const refDb = database().ref(`/probable_cases`);
        await refDb.push(addInfoPro).then(() => {
            this.props.navigation.goBack();
            ToastAndroid.show('Input Data Berhasil', ToastAndroid.SHORT);
            this.toogleModalLoadingIndicator(false);
        });
    }

    generateJsonProbableCases() {
        const o1 = [
            {
                geometry: {
                    x: `${this.state.lat}`,
                    y: `${this.state.long}`,
                    spatialReference: {
                        wkid: '4326',
                    },
                },
                attributes: {
                    ID: '',
                    Reported_b: this.state.reportedBy,
                    lat: `${this.state.lat}`,
                    long: `${this.state.long}`,
                    address: this.state.address,
                    barangpay: this.state.barangay,
                    Residence: this.state.residence,
                    Notes: this.state.notes,
                    gender: this.state.gender,
                    condition: 'Probable Cases',
                    Age: this.state.age,
                },
            },
        ];
        return JSON.stringify(o1);
    }

    submitProbableCases = accessToken => {
        addDataProbableCases(
            accessToken,
            this.generateJsonProbableCases(),
        ).then(data => {
            let state;
            state = {
                objectId: data.objectId,
                uniqueId: data.uniqueId,
                globalId: data.globalId,
                statResponse: data.success,
            };
            this.setState(state);
            console.log(`filePath: ${this.state.filepath}`);
            this.toogleModalLoadingIndicator(true);
            if (this.state.fileUri.length > 0) {
                this.uploadImage();
            } else {
                this.addInfoProbableFirebase(
                    `${this.state.objectId}`,
                    `${this.state.uniqueId}`,
                    `${this.state.globalId}`,
                    `${this.state.statResponse}`,
                    `${this.state.urlPhotoFirebase}`,
                ).then(r => {
                    this.setState({
                        isUploading: false,
                        isLoading: true,
                        loadingLabel: 'Mengirim Data...',
                    });
                });
            }
        });
    };

    GetPropertyValue(obj1, dataToRetrieve) {
        return dataToRetrieve
            .split('.') // split string based on `.`
            .reduce(function(o, k) {
                return o && o[k]; // get inner property if `o` is defined else get `o` and return
            }, obj1); // set initial value as object
    }

    GetPropertyValue2(dataToRetrieve) {
        return dataToRetrieve
            .split('.') // split string based on `.`
            .reduce(function(o, k) {
                return o && o[k]; // get inner property if `o` is defined else get `o` and return
            });
    }

    checkProbableCases() {
        let isError = false;
        if (this.state.reportedBy.length === 0) {
            Alert.alert('Pemberitahuan', 'Silahkan Masukkan Email');
            isError = true;
        }

        if (this.state.barangay.length === 0) {
            Alert.alert('Pemberitahuan', 'Silahkan Isi Kolom Kecamatan');
            isError = true;
        }

        if (this.state.address.length === 0) {
            Alert.alert('Pemberitahuan', 'Silahkan Masukkan Alamat');
            isError = true;
        }

        if (this.state.residence.length === 0) {
            Alert.alert('Pemberitahuan', 'Silahkan Masukkan Kabupaten / Kota');
            isError = true;
        }

        if (this.state.age.length === 0) {
            Alert.alert('Pemberitahuan', 'Silahkan Masukkan Usia');
            isError = true;
        }

        if (this.state.gender.includes('-')) {
            Alert.alert('Pemberitahuan', 'Silahkan isi Jenis Kelamin');
            isError = true;
        }

        if (!isError) {
            this.submitProbableCases(this.state.accessToken);
        }
    }

    uploadImage = () => {
        const ext = this.state.fileUri.split('.').pop(); // Extract image extension
        const filename = `${uuid()}.${ext}`; // Generate unique name
        this.setState({
            isLoading: true,
            isUploading: true,
            loadingLabel: 'Mengunggah Foto',
        });
        console.log(`firebase Storage ${this.state.fileUri}`);
        storage()
            .ref(`probable_cases/${filename}`)
            .putFile(this.state.fileUri)
            .on(
                storage.TaskEvent.STATE_CHANGED,
                snapshot => {
                    let state = {};
                    state = {
                        ...state,
                        progress:
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100, // TODO Calculate progress percentage
                    };
                    if (snapshot.state === storage.TaskState.SUCCESS) {
                        state = {
                            ...state,
                            filePath: '',
                            fileData: '',
                            fileUri: '',
                            isLoading: false,
                            isUploading: false,
                            progress: 0,
                        };
                        console.log(
                            `Success Upload Photo Probable3: ${
                                this.state.urlPhotoFirebase
                            }`,
                        );
                        this.setState(state);
                        snapshot.ref.getDownloadURL().then(url => {
                            this.setState({urlPhotoFirebase: url});
                            this.addInfoProbableFirebase(
                                `${this.state.objectId}`,
                                `${this.state.uniqueId}`,
                                `${this.state.globalId}`,
                                `${this.state.statResponse}`,
                                `${this.state.urlPhotoFirebase}`,
                            ).then(r => {
                                let stateAddInfo = {
                                    isUploading: false,
                                    isLoading: true,
                                    loadingLabel: 'Mengirim Data...',
                                };
                                this.setState(stateAddInfo);
                            });
                        });
                    }
                },
                error => {
                    this.unsubscribe();
                    Alert.alert('Error!', 'Sorry, Try again.');
                },
            );
    };

    renderAttachmentProbable() {
        if (this.state.fileData.length > 0) {
            return (
                <View style={styles.ImageSections}>
                    <Image
                        source={{
                            uri:
                                'data:image/jpeg;base64,' + this.state.fileData,
                        }}
                        style={styles.images}
                    />
                </View>
            );
        } else {
            return (
                <View style={styles.ImageSections}>
                    <Image
                        source={require('../../img/dummy.jpg')}
                        style={styles.images}
                    />
                </View>
            );
        }
    }

    validationGender() {
        if (this.state.gender.length === 0) {
            return (
                <Picker
                    selectedValue={this.state.gender}
                    style={styles.fieldInput}
                    onValueChange={(gender, itemIndex) =>
                        this.setState({
                            gender: gender,
                        })
                    }>
                    <Picker.Item label="-" value="-" />
                    <Picker.Item label="Pria" value="Pria" />
                    <Picker.Item label="Wanita" value="Female" />
                </Picker>
            );
        } else {
            return (
                <Picker
                    selectedValue={this.state.gender}
                    style={styles.fieldInput}
                    onValueChange={(gender, itemIndex) =>
                        this.setState({
                            gender: gender,
                        })
                    }>
                    <Picker.Item label="Pria" value="Pria" />
                    <Picker.Item label="Wanita" value="Female" />
                </Picker>
            );
        }
    }

    onClickAttachments(index) {
        if (index === 1) {
            this.launchImageLibrary();
        } else if (index === 2) {
            this.launchCamera();
        }
    }

    launchImageLibrary = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchImageLibrary(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log(
                    'User tapped custom button: ',
                    response.customButton,
                );
            } else {
                const source = {uri: response.uri};
                console.log('response', JSON.stringify(response));
                this.setState({
                    filePath: response,
                    fileData: response.data,
                    fileUri: response.uri,
                });
            }
        });
    };

    launchCamera = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchCamera(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log(
                    'User tapped custom button: ',
                    response.customButton,
                );
                alert(response.customButton);
            } else {
                const source = {uri: response.uri};
                console.log('response', JSON.stringify(response));
                this.setState({
                    filePath: response,
                    fileData: response.data,
                    fileUri: response.uri,
                });
            }
        });
    };

    showActionSheet = () => {
        this.ActionSheet.show();
    };

    isUploadingLabel = () => {
        if (this.state.isUploading) {
            return <Text>{`${this.state.progress} %`}</Text>;
        }
    };

    render() {
        const optionArray = [
            <Text style={{color: colors.red01}}>Cancel</Text>,
            'Galeri',
            'Kamera',
        ];
        if (this.state.isLoading) {
            return (
                <View style={styles.wrapper}>
                    <StatusBar
                        backgroundColor={colors.green01}
                        barStyle="dark-content"
                    />
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>
                            {this.state.condition}
                        </Text>
                    </View>
                    <View style={styles.loadingBackground}>
                        <Text>{this.state.loadingLabel}</Text>
                        {this.isUploadingLabel()}
                        <ActivityIndicator size="large" />
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.wrapper}>
                    <StatusBar
                        backgroundColor={colors.green01}
                        barStyle="dark-content"
                    />
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>
                            {this.state.condition}
                        </Text>
                    </View>
                    <ScrollView
                        contentContainerStyle={{paddingBottom: 20}}
                        style={styles.scrollView}>
                        <View style={styles.formGroup}>
                            <Text style={styles.fieldLabel}>
                                Dilaporkan oleh
                            </Text>
                            <TextInput
                                value={this.state.reportedBy}
                                style={styles.fieldInput}
                                placeholder="Email"
                                editable={false}
                                placeholderTextColor={colors.gray04}
                                underlineColorAndroid="transparent"
                                onChangeText={reportedBy =>
                                    this.setState({reportedBy})
                                }
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.fieldLabel}>Alamat</Text>
                            <TextInput
                                value={this.state.address}
                                style={styles.fieldInput}
                                placeholder="Alamat"
                                placeholderTextColor={colors.gray04}
                                underlineColorAndroid="transparent"
                                onChangeText={address =>
                                    this.setState({address})
                                }
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.fieldLabel}>Kecamatan</Text>
                            <TextInput
                                value={this.state.barangay}
                                style={styles.fieldInput}
                                placeholder="Kecamatan"
                                placeholderTextColor={colors.gray04}
                                underlineColorAndroid="transparent"
                                onChangeText={barangay =>
                                    this.setState({barangay})
                                }
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.fieldLabel}>
                                Kota / Kabupaten / Provinsi
                            </Text>
                            <TextInput
                                value={this.state.residence}
                                style={styles.fieldInput}
                                placeholder="Kota / Kabupaten / Provinsi"
                                placeholderTextColor={colors.gray04}
                                underlineColorAndroid="transparent"
                                onChangeText={residence =>
                                    this.setState({residence})
                                }
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.fieldLabel}>Kondisi</Text>
                            <TextInput
                                value={this.state.condition}
                                editable={false}
                                style={styles.fieldInput}
                                underlineColorAndroid="transparent"
                                onChangeText={condition =>
                                    this.setState({condition})
                                }
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.fieldLabel}>Umur</Text>
                            <TextInput
                                value={this.state.age}
                                style={styles.fieldInput}
                                placeholder="Umur"
                                keyboardType="number-pad"
                                placeholderTextColor={colors.gray04}
                                underlineColorAndroid="transparent"
                                onChangeText={age => this.setState({age})}
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.fieldLabel}>Jenis kelamin</Text>
                            {this.validationGender()}
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.fieldLabel}>Latitude</Text>
                            <TextInput
                                value={`${this.state.lat}`}
                                style={styles.fieldInput}
                                editable={false}
                                underlineColorAndroid="transparent"
                                onChangeText={lat => this.setState({lat})}
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.fieldLabel}>Longitude</Text>
                            <TextInput
                                value={`${this.state.long}`}
                                editable={false}
                                style={styles.fieldInput}
                                underlineColorAndroid="transparent"
                                onChangeText={long => this.setState({long})}
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.fieldLabel}>Catatan</Text>
                            <TextInput
                                value={this.state.notes}
                                style={styles.fieldInput}
                                placeholder="Catatan"
                                placeholderTextColor={colors.gray04}
                                underlineColorAndroid="transparent"
                                onChangeText={notes => this.setState({notes})}
                            />
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.4}
                            onPress={() => {
                                this.showActionSheet();
                            }}
                            style={styles.addButton}>
                            <Text style={styles.addButtonText}>
                                Tambahkan Lampiran
                            </Text>
                            <Icon
                                name="ios-camera"
                                color={colors.green01}
                                size={30}
                            />
                        </TouchableOpacity>
                        <View>{this.renderAttachmentProbable()}</View>
                        <ActionSheet
                            ref={o => (this.ActionSheet = o)}
                            title={
                                <Text style={{color: '#000', fontSize: 18}}>
                                    Yang mana yang kamu suka?
                                </Text>
                            }
                            style={styles.actionSheetAttactment}
                            options={optionArray}
                            cancelButtonIndex={0}
                            onPress={index => {
                                this.onClickAttachments(index);
                            }}
                        />
                    </ScrollView>
                    {this.renderModulLoadingIndicatior()}
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: colors.black,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    titleContainer: {
        backgroundColor: colors.green01,
        paddingHorizontal: 15,
        paddingBottom: 15,
        justifyContent: 'center',
    },
    titleText: {
        fontWeight: 'bold',
        color: colors.white,
        fontSize: 18,
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
    formGroup: {
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray05,
    },
    pickerStyle: {
        backgroundColor: colors.gray02,
        fontSize: 12,
        borderColor: colors.white,
        borderWidth: 1,
        color: colors.gray03,
    },
    ImageSections: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 8,
        justifyContent: 'center',
    },
    images: {
        width: Dimensions.get('window').width - 20,
        height: 150,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3,
    },
    addButton: {
        backgroundColor: colors.gray05,
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.green01,
    },
    actionSheetAttactment: {
        fontSize: 16,
        color: '#000',
    },
    loadingBackground: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ProbableCases;
