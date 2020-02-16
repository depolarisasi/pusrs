/**
 * Created by Handika Dwiputra on 16/02/2020.
 * handikadwiputradev@gmail.com
 */

import React, {Component} from 'react';
import HeaderForm from '../components/headers/HeaderForm';
import {
    Dimensions,
    StatusBar,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import colors from '../styles/colors';
import {SceneMap, TabView} from 'react-native-tab-view';
import DetailsScreen from './ProbableCases/Details';
import AttachmentsScreen from './ProbableCases/Attachments';
import Animated from 'react-native-reanimated';

class MoquitoCases extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: () => <HeaderForm navigation={navigation} />,
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            tab: {
                index: 0,
                routes: [
                    {key: 'details', title: 'Details'},
                    {key: 'attachments', title: 'Attachments'},
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
        return (
            <View style={styles.wrapper}>
                <StatusBar
                    backgroundColor={colors.green01}
                    barStyle="dark-content"
                />
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Probable Cases</Text>
                </View>
                <TabView
                    navigationState={this.state.tab}
                    renderScene={SceneMap({
                        details: DetailsScreen,
                        attachments: AttachmentsScreen,
                    })}
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

export default MoquitoCases;
