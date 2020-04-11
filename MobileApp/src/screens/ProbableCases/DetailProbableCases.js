/**
 * Created by Handy on 07/04/20.
 * Macbook Pro 2015
 * akang.handy95@gmail.com
 */

import React, {Component} from 'react';
import {getAsyncStorage} from '../UtilsHelper';
import HeaderDetailForm from '../../components/headers/HeaderDetailForm';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
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
    TouchableOpacity,
    View,
} from 'react-native';
import {getSpecificReportProbable} from './GetSpecificReportProbable';
import {DeleteProbableCases} from './DeleteProbableCases';
import {getSpecificReportMoquito} from '../MoquitoCases/GetSpecificReportMoquito';
import {DeleteMoquitoCases} from '../MoquitoCases/DeleteMoquitoCases';
import NativeToastAndroid from 'react-native/Libraries/Components/ToastAndroid/NativeToastAndroid';
import colors from '../../styles/colors';
import ActionSheet from 'react-native-actionsheet';
import HeaderDetailProbable from '../../components/headers/HeaderDetailProbable';

class DetailProbableCases extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: () => (
                <HeaderDetailProbable
                    navigation={navigation}
                    title="Rincian Probable Cases"
                />
            ),
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            reportedBy: '-',
            address: '-',
            barangay: '-',
            residence: '-',
            lat: '0',
            long: '0',
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
            modalSubmitDetailProbableVisible: false,
            objectId: '',
            uniqueId: '',
            globalId: '',
            accessToken: '',
            isPhotoFirebase: false,
            dataProb: [],
            condition: 'Rincian Probable Cases',
        };
        // this.readLoginDetailProbable = this.readLoginDetailProbable.bind(this);
        this.readFirebaseProbableCases = this.readFirebaseProbableCases.bind(
            this,
        );
        this.fetchGetTokenDetail = this.fetchGetTokenDetail.bind(this);
        this.onDeleteProbableCases = this.onDeleteProbableCases.bind(this);
        this.readLoginDetailProbable = this.readLoginDetailProbable.bind(this);
        this.renderAttachmentProb = this.renderAttachmentProb.bind(this);
    }

    async componentDidMount(): * {
        await this.getReportSpesificAsyncTask('100');
        // await this.readLoginDetailProbable();
        await this.readFirebaseProbableCases();
        await this.fetchGetTokenDetail();
    }

    async readLoginDetailProbable() {
        let userId = auth().currentUser.uid;
        const refDb = database().ref(`/users/profile/${userId}/account`);
        refDb
            .once('value')
            .then(snapshot => {
                this.setState({
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

    async readFirebaseProbableCases() {
        let userId = auth().currentUser.uid;
        const refDb = database()
            .ref(`/posts/${userId}/probable_cases`)
            .equalTo('100')
            .orderByChild('object_id');
        await refDb.once('value', data => {
            console.log(`responseDetail: ${JSON.stringify(data)}`);
            const items = [];
            data.forEach(function(childSnapshot) {
                try {
                    items.push({
                        imageUrl: childSnapshot.val().imageUrl,
                    });
                } catch (e) {
                    console.error(`error read probable cases: ${e.message()}`);
                    items.push({
                        imageUrl: '',
                    });
                }
            });
            this.setState({dataProb: items});
            if (typeof null === data) {
                this.setState({isPhotoFirebase: false});
                this.setState({isLoading: false});
            } else {
                if (typeof this.state.dataProb[0].imageUrl !== 'undefined') {
                    if (this.state.dataProb[0].imageUrl === '') {
                        this.setState({isPhotoFirebase: false});
                    } else {
                        this.setState({
                            urlPhotoFirebase: this.state.dataProb[0].imageUrl,
                        });
                        this.setState({isPhotoFirebase: true});
                    }
                    this.setState({isLoading: false});
                } else {
                    this.setState({isPhotoFirebase: false});
                    this.setState({isLoading: false});
                }
            }
        });
    }

    async fetchGetTokenDetail() {
        getAsyncStorage('accessToken').then(data => {
            this.setState({accessToken: data});
        });
    }

    async onDeleteProbableCases() {
        let userId = auth().currentUser.uid;
        const refDb = database().ref(`/posts/${userId}/probable_cases`);
        await refDb
            .orderByChild('object_id')
            .equalTo('100')
            .once('value')
            .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    refDb.child(childSnapshot.key).remove();
                });
            });
        this.toogleModalDetailLoadingIndicator(false);
        if (this.state.statResponse) {
            this.props.navigation.goBack();
        }
    }

    deleteReportAsyncTask = FIDReport => {
        DeleteProbableCases(this.state.accessToken, [FIDReport]).then(data => {
            let state;
            state = {
                objectId: data.objectId,
                uniqueId: data.uniqueId,
                statResponse: data.success,
                isLoading: true,
            };
            this.setState(state);
            if (this.state.statResponse) {
                this.onDeleteProbableCases().then(r => {});
                NativeToastAndroid.show(
                    'Berhasil di Hapus',
                    NativeToastAndroid.SHORT,
                );
            } else {
                this.setState({isLoading: false});
                NativeToastAndroid.show(
                    'Silahkan Coba lagi',
                    NativeToastAndroid.SHORT,
                );
            }
        });
    };

    toogleModalDetailLoadingIndicator = state =>
        this.setState({modalSubmitDetailProbableVisible: state});

    getReportSpesificAsyncTask = objectId => {
        getSpecificReportProbable(objectId).then(data => {
            let state;
            if (data.attributes.Reported_b) {
                let reportSetState = data.attributes.Reported_b;
                this.setState({reportedBy: reportSetState});
            }
            if (data.attributes.Address) {
                let addressState = data.attributes.Address;
                this.setState({address: addressState});
            }
            if (data.attributes.Barangay) {
                let barangayState = data.attributes.Barangay;
                this.setState({barangay: barangayState});
            }
            if (data.attributes.Residence) {
                let residenceState = data.attributes.Residence;
                this.setState({residence: residenceState});
            }
            if (data.attributes.lat) {
                let latitudeState = `${data.attributes.lat}`;
                this.setState({lat: latitudeState});
            }
            if (data.attributes.long) {
                let longitudeState = `${data.attributes.long}`;
                this.setState({long: longitudeState});
            }
            if (data.attributes.Notes) {
                let notesState = `${data.attributes.Notes}`;
                this.setState({notes: notesState});
            } else {
                this.setState({notes: '-'});
            }
            state = {
                objectId: data.objectId,
                uniqueId: data.uniqueId,
            };
            this.setState(state);
            console.log(`responseBody Report: ${JSON.stringify(data)}`);
        });
    };

    renderLoadingIndicatorProb() {
        return (
            <Modal
                transparent={true}
                animationType="fade"
                onRequestClose={() => this.toogleModalLoadingIndicator(false)}
                visible={this.state.modalSubmitDetailProbableVisible}>
                <View style={styles.wrapper}>
                    <StatusBar
                        backgroundColor={colors.green01}
                        barStyle="dark-content"
                    />
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>
                            Rincian Probable Cases
                        </Text>
                    </View>
                    <View style={styles.loadingBackground}>
                        <Text>Harap Tunggu</Text>
                        <ActivityIndicator size="large" />
                    </View>
                </View>
            </Modal>
        );
    }

    onDialogDelete() {
        Alert.alert('Pemberitahuan', 'Anda yakin ingin Menghapus?', [
            {
                text: 'Tidak',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Ya',
                onPress: async () => {
                    this.toogleModalDetailLoadingIndicator(true);
                    this.deleteReportAsyncTask('100');
                },
            },
        ]);
    }

    renderAttachmentProb() {
        if (this.state.isPhotoFirebase) {
            return (
                <View style={styles.ImageSections}>
                    <Image
                        source={{uri: this.state.urlPhotoFirebase}}
                        style={styles.imagesFirebase}
                    />
                </View>
            );
        } else {
            if (this.state.fileData.length > 0) {
                return (
                    <View style={styles.ImageSections}>
                        <Image
                            source={{
                                uri:
                                    'data:image/jpeg;base64,' +
                                    this.state.fileData,
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
    }

    render(): React.DetailedReactHTMLElement<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement,
    > {
        const optionArray = [
            <Text style={{color: colors.red01}}>Batal</Text>,
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
                                editable={false}
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
                                editable={false}
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
                                editable={false}
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
                                editable={false}
                                placeholderTextColor={colors.gray04}
                                underlineColorAndroid="transparent"
                                onChangeText={notes => this.setState({notes})}
                            />
                        </View>
                        <View>{this.renderAttachmentProb()}</View>
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
                        <TouchableOpacity
                            onPress={() => {
                                this.onDialogDelete();
                            }}
                            style={styles.saveButton}>
                            <Text style={styles.saveButtonText}>Hapus</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    {this.renderLoadingIndicatorProb()}
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
    imagesFirebase: {
        width: Dimensions.get('window').width - 20,
        height: Dimensions.get('window').height - 50,
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
export default DetailProbableCases;
