/*
 * Created on Wed Dec 11 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, {Component} from 'react';
import {
    StatusBar,
    View,
    Text,
    TouchableWithoutFeedback,
    StyleSheet,
    Dimensions,
} from 'react-native';
import {TabView} from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import colors from './../styles/colors';
import HeaderForm from './../components/headers/HeaderForm';
import DetailsScreen from './ProbableCases/Details';
import AttachmentsScreen from './ProbableCases/Attachments';

class ProbableCases extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: () => <HeaderForm navigation={navigation} />,
        };
    };

    constructor(props) {
        super(props);
        const {params} = this.props.navigation.state;
        this.state = {
            tab: {
                index: 0,
                routes: [
                    {
                        key: 'details',
                        title: 'Details',
                        value: 'Probable Cases',
                        latitude: params.latitude,
                        longitude: params.longitude,
                    },
                    {
                        key: 'attachments',
                        title: 'Attachments',
                        value: 'Probable Cases',
                        latitude: params.latitude,
                        longitude: params.longitude,
                    },
                ],
            },
        };
    }

    renderTabBar = props => {
        const inputRange = props.navigationState.routes.map((x, i) => i);

        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route, index) => {
                    const color = Animated.color(
                        255,
                        255,
                        255,
                        Animated.interpolate(props.position, {
                            inputRange,
                            outputRange: inputRange.map(inputIndex =>
                                inputIndex === index ? 1 : 0.7,
                            ),
                        }),
                    );
                    return (
                        <TouchableWithoutFeedback
                            key={`tab-${index}`}
                            onPress={() =>
                                this.setState({
                                    tab: {
                                        ...this.state.tab,
                                        index,
                                    },
                                })
                            }>
                            <View
                                style={[
                                    styles.tabItem,
                                    {backgroundColor: colors.green01},
                                ]}>
                                <Animated.Text style={{color}}>
                                    {route.title}
                                </Animated.Text>
                            </View>
                        </TouchableWithoutFeedback>
                    );
                })}
            </View>
        );
    };

    _renderScene = ({route}) => {
        switch (route.key) {
            case 'details':
                return <DetailsScreen data={route} />;
            case 'attachments':
                return <AttachmentsScreen data={route} />;
            default:
                return null;
        }
    };

    submitProbableCases() {
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
                    condition: this.props.data.value,
                    Age: this.state.age,
                },
            },
        ];
        return JSON.stringify(o1);
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <StatusBar
                    backgroundColor={colors.green01}
                    barStyle="dark-content"
                />
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        {this.state.tab.routes[0].value}
                    </Text>
                </View>
                <TabView
                    navigationState={this.state.tab}
                    renderScene={this._renderScene}
                    renderTabBar={this.renderTabBar}
                    onIndexChange={index =>
                        this.setState({
                            tab: {
                                ...this.state.tab,
                                index,
                            },
                        })
                    }
                    initialLayout={{width: Dimensions.get('window').width}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: colors.black,
    },
    scrollView: {
        flex: 1,
        padding: 10,
    },
    titleContainer: {
        backgroundColor: colors.green01,
        paddingHorizontal: 15,
        paddingBottom: 5,
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
});

export default ProbableCases;
