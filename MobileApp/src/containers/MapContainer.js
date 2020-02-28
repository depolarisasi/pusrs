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
    TouchableOpacity,
    View,
    Platform,
    TouchableHighlight,
    PermissionsAndroid,
} from 'react-native';
import colors from './../styles/colors';
import DrawerLayout from 'react-native-drawer-layout';
import ActionSheet from 'react-native-actionsheet';
import MapView, {
    AnimatedRegion,
    Callout,
    MAP_TYPES,
    Marker,
    PROVIDER_GOOGLE,
} from 'react-native-maps';
import auth from '@react-native-firebase/auth';
import HeaderMap from './../components/headers/HeaderMap';
import database from '@react-native-firebase/database';
import MapMarker from 'react-native-maps/lib/components/MapMarker';

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
            lokasi: [
                {
                    attributes: {
                        FID: 1,
                        ID: 8,
                        Reported_b: ' ',
                        Address: ' ',
                        Barangay: '3',
                        Residence: ' ',
                        lat: 14.620471,
                        long: 121.021028,
                        Notes: ' ',
                        GlobalID: '7a7c6ba0-85dc-4ebc-b48b-a0e5f354a672',
                        CreationDate: 1560924254539,
                        Creator: 'vonralph',
                        EditDate: 1560924509903,
                        Editor: 'vonralph',
                    },
                    geometry: {
                        x: 13471999.212238502,
                        y: 1645499.2336656044,
                    },
                },
                {
                    attributes: {
                        FID: 2,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: '1',
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '5f0998ef-49b2-42be-aff6-ae779fb272dd',
                        CreationDate: 1560924378221,
                        Creator: '',
                        EditDate: 1560924481797,
                        Editor: 'vonralph',
                    },
                    geometry: {
                        x: 13471787.264400002,
                        y: 1644954.5722999985,
                    },
                },
                {
                    attributes: {
                        FID: 3,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: '2',
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '5377ec9b-f7a1-44c6-8a39-676957e958ee',
                        CreationDate: 1560924440245,
                        Creator: '',
                        EditDate: 1560924497969,
                        Editor: 'vonralph',
                    },
                    geometry: {
                        x: 13471269.1197,
                        y: 1645285.0645999983,
                    },
                },
                {
                    attributes: {
                        FID: 4,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '80e31c3f-5467-4bdb-ad8c-3dad77242695',
                        CreationDate: 1560937120343,
                        Creator: '',
                        EditDate: 1560937120343,
                        Editor: '',
                    },
                    geometry: {
                        x: 14780028.961099995,
                        y: 4008373.431599997,
                    },
                },
                {
                    attributes: {
                        FID: 6,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'a647d83c-b283-4801-a639-4e5ae091fc2b',
                        CreationDate: 1560991438910,
                        Creator: '',
                        EditDate: 1560991443316,
                        Editor: '',
                    },
                    geometry: {
                        x: 13470544.078000002,
                        y: 1641230.6594000012,
                    },
                },
                {
                    attributes: {
                        FID: 7,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'fb7b2a6f-1d28-4f70-b314-42c82b0f07f7',
                        CreationDate: 1560994809472,
                        Creator: '',
                        EditDate: 1560994809472,
                        Editor: '',
                    },
                    geometry: {
                        x: 13472902.062600002,
                        y: 1645207.9518,
                    },
                },
                {
                    attributes: {
                        FID: 8,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'fa256dc0-62e3-4bdd-8a71-5d3cd6b96334',
                        CreationDate: 1561538850475,
                        Creator: '',
                        EditDate: 1561538850475,
                        Editor: '',
                    },
                    geometry: {
                        x: 13475232.6706,
                        y: 1646127.1651999988,
                    },
                },
                {
                    attributes: {
                        FID: 9,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '53da26dd-d241-4eca-965c-3cb152c56cb3',
                        CreationDate: 1561601730402,
                        Creator: '',
                        EditDate: 1561602384061,
                        Editor: '',
                    },
                    geometry: {
                        x: 13474456.7858,
                        y: 1640475.8590999993,
                    },
                },
                {
                    attributes: {
                        FID: 10,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'bbeede52-c4fd-4986-abf7-81bea349ad5b',
                        CreationDate: 1561602518197,
                        Creator: '',
                        EditDate: 1561602518197,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779996.014399998,
                        y: 4008493.251500003,
                    },
                },
                {
                    attributes: {
                        FID: 11,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '88c53bd6-1402-456a-82c8-13a18795b631',
                        CreationDate: 1561626654357,
                        Creator: '',
                        EditDate: 1561626654357,
                        Editor: '',
                    },
                    geometry: {
                        x: 13469280.1465,
                        y: 1642501.0333999991,
                    },
                },
                {
                    attributes: {
                        FID: 12,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'ba2b4c13-4f91-4514-8d1b-9d013f35dc47',
                        CreationDate: 1561641777819,
                        Creator: '',
                        EditDate: 1561641777819,
                        Editor: '',
                    },
                    geometry: {
                        x: 13474951.540399998,
                        y: 1636889.6561000012,
                    },
                },
                {
                    attributes: {
                        FID: 13,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'd9fab8b1-2eaf-432b-9888-142db3d01bbc',
                        CreationDate: 1561953873796,
                        Creator: '',
                        EditDate: 1561953873796,
                        Editor: '',
                    },
                    geometry: {
                        x: 13475534.443,
                        y: 1641946.6125000007,
                    },
                },
                {
                    attributes: {
                        FID: 14,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'beac0c06-9edc-42d9-9ac8-4dee24405517',
                        CreationDate: 1561961213216,
                        Creator: '',
                        EditDate: 1562293030581,
                        Editor: '',
                    },
                    geometry: {
                        x: 13478280.8928,
                        y: 1640846.7897999994,
                    },
                },
                {
                    attributes: {
                        FID: 15,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '71c30d9e-2ba1-460e-b2cd-4a757ce1401b',
                        CreationDate: 1561982143044,
                        Creator: '',
                        EditDate: 1561982143044,
                        Editor: '',
                    },
                    geometry: {
                        x: 13471779.605099998,
                        y: 1638974.5951000005,
                    },
                },
                {
                    attributes: {
                        FID: 16,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '7e4da921-ab7c-47df-9cd9-38be30afb52c',
                        CreationDate: 1562027785222,
                        Creator: '',
                        EditDate: 1562027785222,
                        Editor: '',
                    },
                    geometry: {
                        x: 13477540.8781,
                        y: 1632427.3522999994,
                    },
                },
                {
                    attributes: {
                        FID: 17,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '8c61b620-f2a6-47b3-a645-4de04a4470fd',
                        CreationDate: 1562029453106,
                        Creator: '',
                        EditDate: 1562029453106,
                        Editor: '',
                    },
                    geometry: {
                        x: 13474165.66,
                        y: 1633139.9406999983,
                    },
                },
                {
                    attributes: {
                        FID: 18,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '35b902c8-558e-4cba-bba2-0fc87aff54e1',
                        CreationDate: 1562030896372,
                        Creator: '',
                        EditDate: 1562030896372,
                        Editor: '',
                    },
                    geometry: {
                        x: 13474325.3,
                        y: 1631319.6499000003,
                    },
                },
                {
                    attributes: {
                        FID: 19,
                        ID: null,
                        Reported_b: 'bon',
                        Address: 'malabon',
                        Barangay: 'tina',
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '2fdff047-01b1-4ba4-a9d6-9bf6a54388fa',
                        CreationDate: 1562030996035,
                        Creator: '',
                        EditDate: 1562030996035,
                        Editor: '',
                    },
                    geometry: {
                        x: 13472035.9754,
                        y: 1632180.1854999997,
                    },
                },
                {
                    attributes: {
                        FID: 20,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'cdf73b92-2e00-4f4b-8d04-e396ac0483c2',
                        CreationDate: 1562077306526,
                        Creator: '',
                        EditDate: 1562077306526,
                        Editor: '',
                    },
                    geometry: {
                        x: 13474448.4488,
                        y: 1631211.7738999985,
                    },
                },
                {
                    attributes: {
                        FID: 21,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'f6bba80d-5b80-4c83-aee0-79d2daa3508b',
                        CreationDate: 1562132627961,
                        Creator: '',
                        EditDate: 1562132627961,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779917.0506,
                        y: 4008560.4632999967,
                    },
                },
                {
                    attributes: {
                        FID: 22,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '6c97a97c-44d5-4280-84ac-38777e062b50',
                        CreationDate: 1562137347358,
                        Creator: '',
                        EditDate: 1562137440829,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779902.4524,
                        y: 4008466.5460999985,
                    },
                },
                {
                    attributes: {
                        FID: 23,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '37dd9734-d908-4d4e-9c15-7c512fa75453',
                        CreationDate: 1562138305772,
                        Creator: '',
                        EditDate: 1562138305772,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779942.4309,
                        y: 4008452.487499997,
                    },
                },
                {
                    attributes: {
                        FID: 24,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '8d33b7b5-0646-4a31-a941-2bc0d73fd8cd',
                        CreationDate: 1562139364208,
                        Creator: '',
                        EditDate: 1562139364208,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779915.3865,
                        y: 4008401.2176000034,
                    },
                },
                {
                    attributes: {
                        FID: 25,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'dd38f61b-9a31-4554-8bea-9f6a9e93ca4b',
                        CreationDate: 1562139438642,
                        Creator: '',
                        EditDate: 1562139438642,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779915.3865,
                        y: 4008401.2176000034,
                    },
                },
                {
                    attributes: {
                        FID: 26,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '02a7540e-803f-48fc-98da-f718d86d1e68',
                        CreationDate: 1562226299251,
                        Creator: '',
                        EditDate: 1562226299251,
                        Editor: '',
                    },
                    geometry: {
                        x: 13479406.911200002,
                        y: 1653530.5242,
                    },
                },
                {
                    attributes: {
                        FID: 27,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '2302a3ad-75eb-4953-bb20-06f24131a340',
                        CreationDate: 1562226627057,
                        Creator: '',
                        EditDate: 1562226627057,
                        Editor: '',
                    },
                    geometry: {
                        x: 13478031.1773,
                        y: 1655527.6763000004,
                    },
                },
                {
                    attributes: {
                        FID: 28,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'b4e21587-cae0-4c8f-a416-01f15199dbc8',
                        CreationDate: 1562573442382,
                        Creator: '',
                        EditDate: 1562573442382,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779884.194300003,
                        y: 4008580.2765000015,
                    },
                },
                {
                    attributes: {
                        FID: 30,
                        ID: null,
                        Reported_b: 'Ruslan',
                        Address: '3-86-4',
                        Barangay: 'Shimizu Machi',
                        Residence: 'Kasuga Kopo',
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '94b6cf4f-d813-4d75-b237-62c7e4a19793',
                        CreationDate: 1562649254104,
                        Creator: '',
                        EditDate: 1562649254104,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779508.327799998,
                        y: 4009124.992799998,
                    },
                },
                {
                    attributes: {
                        FID: 31,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '9c36e211-c04d-41b3-b5c6-43a98e142440',
                        CreationDate: 1562677128235,
                        Creator: '',
                        EditDate: 1562677128235,
                        Editor: '',
                    },
                    geometry: {
                        x: 14778650.742799995,
                        y: 4004077.3638999984,
                    },
                },
                {
                    attributes: {
                        FID: 32,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '87c3d369-ead3-4b8a-8445-0806fcc5e785',
                        CreationDate: 1562681843539,
                        Creator: '',
                        EditDate: 1562681843539,
                        Editor: '',
                    },
                    geometry: {
                        x: 14773222.229599996,
                        y: 4000326.627899997,
                    },
                },
                {
                    attributes: {
                        FID: 33,
                        ID: null,
                        Reported_b: 'shiimori',
                        Address: 'Matsuyama ',
                        Barangay: 'Shimizumachi ',
                        Residence: 'honmachi',
                        lat: null,
                        long: null,
                        Notes: 'So Big',
                        GlobalID: '9bd16c26-4053-4d52-88d3-ecd57c33dfb3',
                        CreationDate: 1562742314264,
                        Creator: '',
                        EditDate: 1562742335780,
                        Editor: '',
                    },
                    geometry: {
                        x: 54854657.1961,
                        y: 4008746.0556000024,
                    },
                },
                {
                    attributes: {
                        FID: 34,
                        ID: null,
                        Reported_b: 'Ferdinand Martin',
                        Address: 'Matsuyama ',
                        Barangay: 'Shimizumachi ',
                        Residence: 'Shimizumachi ',
                        lat: null,
                        long: null,
                        Notes: 'A big mosquito bit me',
                        GlobalID: 'a6d82e38-16d4-4b55-b952-8f63ca70e141',
                        CreationDate: 1562742324826,
                        Creator: '',
                        EditDate: 1562742324826,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779375.391900005,
                        y: 4008763.5324999983,
                    },
                },
                {
                    attributes: {
                        FID: 35,
                        ID: null,
                        Reported_b: 'nicaloodeeon ',
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '0b214ae4-a69e-4c88-be11-9ec7ddfa08ff',
                        CreationDate: 1562758097850,
                        Creator: '',
                        EditDate: 1562758097850,
                        Editor: '',
                    },
                    geometry: {
                        x: 13472343.0358,
                        y: 1639795.8323,
                    },
                },
                {
                    attributes: {
                        FID: 36,
                        ID: null,
                        Reported_b: 'Kawamata',
                        Address: null,
                        Barangay: 'simizu',
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '8e98eb1a-a334-4fbc-b2b4-bc952a7a8c83',
                        CreationDate: 1562787811472,
                        Creator: '',
                        EditDate: 1562787811472,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779295.3051,
                        y: 4008779.5469999984,
                    },
                },
                {
                    attributes: {
                        FID: 37,
                        ID: null,
                        Reported_b: 'nicaloodeeon ',
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '87930e47-3d2e-4131-ae81-ca565fba3352',
                        CreationDate: 1562806288373,
                        Creator: '',
                        EditDate: 1562806288373,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779932.9903,
                        y: 4008557.2431000024,
                    },
                },
                {
                    attributes: {
                        FID: 38,
                        ID: null,
                        Reported_b: 'Jacky',
                        Address: 'Ehime University',
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '6ff52c7f-5912-449b-8cb0-60f1b3850ad7',
                        CreationDate: 1562807834571,
                        Creator: '',
                        EditDate: 1562807834571,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779914.736500002,
                        y: 4008484.9372000024,
                    },
                },
                {
                    attributes: {
                        FID: 39,
                        ID: null,
                        Reported_b: 'atikah',
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '4fdd95ce-afb4-4d6f-8fc2-5a2c6ad70a1c',
                        CreationDate: 1562807860458,
                        Creator: '',
                        EditDate: 1562807860458,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779931.767899998,
                        y: 4008577.9443000033,
                    },
                },
                {
                    attributes: {
                        FID: 40,
                        ID: null,
                        Reported_b: 'Joeselle',
                        Address: 'Campus Leben',
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '2f7e86a2-6cf0-40d2-9c69-30379004f075',
                        CreationDate: 1562810283612,
                        Creator: '',
                        EditDate: 1562810283612,
                        Editor: '',
                    },
                    geometry: {
                        x: 14780014.382299997,
                        y: 4008129.665700003,
                    },
                },
                {
                    attributes: {
                        FID: 41,
                        ID: null,
                        Reported_b: 'mari',
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: 'two mosquitoes bite me :(',
                        GlobalID: '477d1f05-9250-4b0d-b143-c9e48ec211a6',
                        CreationDate: 1562811870956,
                        Creator: '',
                        EditDate: 1562811870956,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779975.1968,
                        y: 4008543.7591999993,
                    },
                },
                {
                    attributes: {
                        FID: 42,
                        ID: null,
                        Reported_b: 'tatsuya',
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '207ce015-2bec-40c8-b0dd-30b5fd4d1a05',
                        CreationDate: 1562828388571,
                        Creator: '',
                        EditDate: 1562828451514,
                        Editor: '',
                    },
                    geometry: {
                        x: 14780968.532899998,
                        y: 4007452.0971999983,
                    },
                },
                {
                    attributes: {
                        FID: 43,
                        ID: null,
                        Reported_b: 'tads',
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'de79ce20-f5ee-4b2e-93ad-12e4630b545d',
                        CreationDate: 1562830165255,
                        Creator: '',
                        EditDate: 1562830258832,
                        Editor: '',
                    },
                    geometry: {
                        x: 14780141.86,
                        y: 4008924.492899999,
                    },
                },
                {
                    attributes: {
                        FID: 44,
                        ID: null,
                        Reported_b: 'Naoto Ishitani ',
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '26c5725e-0956-499d-9833-3819a999fb2d',
                        CreationDate: 1562833583394,
                        Creator: '',
                        EditDate: 1562833583394,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779098.739,
                        y: 4008654.8253000006,
                    },
                },
                {
                    attributes: {
                        FID: 45,
                        ID: null,
                        Reported_b: 'Naoto Ishitani ',
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: 'bit by two mosquitoes ',
                        GlobalID: 'e2502ca3-1232-4202-8de8-354075493ee7',
                        CreationDate: 1562834360451,
                        Creator: '',
                        EditDate: 1562834360451,
                        Editor: '',
                    },
                    geometry: {
                        x: 14748912.9084,
                        y: 4089111.287600003,
                    },
                },
                {
                    attributes: {
                        FID: 46,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '6038f1f5-7d3f-438b-8d68-f386a69f8c3b',
                        CreationDate: 1562834837836,
                        Creator: '',
                        EditDate: 1562834837836,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779914.3807,
                        y: 4008505.433899998,
                    },
                },
                {
                    attributes: {
                        FID: 47,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '994918cb-4daf-4ab1-8168-768940106e8a',
                        CreationDate: 1562906099886,
                        Creator: '',
                        EditDate: 1562906099886,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779959.5075,
                        y: 4008833.6683000033,
                    },
                },
                {
                    attributes: {
                        FID: 48,
                        ID: null,
                        Reported_b: 'green girl',
                        Address: 'Matsuyama',
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '6b1360fc-a6c5-4970-aba7-8a256d1e65ae',
                        CreationDate: 1562924800591,
                        Creator: '',
                        EditDate: 1562924800591,
                        Editor: '',
                    },
                    geometry: {
                        x: 14780445.945200004,
                        y: 4009015.058799997,
                    },
                },
                {
                    attributes: {
                        FID: 49,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'f0847a14-ac3a-4d3c-a8fd-092f149ab065',
                        CreationDate: 1563325681781,
                        Creator: '',
                        EditDate: 1563325681781,
                        Editor: '',
                    },
                    geometry: {
                        x: 14781336.805799998,
                        y: 4008960.862999998,
                    },
                },
                {
                    attributes: {
                        FID: 50,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'a53591ba-1518-4b20-b992-790ebfc356e4',
                        CreationDate: 1563335621349,
                        Creator: '',
                        EditDate: 1563335621349,
                        Editor: '',
                    },
                    geometry: {
                        x: 14780561.468400002,
                        y: 4008876.5380999967,
                    },
                },
                {
                    attributes: {
                        FID: 51,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '9ae3954e-a47c-4059-adde-f615a6873753',
                        CreationDate: 1563376082717,
                        Creator: '',
                        EditDate: 1563376082717,
                        Editor: '',
                    },
                    geometry: {
                        x: 14780133.942100003,
                        y: 4008863.1853,
                    },
                },
                {
                    attributes: {
                        FID: 52,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '7f964605-a74f-472b-9ea6-32bf02a619e7',
                        CreationDate: 1563517883799,
                        Creator: '',
                        EditDate: 1563517883799,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779514.520800002,
                        y: 4009120.1389999986,
                    },
                },
                {
                    attributes: {
                        FID: 53,
                        ID: null,
                        Reported_b: 'citra',
                        Address: 'dogo himata',
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '91507b95-836b-4ddb-b812-f40e2b9923b8',
                        CreationDate: 1563784122976,
                        Creator: '',
                        EditDate: 1563784122976,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779961.0867,
                        y: 4008838.1568000014,
                    },
                },
                {
                    attributes: {
                        FID: 54,
                        ID: null,
                        Reported_b: 'ho',
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '41b9daf5-3f2e-408a-a8ee-2305f41babd6',
                        CreationDate: 1563786120199,
                        Creator: '',
                        EditDate: 1563786120199,
                        Editor: '',
                    },
                    geometry: {
                        x: 14780396.5,
                        y: 4008867.4459000006,
                    },
                },
                {
                    attributes: {
                        FID: 55,
                        ID: null,
                        Reported_b: 'Joeselle',
                        Address: 'WHTaft',
                        Barangay: 'Taft',
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'b186ff02-c16a-4cd5-a16e-c143f46ec1a9',
                        CreationDate: 1563900291296,
                        Creator: '',
                        EditDate: 1563900291296,
                        Editor: '',
                    },
                    geometry: {
                        x: 13468915.4637,
                        y: 1639176.3487999998,
                    },
                },
                {
                    attributes: {
                        FID: 56,
                        ID: null,
                        Reported_b: '中川恭輔',
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'b3d89765-37ba-469b-bf6d-a77530802618',
                        CreationDate: 1563943039977,
                        Creator: '',
                        EditDate: 1563943045531,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779201.850199996,
                        y: 4008719.4812000026,
                    },
                },
                {
                    attributes: {
                        FID: 57,
                        ID: null,
                        Reported_b: 'Dai',
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '95df550a-6671-473a-985a-1d9d0051ccde',
                        CreationDate: 1563943401120,
                        Creator: '',
                        EditDate: 1563943401120,
                        Editor: '',
                    },
                    geometry: {
                        x: 14777295.0185,
                        y: 4005963.9661,
                    },
                },
                {
                    attributes: {
                        FID: 58,
                        ID: null,
                        Reported_b: 'savira',
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '4843a361-07ec-4792-b9c2-84a499637392',
                        CreationDate: 1563946546120,
                        Creator: '',
                        EditDate: 1563946546120,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779936.324100005,
                        y: 4008553.489200003,
                    },
                },
                {
                    attributes: {
                        FID: 59,
                        ID: null,
                        Reported_b: 'savira',
                        Address: 'latymar court',
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '057a0c39-46d3-46fd-9dea-06a5e42788c3',
                        CreationDate: 1563946607073,
                        Creator: '',
                        EditDate: 1563946643336,
                        Editor: '',
                    },
                    geometry: {
                        x: 14780132.791,
                        y: 4008889.850100003,
                    },
                },
                {
                    attributes: {
                        FID: 60,
                        ID: null,
                        Reported_b: 'saki',
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'ba2d35d8-9ac0-4fdf-9647-5529efcd18cb',
                        CreationDate: 1563946630734,
                        Creator: '',
                        EditDate: 1563946630734,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779406.0295,
                        y: 4006927.3702000007,
                    },
                },
                {
                    attributes: {
                        FID: 61,
                        ID: null,
                        Reported_b: 'syamane',
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'd761cc31-99c3-4a58-9a3c-13e0b660a3dc',
                        CreationDate: 1563953220562,
                        Creator: '',
                        EditDate: 1563953220562,
                        Editor: '',
                    },
                    geometry: {
                        x: 14780204.348899998,
                        y: 4008794.4627000014,
                    },
                },
                {
                    attributes: {
                        FID: 62,
                        ID: null,
                        Reported_b: 'Erwin Andi',
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '61757f2b-6a1a-4749-a628-275c671034e5',
                        CreationDate: 1563953258633,
                        Creator: '',
                        EditDate: 1563953258633,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779572.407700002,
                        y: 4009152.8059,
                    },
                },
                {
                    attributes: {
                        FID: 63,
                        ID: null,
                        Reported_b: 'Koji',
                        Address: 'Ehime University ',
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '3fbea65f-482a-4826-a5c3-3fd5e57a71df',
                        CreationDate: 1563953363649,
                        Creator: '',
                        EditDate: 1563953363649,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779946.6052,
                        y: 4008532.884300001,
                    },
                },
                {
                    attributes: {
                        FID: 64,
                        ID: null,
                        Reported_b: 'Wataru Ueda',
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '1e5051d4-76bb-4610-88c9-07ba96165ed7',
                        CreationDate: 1563957499655,
                        Creator: '',
                        EditDate: 1563957499655,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779960.5375,
                        y: 4008430.626000002,
                    },
                },
                {
                    attributes: {
                        FID: 65,
                        ID: null,
                        Reported_b: 'Sumida kosuke',
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'e5011472-5c7d-4558-95f9-8d109f602f6c',
                        CreationDate: 1563958157470,
                        Creator: '',
                        EditDate: 1563958157470,
                        Editor: '',
                    },
                    geometry: {
                        x: 14778772.668700002,
                        y: 4009169.5489000008,
                    },
                },
                {
                    attributes: {
                        FID: 66,
                        ID: null,
                        Reported_b: 'yushi',
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'ae1805b8-4ddb-4078-86a9-fa2636be2105',
                        CreationDate: 1563958180708,
                        Creator: '',
                        EditDate: 1563958180708,
                        Editor: '',
                    },
                    geometry: {
                        x: 13471094.3956,
                        y: 1626597.8973999992,
                    },
                },
                {
                    attributes: {
                        FID: 67,
                        ID: null,
                        Reported_b: 'yushi',
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'ca785bcc-9314-405b-98fd-c3c40c4e3182',
                        CreationDate: 1563958286663,
                        Creator: '',
                        EditDate: 1563958286663,
                        Editor: '',
                    },
                    geometry: {
                        x: 13470284.811,
                        y: 1624907.6492,
                    },
                },
                {
                    attributes: {
                        FID: 68,
                        ID: null,
                        Reported_b: 'von',
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '9a2ee789-b696-436d-a3e3-c6edf1012937',
                        CreationDate: 1564385791082,
                        Creator: '',
                        EditDate: 1564385810815,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779956.4758,
                        y: 4008589.190200001,
                    },
                },
                {
                    attributes: {
                        FID: 69,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'f2e807bb-1c6a-4b4c-ace1-63855f08f6a0',
                        CreationDate: 1566430275819,
                        Creator: '',
                        EditDate: 1566430275819,
                        Editor: '',
                    },
                    geometry: {
                        x: 13471768.762200002,
                        y: 1647256.4668000003,
                    },
                },
                {
                    attributes: {
                        FID: 70,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '3b8912cf-2051-4924-8b47-062eae8fb0e9',
                        CreationDate: 1566605726067,
                        Creator: '',
                        EditDate: 1566605726067,
                        Editor: '',
                    },
                    geometry: {
                        x: 13473766.8479,
                        y: 1636025.328499999,
                    },
                },
                {
                    attributes: {
                        FID: 71,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '1d7e105e-7850-4efc-a890-c4486ab1296f',
                        CreationDate: 1566616892998,
                        Creator: '',
                        EditDate: 1566616892998,
                        Editor: '',
                    },
                    geometry: {
                        x: 13472059.1154,
                        y: 1645666.7435000015,
                    },
                },
                {
                    attributes: {
                        FID: 72,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '9185fa9a-a46d-4d0b-a999-de750075dae4',
                        CreationDate: 1566628869827,
                        Creator: '',
                        EditDate: 1566628869827,
                        Editor: '',
                    },
                    geometry: {
                        x: 13472030.644,
                        y: 1645731.7347999995,
                    },
                },
                {
                    attributes: {
                        FID: 73,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '86a92138-058c-44a0-bba6-f7eeac572087',
                        CreationDate: 1566640072138,
                        Creator: '',
                        EditDate: 1566640072138,
                        Editor: '',
                    },
                    geometry: {
                        x: 13472025.4041,
                        y: 1645700.4378000014,
                    },
                },
                {
                    attributes: {
                        FID: 74,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '16c85460-95a4-4284-846b-1686eabc78c7',
                        CreationDate: 1566961216779,
                        Creator: '',
                        EditDate: 1566961216779,
                        Editor: '',
                    },
                    geometry: {
                        x: 13472066.3272,
                        y: 1645742.8381999992,
                    },
                },
                {
                    attributes: {
                        FID: 75,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '189defa4-7b63-4742-bf82-4841ceaa4197',
                        CreationDate: 1566972241705,
                        Creator: '',
                        EditDate: 1566972241705,
                        Editor: '',
                    },
                    geometry: {
                        x: 13472054.433200002,
                        y: 1645714.6744999995,
                    },
                },
                {
                    attributes: {
                        FID: 76,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'd5d47c6b-eecb-4dd2-b9dc-448a3deea8c5',
                        CreationDate: 1567053816376,
                        Creator: '',
                        EditDate: 1567053816376,
                        Editor: '',
                    },
                    geometry: {
                        x: 13472085.695,
                        y: 1645754.7897000017,
                    },
                },
                {
                    attributes: {
                        FID: 77,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '2bc58950-b2c9-446f-bf06-cb36c8900812',
                        CreationDate: 1567059266534,
                        Creator: '',
                        EditDate: 1567059266534,
                        Editor: '',
                    },
                    geometry: {
                        x: 13472008.784899998,
                        y: 1645705.937100001,
                    },
                },
                {
                    attributes: {
                        FID: 78,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '3328bf41-fade-43d7-a626-3ec63aec4958',
                        CreationDate: 1567068976411,
                        Creator: '',
                        EditDate: 1567068976411,
                        Editor: '',
                    },
                    geometry: {
                        x: 13472035.0561,
                        y: 1645711.7890000008,
                    },
                },
                {
                    attributes: {
                        FID: 79,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '0776e5f8-683e-420c-af0f-39fe97991727',
                        CreationDate: 1567129276480,
                        Creator: '',
                        EditDate: 1567129276480,
                        Editor: '',
                    },
                    geometry: {
                        x: 13472076.3926,
                        y: 1645732.0071999987,
                    },
                },
                {
                    attributes: {
                        FID: 80,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'e6123e06-b788-4b6b-b62e-222744177ec6',
                        CreationDate: 1567133463873,
                        Creator: '',
                        EditDate: 1567133463873,
                        Editor: '',
                    },
                    geometry: {
                        x: 13472064.562,
                        y: 1645742.5969000012,
                    },
                },
                {
                    attributes: {
                        FID: 81,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '0641e1f4-79a3-44e3-83bc-c43dc9008dfe',
                        CreationDate: 1567136500221,
                        Creator: '',
                        EditDate: 1567136500221,
                        Editor: '',
                    },
                    geometry: {
                        x: 13472080.8929,
                        y: 1645748.4232,
                    },
                },
                {
                    attributes: {
                        FID: 82,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '3518e247-092f-4b34-9e6d-3ac4a836115b',
                        CreationDate: 1567140042341,
                        Creator: '',
                        EditDate: 1567140042341,
                        Editor: '',
                    },
                    geometry: {
                        x: 13472110.668699998,
                        y: 1645744.4299000015,
                    },
                },
                {
                    attributes: {
                        FID: 83,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'cf542f56-d9f2-4534-8da2-d2ba557af218',
                        CreationDate: 1567152845851,
                        Creator: '',
                        EditDate: 1567152845851,
                        Editor: '',
                    },
                    geometry: {
                        x: 13472096.4063,
                        y: 1645749.2182999998,
                    },
                },
                {
                    attributes: {
                        FID: 84,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '02190609-c56d-4b86-9747-d60b63137f0f',
                        CreationDate: 1567482373919,
                        Creator: '',
                        EditDate: 1567482373919,
                        Editor: '',
                    },
                    geometry: {
                        x: 13471910.3242,
                        y: 1645453.8673,
                    },
                },
                {
                    attributes: {
                        FID: 85,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'dfb3df0e-3be6-43a6-ab21-f9c691beabca',
                        CreationDate: 1567488893026,
                        Creator: '',
                        EditDate: 1567488893026,
                        Editor: '',
                    },
                    geometry: {
                        x: 13472062.9334,
                        y: 1645744.0841999983,
                    },
                },
                {
                    attributes: {
                        FID: 86,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'a238c681-4eda-4ba6-95a3-b35f7536cd18',
                        CreationDate: 1567560433683,
                        Creator: '',
                        EditDate: 1567560433683,
                        Editor: '',
                    },
                    geometry: {
                        x: 13471911.4654,
                        y: 1645455.9134999998,
                    },
                },
                {
                    attributes: {
                        FID: 87,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '84aac559-8540-4957-a6e8-0df950d13adc',
                        CreationDate: 1567563340005,
                        Creator: '',
                        EditDate: 1567563340005,
                        Editor: '',
                    },
                    geometry: {
                        x: 13471882.814599998,
                        y: 1645410.2866999991,
                    },
                },
                {
                    attributes: {
                        FID: 88,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '17daf991-615d-4bad-9a13-b78d4df60f00',
                        CreationDate: 1567581701689,
                        Creator: '',
                        EditDate: 1567581701689,
                        Editor: '',
                    },
                    geometry: {
                        x: 13471919.9923,
                        y: 1645446.1585999988,
                    },
                },
                {
                    attributes: {
                        FID: 89,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '7606627c-7ac4-42a4-99c5-33e4d0f0b002',
                        CreationDate: 1567641762970,
                        Creator: '',
                        EditDate: 1567641762970,
                        Editor: '',
                    },
                    geometry: {
                        x: 13471896.3774,
                        y: 1645450.3348999992,
                    },
                },
                {
                    attributes: {
                        FID: 90,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '98641d63-0b27-48a1-ad19-edc70f33a01d',
                        CreationDate: 1567649595273,
                        Creator: '',
                        EditDate: 1567649595273,
                        Editor: '',
                    },
                    geometry: {
                        x: 13471882.5839,
                        y: 1645414.2655999996,
                    },
                },
                {
                    attributes: {
                        FID: 91,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'ae9ea8c1-3f0c-4caf-aefb-9aeb4ee0548d',
                        CreationDate: 1567661765312,
                        Creator: '',
                        EditDate: 1567661765312,
                        Editor: '',
                    },
                    geometry: {
                        x: 13471921.5817,
                        y: 1645456.8341000006,
                    },
                },
                {
                    attributes: {
                        FID: 92,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '1e0f20dd-9942-4ab6-90de-62ebd8e185ad',
                        CreationDate: 1567668368550,
                        Creator: '',
                        EditDate: 1567668368550,
                        Editor: '',
                    },
                    geometry: {
                        x: 13471872.1288,
                        y: 1645439.4809999987,
                    },
                },
                {
                    attributes: {
                        FID: 93,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '798a3f35-6735-4164-b7f0-cdcd04cf7edf',
                        CreationDate: 1567673286198,
                        Creator: '',
                        EditDate: 1567673286198,
                        Editor: '',
                    },
                    geometry: {
                        x: 13471905.0478,
                        y: 1645455.2074000016,
                    },
                },
                {
                    attributes: {
                        FID: 94,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'c0a590e0-35b5-4182-b279-70e647761b4a',
                        CreationDate: 1567741852363,
                        Creator: '',
                        EditDate: 1567741852363,
                        Editor: '',
                    },
                    geometry: {
                        x: 13476444.7921,
                        y: 1640261.4439999985,
                    },
                },
                {
                    attributes: {
                        FID: 95,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'a6d6327e-6e79-4553-b906-52bff35b20e9',
                        CreationDate: 1567815234134,
                        Creator: '',
                        EditDate: 1567815234134,
                        Editor: '',
                    },
                    geometry: {
                        x: 13471904.6817,
                        y: 1645453.6702000014,
                    },
                },
                {
                    attributes: {
                        FID: 96,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'f26f73d0-8d45-445d-9462-3fd6929b29de',
                        CreationDate: 1568001905369,
                        Creator: '',
                        EditDate: 1568001905369,
                        Editor: '',
                    },
                    geometry: {
                        x: 13476422.995,
                        y: 1640245.9296999983,
                    },
                },
                {
                    attributes: {
                        FID: 97,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'a6022525-d5c6-463e-94a3-80fa091699ef',
                        CreationDate: 1568080333026,
                        Creator: '',
                        EditDate: 1568080333026,
                        Editor: '',
                    },
                    geometry: {
                        x: 13473445.4533,
                        y: 1654733.2349999994,
                    },
                },
                {
                    attributes: {
                        FID: 98,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '5dd5d61a-37d1-47e4-8eed-0f36065e8e2f',
                        CreationDate: 1568096559578,
                        Creator: '',
                        EditDate: 1568096559578,
                        Editor: '',
                    },
                    geometry: {
                        x: 13471916.888,
                        y: 1645457.3792999985,
                    },
                },
                {
                    attributes: {
                        FID: 99,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'f90ba93d-5678-491e-97e6-621745d862db',
                        CreationDate: 1568250116981,
                        Creator: '',
                        EditDate: 1568250116981,
                        Editor: '',
                    },
                    geometry: {
                        x: 13472069.5253,
                        y: 1645743.9737999998,
                    },
                },
                {
                    attributes: {
                        FID: 100,
                        ID: null,
                        Reported_b: 'von',
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'a5285b7d-603d-4fbc-97f6-5e9bf09a8923',
                        CreationDate: 1568623019921,
                        Creator: '',
                        EditDate: 1568623019921,
                        Editor: '',
                    },
                    geometry: {
                        x: 11977698.3893,
                        y: -769428.1482999995,
                    },
                },
                {
                    attributes: {
                        FID: 101,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'fa0b06f6-21fa-47dc-a283-25b415ae6ed3',
                        CreationDate: 1568623019921,
                        Creator: '',
                        EditDate: 1568623019921,
                        Editor: '',
                    },
                    geometry: {
                        x: 11977674.231199998,
                        y: -769446.8746999988,
                    },
                },
                {
                    attributes: {
                        FID: 102,
                        ID: null,
                        Reported_b: 'von',
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '33e38973-7e12-4378-baaa-a0cdb4c66a4c',
                        CreationDate: 1568623579789,
                        Creator: '',
                        EditDate: 1568623601061,
                        Editor: '',
                    },
                    geometry: {
                        x: 11977680.0502,
                        y: -769455.8907000013,
                    },
                },
                {
                    attributes: {
                        FID: 103,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '0443034b-ac57-4e2e-a9c5-a0c03e9d42ff',
                        CreationDate: 1569478487787,
                        Creator: '',
                        EditDate: 1569478487787,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779831.340000004,
                        y: 4008389.4931999967,
                    },
                },
                {
                    attributes: {
                        FID: 104,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'f3623f60-a9ac-41b9-9452-75146050a397',
                        CreationDate: 1570085761094,
                        Creator: '',
                        EditDate: 1570085761094,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779885.6725,
                        y: 4008448.8857000023,
                    },
                },
                {
                    attributes: {
                        FID: 105,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'c45d8d41-62dd-41c3-966e-aeb6eb8496df',
                        CreationDate: 1571124708406,
                        Creator: '',
                        EditDate: 1571124708406,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779934.060900005,
                        y: 4008454.954000003,
                    },
                },
                {
                    attributes: {
                        FID: 106,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '04ba9050-3d10-4c91-8327-14e2fd223b49',
                        CreationDate: 1572072181024,
                        Creator: '',
                        EditDate: 1572072181024,
                        Editor: '',
                    },
                    geometry: {
                        x: -213347.8999999985,
                        y: 7274758.782899998,
                    },
                },
                {
                    attributes: {
                        FID: 107,
                        ID: 100,
                        Reported_b: null,
                        Address: 'Good',
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '944c4b91-156b-420f-a6e9-890a5021b4e7',
                        CreationDate: 1573057644577,
                        Creator: '',
                        EditDate: 1573341851918,
                        Editor: '',
                    },
                    geometry: {
                        x: -13225487.391663114,
                        y: 4028881.660000006,
                    },
                },
                {
                    attributes: {
                        FID: 108,
                        ID: 100,
                        Reported_b: null,
                        Address: 'Good',
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'd7e5dce8-154d-43f4-ba48-c19899eb34bb',
                        CreationDate: 1573057819130,
                        Creator: '',
                        EditDate: 1573057819130,
                        Editor: '',
                    },
                },
                {
                    attributes: {
                        FID: 109,
                        ID: 777,
                        Reported_b: null,
                        Address: 'Good',
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '1d5fed7f-253c-4621-a542-73cf71b6d033',
                        CreationDate: 1573058018036,
                        Creator: '',
                        EditDate: 1580135405075,
                        Editor: 'vonralph',
                    },
                    geometry: {
                        x: 11890467.733129246,
                        y: -818717.0515067702,
                    },
                },
                {
                    attributes: {
                        FID: 110,
                        ID: 100,
                        Reported_b: null,
                        Address: 'GoodX',
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'c6ad9d86-14c4-41f7-9800-88249066d2f2',
                        CreationDate: 1573058127246,
                        Creator: '',
                        EditDate: 1573058127246,
                        Editor: '',
                    },
                },
                {
                    attributes: {
                        FID: 111,
                        ID: 100,
                        Reported_b: null,
                        Address: 'XoodX',
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '956a98c4-d71c-48b2-a18a-07e9fabb66c0',
                        CreationDate: 1573058180896,
                        Creator: '',
                        EditDate: 1573058180896,
                        Editor: '',
                    },
                },
                {
                    attributes: {
                        FID: 112,
                        ID: 100,
                        Reported_b: null,
                        Address: 'FFFX',
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '26410a0d-8a03-4215-9d60-613ccb9d24c3',
                        CreationDate: 1573058314494,
                        Creator: '',
                        EditDate: 1573058314494,
                        Editor: '',
                    },
                    geometry: {
                        x: 3245503.9467101987,
                        y: -2156753.573765379,
                    },
                },
                {
                    attributes: {
                        FID: 113,
                        ID: null,
                        Reported_b: 'von',
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '8568c4cd-c2ee-4f49-aad5-3cf0d0540841',
                        CreationDate: 1573341881392,
                        Creator: '',
                        EditDate: 1573341881392,
                        Editor: '',
                    },
                    geometry: {
                        x: 15628112.7583,
                        y: 4269476.693899997,
                    },
                },
                {
                    attributes: {
                        FID: 114,
                        ID: null,
                        Reported_b: 'von',
                        Address: 'San Lazaro',
                        Barangay: 'Sta Cruz',
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'a91c9e2d-cc27-47b4-acbd-0a3d3730315d',
                        CreationDate: 1573604095248,
                        Creator: '',
                        EditDate: 1573604147280,
                        Editor: '',
                    },
                    geometry: {
                        x: 13467564.2003,
                        y: 1644711.4620000012,
                    },
                },
                {
                    attributes: {
                        FID: 115,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'b6e07a7c-f40e-417c-a7bd-e0a589c48827',
                        CreationDate: 1578301393631,
                        Creator: '',
                        EditDate: 1578301431179,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779884.982500002,
                        y: 4008411.5133000016,
                    },
                },
                {
                    attributes: {
                        FID: 116,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'c6cb7a08-3f14-4442-a929-86001382ddce',
                        CreationDate: 1578386890539,
                        Creator: '',
                        EditDate: 1578386895742,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779881.302199995,
                        y: 4008415.5948999966,
                    },
                },
                {
                    attributes: {
                        FID: 117,
                        ID: 100,
                        Reported_b: null,
                        Address: 'FFFX',
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '986a3093-6db8-4808-9cd5-e50c1f40c702',
                        CreationDate: 1578577536334,
                        Creator: '',
                        EditDate: 1578577536334,
                        Editor: '',
                    },
                    geometry: {
                        x: 3245503.9467101987,
                        y: -2156753.573765379,
                    },
                },
                {
                    attributes: {
                        FID: 118,
                        ID: 100,
                        Reported_b: null,
                        Address: 'FFFX ASDSADASD',
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'e4a9c888-1162-429a-956c-4a2b62772264',
                        CreationDate: 1578577687234,
                        Creator: '',
                        EditDate: 1578577687234,
                        Editor: '',
                    },
                    geometry: {
                        x: 3245503.9467101987,
                        y: -2156753.573765379,
                    },
                },
                {
                    attributes: {
                        FID: 119,
                        ID: 100,
                        Reported_b: 'My Point',
                        Address: 'FFFX ASDSADASD',
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '850417ed-5f62-43e2-85b8-12be3d401de1',
                        CreationDate: 1578577777447,
                        Creator: '',
                        EditDate: 1578577777447,
                        Editor: '',
                    },
                    geometry: {
                        x: 3245503.9467101987,
                        y: -2156753.573765379,
                    },
                },
                {
                    attributes: {
                        FID: 120,
                        ID: 100,
                        Reported_b: 'My Point',
                        Address: 'FFFX ASDSADASD',
                        Barangay: null,
                        Residence: null,
                        lat: 41.640078,
                        long: 0.615234,
                        Notes: null,
                        GlobalID: 'a5a36872-f625-4d78-9437-170a8e58218c',
                        CreationDate: 1578578020189,
                        Creator: '',
                        EditDate: 1578578020189,
                        Editor: '',
                    },
                    geometry: {
                        x: 3245503.9467101987,
                        y: -2156753.573765379,
                    },
                },
                {
                    attributes: {
                        FID: 122,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '64e1a7fb-02f6-4343-a06a-7a2a9db5a54b',
                        CreationDate: 1579359666348,
                        Creator: '',
                        EditDate: 1579359666348,
                        Editor: '',
                    },
                    geometry: {
                        x: 12548012.566799998,
                        y: -819487.3257,
                    },
                },
                {
                    attributes: {
                        FID: 123,
                        ID: 101,
                        Reported_b: 'Jack',
                        Address: 'FFFX ASDSADASD',
                        Barangay: null,
                        Residence: null,
                        lat: 41.640078,
                        long: 0.615234,
                        Notes: null,
                        GlobalID: '2bdf2461-4dc8-41cb-82d6-cf4484978309',
                        CreationDate: 1580133150877,
                        Creator: '',
                        EditDate: 1580135553207,
                        Editor: 'vonralph',
                    },
                    geometry: {
                        x: 4635361.8341807285,
                        y: -68488.8517572276,
                    },
                },
                {
                    attributes: {
                        FID: 124,
                        ID: 666,
                        Reported_b: 'Jaxk',
                        Address: 'FFFX ASDSADASD',
                        Barangay: null,
                        Residence: null,
                        lat: 41.640078,
                        long: 0.615234,
                        Notes: null,
                        GlobalID: '99a6561c-5baf-499e-9c6b-012e33f9fd5d',
                        CreationDate: 1580145496625,
                        Creator: '',
                        EditDate: 1580145496625,
                        Editor: '',
                    },
                    geometry: {
                        x: 3921581.389381422,
                        y: 4269711.484544269,
                    },
                },
                {
                    attributes: {
                        FID: 126,
                        ID: null,
                        Reported_b: 'von',
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'b9e185b4-91ce-444f-8d71-35405ba64e34',
                        CreationDate: 1580273179628,
                        Creator: '',
                        EditDate: 1580273179628,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779888.8063,
                        y: 4008400.3584000026,
                    },
                },
                {
                    attributes: {
                        FID: 127,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '8a15f4f4-dc81-429a-833e-47e8896d14ae',
                        CreationDate: 1580285964621,
                        Creator: '',
                        EditDate: 1580285964621,
                        Editor: '',
                    },
                    geometry: {
                        x: 14780095.3794,
                        y: 4008682.0956000015,
                    },
                },
                {
                    attributes: {
                        FID: 128,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'd7fa5465-04a3-49bc-8674-d035c48ca01c',
                        CreationDate: 1580873477103,
                        Creator: '',
                        EditDate: 1580873477103,
                        Editor: '',
                    },
                    geometry: {
                        x: 13467873.9087,
                        y: 1640403.506900001,
                    },
                },
                {
                    attributes: {
                        FID: 129,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: 'a5951ee6-6275-434a-8170-b800a867a0e5',
                        CreationDate: 1580873528158,
                        Creator: '',
                        EditDate: 1580873560326,
                        Editor: '',
                    },
                    geometry: {
                        x: 13468543.3832,
                        y: 1639898.5416,
                    },
                },
                {
                    attributes: {
                        FID: 130,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '003735e5-2773-4795-a090-a49c5f32b650',
                        CreationDate: 1580961150944,
                        Creator: '',
                        EditDate: 1580961150944,
                        Editor: '',
                    },
                    geometry: {
                        x: 13468773.0907,
                        y: 1639301.6449999996,
                    },
                },
                {
                    attributes: {
                        FID: 131,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '16a2d63f-65f9-46e2-b966-62c53609e7f6',
                        CreationDate: 1581514491844,
                        Creator: '',
                        EditDate: 1581514491844,
                        Editor: '',
                    },
                    geometry: {
                        x: 14780007.324600004,
                        y: 4008362.2949,
                    },
                },
                {
                    attributes: {
                        FID: 132,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '0d3776dc-8897-4817-827a-807142b5673d',
                        CreationDate: 1581559725956,
                        Creator: '',
                        EditDate: 1581559725956,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779905.2157,
                        y: 4008453.0820000023,
                    },
                },
                {
                    attributes: {
                        FID: 133,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '972bd00e-f92d-46f5-a74a-6b784cc0ff5f',
                        CreationDate: 1581574347791,
                        Creator: '',
                        EditDate: 1581574347791,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779885.858499996,
                        y: 4008447.688699998,
                    },
                },
                {
                    attributes: {
                        FID: 134,
                        ID: null,
                        Reported_b: null,
                        Address: null,
                        Barangay: null,
                        Residence: null,
                        lat: null,
                        long: null,
                        Notes: null,
                        GlobalID: '5ef9adba-57e2-4ee3-b059-c88cf8732707',
                        CreationDate: 1581582523571,
                        Creator: '',
                        EditDate: 1581582523571,
                        Editor: '',
                    },
                    geometry: {
                        x: 14779905.090800002,
                        y: 4008449.3483000025,
                    },
                },
                {
                    attributes: {
                        FID: 135,
                        ID: 101,
                        Reported_b: 'Jack',
                        Address: 'FFFX ASDSADASD',
                        Barangay: '',
                        Residence: '',
                        lat: 41.640078,
                        long: 0.615234,
                        Notes: '',
                        GlobalID: '1d753f03-7940-44cc-97c8-73a1b9e79e7e',
                        CreationDate: 1582167159748,
                        Creator: '',
                        EditDate: 1582167159748,
                        Editor: '',
                    },
                    geometry: {
                        x: 4635352.279552193,
                        y: -68488.8517572276,
                    },
                },
                {
                    attributes: {
                        FID: 136,
                        ID: 101,
                        Reported_b: 'Jack',
                        Address: 'FFFX ASDSADASD',
                        Barangay: '',
                        Residence: '',
                        lat: 41.640078,
                        long: 0.615234,
                        Notes: '',
                        GlobalID: '91825035-6c01-42d9-a334-743c08545296',
                        CreationDate: 1582167815842,
                        Creator: '',
                        EditDate: 1582167815842,
                        Editor: '',
                    },
                    geometry: {
                        x: 4635352.279552193,
                        y: -68488.8517572276,
                    },
                },
            ],
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
    }

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
    async componentDidUpdate(
        prevProps: Readonly<P>,
        prevState: Readonly<S>,
        snapshot: SS,
    ): void {
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

    async componentDidMount(): void {
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
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        await this.requestGPSPermission();
        if (this.state._isPermission) {
            this.onBtnShowUserLocationTapped();
        }
    }
    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {}

    // shouldComponentUpdate(
    //     nextProps: Readonly<P>,
    //     nextState: Readonly<S>,
    //     nextContext: any,
    // ): boolean {}

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
                                'Sorry, it will appear in the next version...',
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
                                    Work Online
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => [
                            ToastAndroid.show(
                                'Sorry, it will appear in the next version...',
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
                                    Working Offline
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => [
                            ToastAndroid.show(
                                'Sorry, it will appear in the next version...',
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
                                    Synchronize Offline Map
                                </Text>
                                <Text
                                    style={[
                                        styles.drawerBottomText,
                                        {fontSize: 10},
                                    ]}>
                                    last sync --/--/-- --:--
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => [
                            ToastAndroid.show(
                                'Sorry, it will appear in the next version...',
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
                                    Delete Offline Map
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
                    onDrawerClose={() => this.setState({drawerActive: false})}>
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
                        userLocationPriority="high"
                        mapType={MAP_TYPES.STANDARD}
                        showsScale={true}
                        followsUserLocation={true}
                        initialRegion={this.state.region}
                        onMapReady={this.onMapReady}
                        onRegionChange={this.onRegionChange}
                        onPress={e => this.onMapPress(e)}>
                        {this.state.lokasi.map(function(item, i) {
                            if (item.attributes.long && item.attributes.lat) {
                                return (
                                    <MapMarker
                                        ref={ref => {
                                            this.marker = ref;
                                        }}
                                        key={i}
                                        coordinate={{
                                            latitude: item.attributes.lat,
                                            longitude: item.attributes.long,
                                        }}
                                        title={item.attributes.notes}
                                        tracksViewChanges={true}
                                        identifier="DestMarker"
                                        draggable>
                                        <Callout
                                            tooltip
                                            style={styles.customView}>
                                            <TouchableHighlight
                                                onPress={() =>
                                                    console.log('Click')
                                                }
                                                underlayColor="#dddddd">
                                                <View
                                                    style={styles.calloutText}>
                                                    <Text>
                                                        {item.attributes.notes}
                                                    </Text>
                                                </View>
                                            </TouchableHighlight>
                                        </Callout>
                                    </MapMarker>
                                );
                            }
                        })}
                    </MapView>
                </DrawerLayout>

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
    customView: {
        height: 50,
        width: 50,
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
});

export default MapContainer;
