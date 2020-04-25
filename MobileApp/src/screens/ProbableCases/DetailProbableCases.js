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

class DetailProbableCases extends React.Component {
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
        this.currentUser = auth().currentUser;
        // this.readLoginDetailProbable = this.readLoginDetailProbable.bind(this);
        this.readFirebaseProbableCases = this.readFirebaseProbableCases.bind(
            this,
        );
        // this.fetchGetTokenDetail = this.fetchGetTokenDetail.bind(this);
        this.onDeleteProbableCases = this.onDeleteProbableCases.bind(this);
        // this.readLoginDetailProbable = this.readLoginDetailProbable.bind(this);
        this.renderAttachmentProb = this.renderAttachmentProb.bind(this);
    }

    async componentDidMount(): * {
        try {
            this.setState({isLoading: true});
            const data = this.props.navigation.getParam('data', {});
            const {ID, FID} = data.attributes;
            console.log('DetailProbableCases.didmount ', data);

            const accessToken = await getAsyncStorage('accessToken');
            const detail = await this.getDetail(FID);
            const resFirebase = await this.readFirebaseProbableCases(FID);

            // this.getReportSpesificAsyncTask(FID);
            // await this.readFirebaseProbableCases();
            // await this.fetchGetTokenDetail();

            this.setState({
                isLoading: false,
                accessToken: accessToken ? accessToken : '',
                ...detail,
                ...resFirebase,
            });
        } catch (err) {
            console.log('error ', err.message);
            this.setState({isLoading: false});
        }
    }

    async readFirebaseProbableCases(FID) {
        try {
            let response = {};
            let userId = auth().currentUser.uid;
            // const refDb = database().ref(`/posts/${userId}/Probable_cases`);
            const refDb = database().ref('/probable_cases');
            const res = await refDb
                .orderByChild('object_id')
                .equalTo('' + FID)
                .once('value')
                .then(snapshot => snapshot);
            const val = res.val();
            console.log('value ', res, val);
            if (val) {
                const value = Object.values(val)[0];
                response = value;
                if (value.imageUrl) {
                    response.isPhotoFirebase = true;
                    response.urlPhotoFirebase = value.imageUrl;
                }
                if (value.user && value.user.email) {
                    response.reportedBy = value.user.email;
                }
            }
            return response;
        } catch (err) {
            console.log('ERROR readFirebaseProbableCases ', err.message);
            this.setStat;
            return null;
        }
    }

    async getDetail(FID) {
        const detail = await getSpecificReportProbable(FID);
        console.log('detail ', detail);
        if (detail && detail.attributes) {
            return {
                address: detail.attributes.Address,
                barangay: detail.attributes.Barangay,
                residence: detail.attributes.Residence,
                lat: detail.attributes.lat,
                long: detail.attributes.long,
                notes: detail.attributes.notes,
            };
        }
        return {};
    }

    async onDeleteProbableCases(FID) {
        const refDb = database().ref('/probable_cases');
        await refDb
            .orderByChild('object_id')
            .equalTo('' + FID)
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

    deleteReportAsyncTask = async () => {
        let message = 'Hapus Gagal, Silahkan coba lagi';
        let success = false;
        const {uniqueId, accessToken} = this.state;
        console.log('deleteReportAsyncTask ', uniqueId, accessToken);
        if (uniqueId && accessToken) {
            this.setState({isLoading: true});
            const resDelete = await DeleteProbableCases(accessToken, uniqueId);
            console.log('res delete ', resDelete);
            const deleteFirebase = await this.onDeleteProbableCases(uniqueId);
            console.log('res delete firebase ', deleteFirebase);
            if (resDelete) {
                success = true;
                message = 'Berhasil di hapus';
            }
            this.setState({isLoading: false});
        }
        NativeToastAndroid.show(message, NativeToastAndroid.SHORT);
        if (success) {
            this.props.navigation.goBack();
        }
    };

    toogleModalDetailLoadingIndicator = state =>
        this.setState({modalSubmitDetailProbableVisible: state});

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
                    this.deleteReportAsyncTask();
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

    renderDelete = () => {
        try {
            const {email, uid} = this.currentUser;
            const {reportedBy} = this.state;
            if (reportedBy == email) {
                return (
                    <TouchableOpacity
                        onPress={() => {
                            this.onDialogDelete();
                        }}
                        style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Hapus</Text>
                    </TouchableOpacity>
                );
            }
            return null;
        } catch (err) {
            console.log('ERROR renderDelete ', err.message);
            return null;
        }
    };

    render(): React.ReactNode {
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
                        {this.renderDelete()}
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
