/*
 * Created on Thu Oct 03 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, {Component} from 'react';
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
    View,
} from 'react-native';
import colors from './../styles/colors';
import DrawerLayout from 'react-native-drawer-layout';
import ActionSheet from 'react-native-actionsheet';
import MapView, {MAP_TYPES, PROVIDER_GOOGLE} from 'react-native-maps';
import auth from '@react-native-firebase/auth';
import HeaderMap from './../components/headers/HeaderMap';

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

class MapContainer extends Component {
    _isMounted = false;
    _isPermission = true;

    static navigationOptions = ({navigation}) => {
        return {
            header: () => <HeaderMap navigation={navigation} />,
        };
    };

    renderGeoLocation() {
        if (this._isPermission) {
            Geolocation.getCurrentPosition(
                position => {
                    const region = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001,
                    };
                    this.setState({
                        region: region,
                        loading: false,
                        error: null,
                    });
                },
                error => alert(error.message),
                {
                    enableHighAccuracy: true,
                    distanceFilter: 0,
                    showLocationDialog: true,
                    forceRequestLocation: true,
                },
            ).then(r => console.log('Masuk'));
            this.watchID = Geolocation.watchPosition(
                position => {
                    const region = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001,
                    };
                    this.setState({
                        region: region,
                        loading: false,
                        error: null,
                    });
                },
                error => alert(error.message),
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

    constructor(props) {
        super(props);
        this.state = {
            drawerActive: false,
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
        };
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.onLogOutPress = this.onLogOutPress.bind(this);
        this.renderGeoLocation = this.renderGeoLocation.bind(this);
        this.onBtnShowUserLocationTapped = this.onBtnShowUserLocationTapped.bind(
            this,
        );
        this.showActionSheet = this.showActionSheet.bind(this);
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    }

    onClickLegend(index) {
        if (index === 1) {
            this.props.navigation.navigate('ProbableCases', {
                longtitude: this.state.region.latitude,
                latitude: this.state.region.longitude,
                extras: 'Probable Cases',
            });
        } else if (index === 2) {
            this.props.navigation.navigate('MoquitoCases', {
                longtitude: this.state.region.latitude,
                latitude: this.state.region.longitude,
                extras: 'Moquito Cases',
            });
        }
    }

    UNSAFE_componentWillMount() {
        this._isMounted = true;
        this._isMounted &&
            this.props.navigation.setParams({
                toggleDrawer: this.toggleDrawer,
                onLogOutPress: this.onLogOutPress,
                onBntShowUserLocation: this.onBtnShowUserLocationTapped,
                showActionSheet: this.showActionSheet,
            });
        this._isMounted && this.renderGeoLocation();
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    forceUpdateHandler() {
        this.forceUpdate();
    }

    componentWillUnmount() {
        this._isMounted = false;
        Geolocation.clearWatch(this.watchID);
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
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
        Alert.alert('Log out', 'Are you sure you want to log out?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: async () => {
                    this.props.navigation.reset('LoggedOut');
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
        this.forceUpdateHandler();
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
        ToastAndroid.show(`${this.state.isShowLocation}`, ToastAndroid.SHORT);
    }

    // Action to be taken after select location button click
    onLocationSelect = () => alert(this.state.userLocation);

    render() {
        const navigationView = (
            <View style={styles.wrapper}>
                <View style={styles.drawerTop}>
                    <Text style={styles.drawerTopText}>Log in</Text>
                </View>
                <View style={styles.drawerBottom}>
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
                                Work Online
                            </Text>
                        </View>
                    </View>
                    <View
                        style={[
                            styles.drawerBottomRow,
                            styles.drawerBottomYellow,
                        ]}>
                        <View style={styles.drawerBottomCol1}>
                            <Icon2
                                name="cloud-off"
                                color={colors.white}
                                size={25}
                            />
                        </View>
                        <View style={styles.drawerBottomCol2}>
                            <Text
                                style={[
                                    styles.drawerBottomText,
                                    {color: colors.white},
                                ]}>
                                Working Offline
                            </Text>
                        </View>
                    </View>
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
                                Synchronize Offline Map
                            </Text>
                            <Text
                                style={[
                                    styles.drawerBottomText,
                                    {fontSize: 10},
                                ]}>
                                last sync 2019/07/05 14:27
                            </Text>
                        </View>
                    </View>
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
                                Delete Offline Map
                            </Text>
                        </View>
                    </View>
                    <View style={styles.drawerFooter}>
                        <Text style={styles.drawerFooterText}>
                            Desumo 1.0 (8)
                        </Text>
                    </View>
                </View>
            </View>
        );

        const optionArray = [
            <Text style={{color: colors.red01}}>Cancel</Text>,
            'Probable Cases',
            'Moquito Cases',
        ];

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
                    onDrawerClose={() => this.setState({drawerActive: false})}
                />
                <MapView
                    ref={MapView => (this.MapView = MapView)}
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
                    mapType={MAP_TYPES.STANDARD}
                    showsScale={true}
                    followsUserLocation={true}
                    initialRegion={this.state.region}
                    onMapReady={this.onMapReady}
                    onRegionChangeComplete={this.onRegionChange}
                    onPress={e => this.onMapPress(e)}>
                    {this.state.markers.map(marker => (
                        <MapView.Marker
                            key={marker.id}
                            coordinate={{
                                latitude: this.state.region.latitude,
                                longitude: this.state.region.longitude,
                            }}
                            title={marker.title}
                            description={marker.description}
                            tracksViewChanges={true}
                            draggable
                        />
                    ))}
                </MapView>
                <View style={styles.mapMarkerContainer}>
                    <Text
                        style={{
                            fontSize: 42,
                            color: '#ad1f1f',
                        }}>
                        &#xf041;
                    </Text>
                </View>
                <ActionSheet
                    ref={o => (this.ActionSheet = o)}
                    title={
                        <Text style={{color: '#000', fontSize: 18}}>
                            Which one do you like?
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

const styles = StyleSheet.create({
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
        backgroundColor: colors.yellow01,
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
    deatilSection: {
        backgroundColor: '#fff',
        padding: 10,
        flex: 0.35,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
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
});

export default MapContainer;
