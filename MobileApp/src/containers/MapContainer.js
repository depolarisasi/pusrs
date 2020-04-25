/*
 * Created on Thu Oct 03 2019
 *
 * Copyright (c) 2019 Justin
 */

import React from 'react';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Feather';
import {
    Alert,
    BackHandler,
    Dimensions,
    StatusBar,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
    Platform,
    TouchableHighlight,
    PermissionsAndroid,
    ActivityIndicator,
    Button,
} from 'react-native';
import colors from './../styles/colors';
import DrawerLayout from 'react-native-drawer-layout';
import ActionSheet from 'react-native-actionsheet';
import MapView, {
    AnimatedRegion,
    Callout,
    MAP_TYPES,
    PROVIDER_GOOGLE,
    InfoWindow,
} from 'react-native-maps';
import auth from '@react-native-firebase/auth';
import HeaderMap from './../components/headers/HeaderMap';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-community/async-storage';
import {getDataMoquitoCases} from './../screens/MoquitoCases/GetDataMoquitoCases';
import {getDataProbableCases} from './../screens/ProbableCases/GetDataProbableCases';
import stylesPin from './../screens/styles/Legend';
import DetailMoquitoCases from '../screens/MoquitoCases/DetailMoquitoCases';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -6.2103603;
const LONGITUDE = 106.7978743;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;
console.disableYellowBox = false;

function randomColor() {
    return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, 0)}`;
}

const PinMaps = ({color}) => (
    <View style={[stylesPin.pin, {backgroundColor: color}]} />
);

class MapContainer extends React.PureComponent {
    _isMounted = false;

    static navigationOptions = ({navigation}) => {
        return {
            header: () => <HeaderMap navigation={navigation} />,
        };
    };

    renderGeoLocation() {
        if (this.state._isPermission) {
            Geolocation.getCurrentPosition(
                position => {
                    const coordinate = new AnimatedRegion({
                        latitude: parseFloat(position.coords.latitude),
                        longitude: Number(position.coords.longitude),
                        accuracy: position.coords.accuracy,
                        latitudeDelta: 0.0462,
                        longitudeDelta: 0.0261,
                    });
                    const region = {
                        latitude: parseFloat(position.coords.latitude),
                        longitude: Number(position.coords.longitude),
                        accuracy: position.coords.accuracy,
                        latitudeDelta: 0.0462,
                        longitudeDelta: 0.0261,
                    };
                    this.setState({
                        region: region,
                        coordinate: coordinate,
                        loading: false,
                        error: null,
                    });
                },
                error => alert(error.message),
                {
                    enableHighAccuracy: false,
                    distanceFilter: 0,
                    showLocationDialog: true,
                    useSignificantChanges: true,
                    forceRequestLocation: false,
                },
            ).then(r => console.log('Masuk'));
            this.watchID = Geolocation.watchPosition(
                position => {
                    const coordinate = {
                        latitude: parseFloat(position.coords.latitude),
                        longitude: Number(position.coords.longitude),
                        accuracy: position.coords.accuracy,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001,
                    };
                    this.setState({
                        coordinate: coordinate,
                        loading: false,
                        error: null,
                    });
                },
                error => Alert.alert('Error', `${error.message}`),
                {
                    enableHighAccuracy: true,
                    distanceFilter: 1,
                    interval: 10000,
                    maximumAge: 0,
                    fastestInterval: 5000,
                    showLocationDialog: true,
                    forceRequestLocation: true,
                },
            );
        }
    }

    async readMaps() {
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

    fetchGetToken = () => {
        AsyncStorage.getItem('accessToken', (error, result) => {
            if (result) {
                console.log(`accessToken: ${result}`);
            }
        }).then(r => {
            console.log('execute');
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            _isPermission: false,
            drawerActive: false,
            coordinate: new AnimatedRegion({
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }),
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            markers: [],
            isMapReady: false,
            marginTop: 1,
            userLocation: '',
            regionChangeProgress: false,
            isShowLocation: false,
            pressStatus: false,
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
            dataMoCases: [],
            dataProbable: [],
            isLoading: true,
            loadingLabel: 'Sedang Memuat (1/2)',
        };
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.onLogOutPress = this.onLogOutPress.bind(this);
        this.renderGeoLocation = this.renderGeoLocation.bind(this);
        this.onBtnShowUserLocationTapped = this.onBtnShowUserLocationTapped.bind(
            this,
        );
        this.showActionSheet = this.showActionSheet.bind(this);
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
        this.readMaps = this.readMaps.bind(this);
        this.requestGPSPermission = this.requestGPSPermission.bind(this);
        this.fetchGetMoquitoCases = this.fetchGetMoquitoCases.bind(this);
        this.fetchGetProbableCases = this.fetchGetProbableCases.bind(this);
    }

    fetchGetMoquitoCases = () => {
        getDataMoquitoCases()
            .then(dataMoCases => {
                if (this._isMounted) {
                    this.setState({
                        dataMoCases,
                        loadingLabel: 'Sedang Memuat (2/2)',
                    });
                }
                this.fetchGetProbableCases();
            })
            .catch(() =>
                this.setState({
                    isLoading: false,
                    loadingLabel: 'Error Moquito Cases',
                }),
            );
    };

    fetchGetProbableCases = () => {
        getDataProbableCases()
            .then(dataProbable => {
                if (this._isMounted) {
                    this.setState({
                        dataProbable,
                        loadingLabel: 'Sedang Memuat (Selesai)',
                    });
                }
                this.setState({isLoading: false});
            })
            .catch(() => this.setState({isLoading: false}));
    };

    onClickLegend(index) {
        if (index === 1) {
            this.props.navigation.navigate('ProbableCases', {
                longitude: this.state.region.longitude,
                latitude: this.state.region.latitude,
            });
        } else if (index === 2) {
            this.props.navigation.navigate('MoquitoCases', {
                longitude: this.state.region.longitude,
                latitude: this.state.region.latitude,
            });
        }
    }

    async componentDidUpdate() {
        await this.requestGPSPermission;
    }

    async requestGPSPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Example App',
                    message: 'Example App access to your location ',
                },
            );
            if (granted) {
                this.setState({_isPermission: true});
                console.log('You can use the location');
                await this.renderGeoLocation();
            } else {
                console.log('location permission denied');
                this.setState({_isPermission: false});
                alert('Location permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        this._isMounted &&
            this.props.navigation.setParams({
                toggleDrawer: this.toggleDrawer,
                onLogOutPress: this.onLogOutPress,
                onBntShowUserLocation: this.onBtnShowUserLocationTapped,
                showActionSheet: this.showActionSheet,
            });
        this._isMounted && this.renderGeoLocation();
        this._isMounted && this.readMaps();
        // BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        // BackHandler.addEventListener(
        //     'requestGPSPermission',
        //     this.requestGPSPermission,
        // );
        // BackHandler.addEventListener(
        //     'onBtnShowUserLocation',
        //     this.onBtnShowUserLocationTapped,
        // );
        // BackHandler.addEventListener('fetchGetToken', this.fetchGetToken);
        // BackHandler.addEventListener(
        //     'fetchGetMoquitoCases',
        //     this.fetchGetMoquitoCases,
        // );
        // BackHandler.addEventListener(
        //     'fetchGetProbableCases',
        //     this.fetchGetProbableCases,
        // );
        // BackHandler.addEventListener(
        //     'fetchGetMoquitoCases',
        //     this.fetchGetMoquitoCases,
        // );
        await this.requestGPSPermission();
        if (this.state._isPermission) {
            this.onBtnShowUserLocationTapped();
        }
        this.fetchGetToken();
        // this.fetchGetMoquitoCases();
        // this._isMounted && this.fetchGetMoquitoCases();
    }

    UNSAFE_componentWillReceiveProps(
        nextProps: Readonly<P>,
        nextContext: any,
    ): void {}

    forceUpdateHandler() {
        this.forceUpdate();
    }

    componentWillUnmount() {
        this._isMounted = false;
        Geolocation.clearWatch(this.watchID);
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
        BackHandler.removeEventListener(
            'requestGPSPermission',
            this.requestGPSPermission,
        );
        BackHandler.removeEventListener(
            'onBtnShowUserLocation',
            this.onBtnShowUserLocationTapped,
        );
        // BackHandler.removeEventListener('fetchGetToken', this.fetchGetToken);
        // BackHandler.removeEventListener(
        //     'fetchGetMoquitoCases',
        //     this.fetchGetMoquitoCases,
        // );
        // BackHandler.removeEventListener(
        //     'fetchGetProbableCases',
        //     this.fetchGetProbableCases,
        // );
        // BackHandler.removeEventListener(
        //     'fetchGetMoquitoCases',
        //     this.fetchGetMoquitoCases,
        // );
    }

    onBackPress = () => {
        if (this.state.drawerActive) {
            this.drawer.closeDrawer();
            return true;
        }
        return false;
    };

    showActionSheet = () => {
        this.ActionSheet.show();
    };

    onMapPress(e) {
        this.setState({
            markers: [
                ...this.state.markers,
                {
                    coordinate: e.nativeEvent.coordinate,
                    key: id++,
                    color: randomColor(),
                },
            ],
        });
    }

    onLogOutPress() {
        Alert.alert('Pemberitahuan', 'Anda yakin ingin Log-out?', [
            {
                text: 'Batal',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: async () => {
                    this.props.navigation.navigate('LoggedOut');
                    await auth().signOut();
                },
            },
        ]);
    }

    toggleDrawer() {
        const {drawerActive} = this.state;

        if (drawerActive) {
            this.drawer.closeDrawer();
        } else {
            this.drawer.openDrawer();
        }
    }

    onMapReady = () => {
        this.setState({isMapReady: true, marginTop: 0});
    };

    // Update state on region change
    onRegionChange = region => {
        this.setState({
            region,
            regionChangeProgress: true,
        });
    };

    onBtnShowUserLocationTapped() {
        const newCoordinate = {
            latitude:
                this.state.region.latitude +
                (Math.random() - 0.5) * (LATITUDE_DELTA / 2),
            longitude:
                this.state.region.longitude +
                (Math.random() - 0.5) * (LONGITUDE_DELTA / 2),
        };
        this.forceUpdateHandler();
        this.renderGeoLocation();
        this.fetchGetMoquitoCases();
        this.props.navigation.getParam('MapContainer');
        if (this.state.isShowLocation === true) {
            this.setState({
                isShowLocation: true,
                forceRefresh: Math.floor(Math.random() * 100),
            });
        } else {
            this.setState({
                isShowLocation: true,
                forceRefresh: Math.floor(Math.random() * 100),
            });
        }

        if (Platform.OS === 'android') {
            if (this.marker) {
                this.MapView._component.animateMarkerToCoordinate(
                    newCoordinate,
                    500,
                );
            }
        }
    }

    // TODO Action to be taken after select location button click
    onLocationSelect = () => alert(this.state.userLocation);

    render() {
        const navigationView = (
            <View style={styles.wrapper}>
                <View style={styles.drawerTop}>
                    <Text style={styles.drawerTopText}>
                        {this.state.fullName}
                    </Text>
                </View>
                <View style={styles.drawerBottom}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => [
                            ToastAndroid.show(
                                'Maaf, itu akan muncul di versi berikutnya',
                                ToastAndroid.SHORT,
                            ),
                            this.onBackPress(),
                        ]}>
                        <View
                            style={[
                                styles.drawerBottomRow,
                                styles.drawerBottomFirstRow,
                            ]}>
                            <View style={styles.drawerBottomCol1}>
                                <Icon2
                                    name="cloud"
                                    color={colors.gray01}
                                    size={25}
                                />
                            </View>
                            <View style={styles.drawerBottomCol2}>
                                <Text style={styles.drawerBottomText}>
                                    Peta Online
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => [
                            ToastAndroid.show(
                                'Maaf, akan muncul di versi berikutnya',
                                ToastAndroid.SHORT,
                            ),
                            this.onBackPress(),
                        ]}>
                        <View
                            style={[
                                styles.drawerBottomRow,
                                styles.drawerBottomYellow,
                            ]}>
                            <View style={styles.drawerBottomCol1}>
                                <Icon2
                                    name="cloud-off"
                                    color={colors.gray01}
                                    size={25}
                                />
                            </View>
                            <View style={styles.drawerBottomCol2}>
                                <Text
                                    style={[
                                        styles.drawerBottomText,
                                        {color: colors.gray01},
                                    ]}>
                                    Peta Offline
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => [
                            ToastAndroid.show(
                                'Maaf, akan muncul di versi berikutnya',
                                ToastAndroid.SHORT,
                            ),
                            this.onBackPress(),
                        ]}>
                        <View style={styles.drawerBottomRow}>
                            <View style={styles.drawerBottomCol1}>
                                <Icon
                                    name="ios-sync"
                                    color={colors.gray01}
                                    size={25}
                                />
                            </View>
                            <View style={styles.drawerBottomCol2}>
                                <Text style={styles.drawerBottomText}>
                                    Sinkronkan Peta Offline
                                </Text>
                                {/*<Text*/}
                                {/*    style={[*/}
                                {/*        styles.drawerBottomText,*/}
                                {/*        {fontSize: 10},*/}
                                {/*    ]}>*/}
                                {/*    /!*last sync --/--/-- --:--*!/*/}
                                {/*</Text>*/}
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => [
                            ToastAndroid.show(
                                'Maaf, akan muncul di versi berikutnya',
                                ToastAndroid.SHORT,
                            ),
                            this.onBackPress(),
                        ]}>
                        <View style={styles.drawerBottomRow}>
                            <View style={styles.drawerBottomCol1}>
                                <Icon
                                    name="ios-trash"
                                    color={colors.gray01}
                                    size={25}
                                />
                            </View>
                            <View style={styles.drawerBottomCol2}>
                                <Text style={styles.drawerBottomText}>
                                    Hapus Peta Offline
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.drawerFooter}>
                        <Text style={styles.drawerFooterText}>
                            Desumo 1.0 (8)
                        </Text>
                    </View>
                </View>
            </View>
        );

        const optionArray = [
            <Text style={{color: colors.red01}}>Batal</Text>,
            'Probable Cases',
            'Moquito Cases',
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
                    <DrawerLayout
                        drawerBackgroundColor={colors.white}
                        drawerWidth={300}
                        ref={drawer => {
                            return (this.drawer = drawer);
                        }}
                        renderNavigationView={() => navigationView}
                        onDrawerOpen={() => this.setState({drawerActive: true})}
                        onDrawerClose={() =>
                            this.setState({drawerActive: false})
                        }>
                        <MapView
                            ref={mapView => (this.MapView = mapView)}
                            key={this.state.forceRefresh}
                            provider={PROVIDER_GOOGLE}
                            style={styles.map}
                            loadingEnabled={true}
                            loadingIndicatorColor="#666666"
                            moveOnMarkerPress={false}
                            showsUserLocation={this.state.isShowLocation}
                            showsMyLocationButton={true}
                            showsPointsOfInterest={false}
                            showsCompass={true}
                            userLocationPriority="high"
                            mapType={MAP_TYPES.STANDARD}
                            showsScale={true}
                            followsUserLocation={true}
                            initialRegion={this.state.region}
                            onMapReady={this.onMapReady}
                            onRegionChange={this.onRegionChange}>
                            {this.state.dataMoCases.map((item, i) => {
                                if (
                                    item.attributes.long &&
                                    item.attributes.lat
                                ) {
                                    return (
                                        <MapView.Marker
                                            onPress={() => {
                                                this.props.navigation.navigate(
                                                    'DetailMoquitoCases',
                                                    {
                                                        data: item,
                                                    },
                                                );
                                            }}
                                            ref={ref => {
                                                // this.marker = ref;
                                            }}
                                            key={i}
                                            coordinate={{
                                                latitude: item.attributes.lat,
                                                longitude: item.attributes.long,
                                            }}
                                            title={item.attributes.Creator}
                                            tracksViewChanges={true}
                                            identifier="DestMarker">
                                            <PinMaps color={colors.yellow01} />
                                        </MapView.Marker>
                                    );
                                }
                            })}
                            {this.state.dataProbable.map((item, i) => {
                                if (
                                    item.attributes.long &&
                                    item.attributes.lat
                                ) {
                                    return (
                                        <MapView.Marker
                                            onPress={() => {
                                                this.props.navigation.navigate(
                                                    'DetailProbableCases',
                                                    {
                                                        data: item,
                                                    },
                                                );
                                            }}
                                            ref={ref => {
                                                // this.marker = ref;
                                            }}
                                            key={i}
                                            coordinate={{
                                                latitude: item.attributes.lat,
                                                longitude: item.attributes.long,
                                            }}
                                            title={item.attributes.Creator}
                                            tracksViewChanges={true}
                                            identifier="DestMarker">
                                            <PinMaps color={colors.blue01} />
                                            {
                                                // <Callout
                                                //     tooltip
                                                //     style={styles.customView}>
                                                //     <TouchableHighlight
                                                //         onPress={() =>
                                                //             console.log('Click')
                                                //         }
                                                //         underlayColor="#dddddd">
                                                //         <View
                                                //             style={
                                                //                 styles.calloutText
                                                //             }>
                                                //             <Text>
                                                //                 {
                                                //                     item.attributes
                                                //                         .notes
                                                //                 }
                                                //             </Text>
                                                //         </View>
                                                //     </TouchableHighlight>
                                                // </Callout>
                                            }
                                        </MapView.Marker>
                                    );
                                }
                            })}
                            {!!this.state.region.latitude &&
                                !!this.state.region.longitude && (
                                    <MapView.Marker
                                        coordinate={{
                                            latitude: this.state.region
                                                .latitude,
                                            longitude: this.state.region
                                                .longitude,
                                        }}
                                        title={'Lokasi Saya'}
                                    />
                                )}
                        </MapView>
                    </DrawerLayout>
                    <ActionSheet
                        ref={o => (this.ActionSheet = o)}
                        title={
                            <Text style={{color: '#000', fontSize: 18}}>
                                Yang mana yang kamu suka?
                            </Text>
                        }
                        style={styles.actionBar}
                        options={optionArray}
                        cancelButtonIndex={0}
                        onPress={index => {
                            this.onClickLegend(index);
                        }}
                    />
                </View>
            );
        }
    }
}

const mapStyle = StyleSheet.create({
    container: {
        display: 'flex',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
    map: {
        flex: 1,
    },
    mapMarkerContainer: {
        left: '47%',
        position: 'absolute',
        top: '42%',
    },
    mapMarker: {
        fontSize: 40,
        color: 'red',
    },
    deatilSection: {
        flex: 0.55,
        backgroundColor: '#fff',
        padding: 10,
        display: 'flex',
        justifyContent: 'flex-start',
    },
    spinnerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnContainer: {
        width: Dimensions.get('window').width - 20,
        position: 'absolute',
        bottom: 100,
        left: 10,
    },
});

const styles = StyleSheet.create({
    customView: {
        height: 50,
        borderRadius: 50 / 2,
    },
    wrapper: {
        flex: 1,
        backgroundColor: colors.white,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    drawerTop: {
        height: 80,
        padding: 20,
        backgroundColor: colors.gray01,
        justifyContent: 'center',
    },
    mapMarkerContainer: {
        left: '47%',
        position: 'absolute',
        top: '42%',
    },
    drawerTopText: {
        color: colors.white,
        fontSize: 14,
    },
    drawerBottom: {
        padding: 10,
        display: 'flex',
        flex: 1,
    },
    drawerBottomRow: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    drawerBottomFirstRow: {
        borderBottomWidth: 2,
        borderBottomColor: colors.gray02,
    },
    drawerBottomCol1: {
        alignItems: 'center',
        width: 40,
        marginRight: 10,
    },
    drawerBottomCol2: {
        width: '100%',
    },
    drawerBottomText: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.gray01,
    },
    drawerBottomYellow: {
        marginTop: 15,
        marginBottom: 10,
        height: 40,
        borderRadius: 3,
    },
    drawerFooter: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        padding: 10,
    },
    drawerFooterText: {
        color: colors.gray02,
        fontSize: 11,
        fontWeight: 'bold',
    },
    btnContainer: {
        width: Dimensions.get('window').width - 20,
        position: 'relative',
        alignSelf: 'stretch',
        bottom: 100,
        left: 10,
    },
    actionBar: {
        fontSize: 16,
        color: '#000',
    },
    button: {
        borderRadius: 10,
    },
    buttonPress: {
        borderColor: '#000066',
        backgroundColor: '#000066',
        borderWidth: 1,
        borderRadius: 10,
    },
    calloutText: {
        backgroundColor: colors.white,
    },
    loadingBackground: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pinBackground: {
        flex: 1,
        width: 45,
        height: 45,
        resizeMode: 'contain',
    },
    pinMaps: {
        width: 12,
        height: 12,
        borderRadius: 12 / 2,
        marginTop: 30,
        marginLeft: 20,
        elevation: 4,
    },
});

export default MapContainer;
