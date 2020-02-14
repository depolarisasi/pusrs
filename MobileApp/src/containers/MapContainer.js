/*
 * Created on Thu Oct 03 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, {Component} from 'react';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Feather';
import {
    StatusBar,
    BackHandler,
    View,
    Text,
    Alert,
    Dimensions,
    StyleSheet,
    Platform,
    PermissionsAndroid,
} from 'react-native';
import colors from './../styles/colors';
import DrawerLayout from 'react-native-drawer-layout';
import ActionSheet from 'react-native-actionsheet';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
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
    _isPermission = false;

    showActionSheet = () => {
        this.ActionSheet.show();
    };
    static navigationOptions = ({navigation}) => {
        return {
            header: () => <HeaderMap navigation={navigation} />,
        };
    };

    async requestGPSPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Permission Maps',
                    message: 'Do you want to allow Google Maps?',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this._isPermission = true;
            } else {
                this._isPermission = false;
                console.log('Maps permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }

    renderGeoLocation() {
        if (this._isPermission) {
            Geolocation.getCurrentPosition(
                position => {
                    const region = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001,
                    };
                    this.setState({
                        region: region,
                        loading: false,
                        error: null,
                    });
                },
                error => {
                    alert(error.message);
                    this.setState({
                        error: error.message,
                        loading: false,
                    });
                },
                {
                    enableHighAccuracy: true,
                    timeout: 20000,
                    maximumAge: 1000,
                    distanceFilter: 10,
                },
            );
        }
    }

    watchLocation = () => {
        const {coordinate} = this.state;

        this.watchID = Geolocation.watchPosition(
            position => {
                const {latitude, longitude} = position.coords;

                const newCoordinate = {
                    latitude,
                    longitude,
                };

                if (Platform.OS === 'android') {
                    if (this.marker) {
                        this.marker._component.animateMarkerToCoordinate(
                            newCoordinate,
                            500, // 500 is the duration to animate the marker
                        );
                    }
                } else {
                    coordinate.timing(newCoordinate).start();
                }

                this.setState({
                    latitude,
                    longitude,
                });
            },
            error => console.log(error),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000,
                distanceFilter: 10,
            },
        );
    };

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
        };
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.onLogOutPress = this.onLogOutPress.bind(this);
        this.requestGPSPermission = this.requestGPSPermission.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this._isMounted &&
            this.props.navigation.setParams({
                toggleDrawer: this.toggleDrawer,
                onLogOutPress: this.onLogOutPress,
            });
        this._isMounted && this.requestGPSPermission();
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    componentWillUnmount() {
        this._isMounted = false;
        Geolocation.clearWatch(this.watchID);
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.region === null) {
            this.requestGPSPermission().then(
                console.log('GPS component will update'),
            );
        }
    }

    UNSAFE_componentWillReceiveProps(
        nextProps: Readonly<P>,
        nextContext: any,
    ): void {}

    onBackPress = () => {
        if (this.state.drawerActive) {
            this.drawer.closeDrawer();
            return true;
        }
        return false;
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
        console.log(`region: ${region.latitude}`);
        this.setState({
            region,
            regionChangeProgress: true,
        });
    };

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
            'Option 1',
            'Option 2',
            'Option 3',
            'Option 4',
            'Cancel',
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
                    onDrawerClose={() => this.setState({drawerActive: false})}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        showsUserLocation={true}
                        showsCompass={true}
                        showsMyLocationButton={true}
                        initialRegion={this.state.region}
                        onMapReady={this.onMapReady}
                        onRegionChangeComplete={this.onRegionChange}
                        onPress={e => this.onMapPress(e)}>
                        {this.state.markers.map(marker => (
                            <Marker
                                key={marker.key}
                                coordinate={marker.coordinate}
                                pinColor={marker.color}
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
                </DrawerLayout>
                <ActionSheet
                    ref={o => (this.ActionSheet = o)}
                    //Title of the Bottom Sheet
                    title={'Which one do you like ?'}
                    //Options Array to show in bottom sheet
                    options={optionArray}
                    //Define cancel button index in the option array
                    //this will take the cancel option in bottom and will highlight it
                    cancelButtonIndex={4}
                    //If you want to highlight any specific option you can use below prop
                    destructiveButtonIndex={1}
                    onPress={index => {
                        //Clicking on the option will give you the index of the option clicked
                        alert(optionArray[index]);
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
});

export default MapContainer;
