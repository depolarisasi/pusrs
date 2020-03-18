/**
 * Created by Handika Dwiputra on 16/02/2020.
 * handikadwiputradev@gmail.com
 */

import React, {Component} from 'react';
import HeaderMoquito from '../../components/headers/HeaderMoquito';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Image,
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native';
import colors from '../../styles/colors';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-picker';
import {getAsyncStorage} from '../UtilsHelper';
import {addSubMoquitoCases} from './PostTaskSubMoquitoCases';
import storage from '@react-native-firebase/storage';
let uuid = require('react-native-uuid');

class MoquitoCases extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: () => <HeaderMoquito navigation={navigation} />,
        };
    };

    constructor(props) {
        super(props);
        const {params} = this.props.navigation.state;
        this.state = {
            isLoading: true,
            reportedBy: '',
            address: '',
            barangay: '',
            residence: '',
            lat: params.latitude,
            long: params.longitude,
            notes: '',
            filepath: {
                data: '',
                uri: '',
            },
            fileData: '',
            fileUri: '',
            loadingLabel: 'Sedang Memuat',
            urlPhotoFirebase: '',
            statResponse: '',
            progress: 0,
            modalSubmitMoquitoVisible: false,
            objectId: '',
            uniqueId: '',
            globalId: '',
            condition: 'Moquito Cases',
        };
        this.fetchGetTokenMoquito = this.fetchGetTokenMoquito.bind(this);
        this.uploadImageMoquitoCases = this.uploadImageMoquitoCases.bind(this);
        this.submitMoquitoCases = this.submitMoquitoCases.bind(this);
        this.isUploadingLabel = this.isUploadingLabel.bind(this);
        this.renderModulLoadingIndicatior = this.renderModulLoadingIndicatior.bind(
            this,
        );
    }

    async componentDidMount(): void {
        await this.readUserLoginMoq();
        this.props.navigation.setParams({
            checkMoquitoCase: this.checkMoquitoCase.bind(this),
        });
        this.fetchGetTokenMoquito();
    }

    fetchGetTokenMoquito() {
        getAsyncStorage('accessToken').then(data => {
            this.setState({
                accessToken: data,
            });
        });
    }

    async readUserLoginMoq() {
        let userId = auth().currentUser.uid;
        const refDb = database().ref(`/users/profile/${userId}/account`);
        refDb
            .once('value')
            .then(snapshot => {
                this.setState({
                    reportedBy: snapshot.val().email,
                    isLoading: false,
                });
            })
            .catch(error => {
                Alert.alert(
                    'Pemberitahuan',
                    `${error}: Silahkan Koneksi Internet Anda`,
                );
                this.setState({
                    reportedBy: '',
                    isLoading: false,
                });
            });
    }

    toogleModalLoadingIndicator = state =>
        this.setState({modalSubmitMoquitoVisible: state});

    renderModulLoadingIndicatior() {
        return (
            <Modal
                transparent={true}
                animationType="fade"
                onRequestClose={() => this.toogleModalLoadingIndicator(false)}
                visible={this.state.modalSubmitMoquitoVisible}>
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

    async addInfoMoquitoFirebase(objectId, uniqueId, globalId, status, url) {
        let userId = auth().currentUser.uid;
        let addInfoPro = {};
        addInfoPro.object_id = objectId;
        addInfoPro.uniqueId = uniqueId;
        addInfoPro.globalId = globalId;
        addInfoPro.staResponse = status;
        addInfoPro.imageUrl = url;
        const refDb = database().ref(`/posts/${userId}/moquito_cases`);
        await refDb.push(addInfoPro).then(() => {
            this.props.navigation.goBack();
            ToastAndroid.show('Input Data Berhasil', ToastAndroid.SHORT);
            this.toogleModalLoadingIndicator(false);
        });
    }

    submitMoquitoCases = accessToken => {
        addSubMoquitoCases(accessToken, this.generateJsonMoquitoCases()).then(
            data => {
                let state;
                state = {
                    objectId: data.objectId,
                    uniqueId: data.uniqueId,
                    globalId: data.globalId,
                    statResponse: data.success,
                };
                this.setState(state);
                this.toogleModalLoadingIndicator(true);
                if (this.state.fileUri.length > 0) {
                    this.uploadImageMoquitoCases();
                } else {
                    this.addInfoMoquitoFirebase(
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
            },
        );
    };
    isUploadingLabel = () => {
        if (this.state.isUploading) {
            return <Text>{`${this.state.progress} %`}</Text>;
        }
    };

    uploadImageMoquitoCases = () => {
        const ext = this.state.fileUri.split('.').pop(); // Extract image extension
        const filename = `${uuid()}.${ext}`; // Generate unique name
        this.setState({
            isLoading: true,
            isUploading: true,
            loadingLabel: 'Mengunggah Foto',
        });
        console.log(`firebase Storage ${this.state.fileUri}`);
        storage()
            .ref(`moquito_cases/${filename}`)
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
                            `Success Upload Photo Moquito: ${
                                this.state.urlPhotoFirebase
                            }`,
                        );
                        this.setState(state);
                        snapshot.ref.getDownloadURL().then(url => {
                            this.setState({urlPhotoFirebase: url});
                            this.addInfoMoquitoFirebase(
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

    checkMoquitoCase() {
        let isErrorMoq = false;

        if (this.state.reportedBy.length === 0) {
            Alert.alert('Pemberitahuan', 'Silahkan Masukkan Email');
            isErrorMoq = true;
        }

        if (this.state.barangay.length === 0) {
            Alert.alert('Pemberitahuan', 'Silahkan Isi Kolom Kecamatan');
            isErrorMoq = true;
        }

        if (this.state.address.length === 0) {
            Alert.alert('Pemberitahuan', 'Silahkan Masukkan Alamat');
            isErrorMoq = true;
        }

        if (this.state.residence.length === 0) {
            Alert.alert('Pemberitahuan', 'Silahkan Masukkan Kabupaten / Kota');
            isErrorMoq = true;
        }

        if (!isErrorMoq) {
            this.submitMoquitoCases();
        }
    }

    generateJsonMoquitoCases() {
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
                },
            },
        ];
        return JSON.stringify(o1);
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

    renderAttachmentMoquit() {
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

    render():
        | React.ReactElement<any>
        | string
        | number
        | {}
        | React.ReactNodeArray
        | React.ReactPortal
        | boolean
        | null
        | undefined {
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
                        <Text style={styles.titleText}>Moquito Cases</Text>
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
                        <View>{this.renderAttachmentMoquit()}</View>
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
    tabBar: {
        flexDirection: 'row',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
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
    loadingBackground: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MoquitoCases;
