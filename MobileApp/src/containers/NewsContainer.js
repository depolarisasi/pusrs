/*
 * Created on Thu Oct 03 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {
    StatusBar,
    View,
    Dimensions,
    TouchableWithoutFeedback,
    StyleSheet,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import colors from './../styles/colors';
import HeaderTitleOnly from './../components/headers/HeaderTitleOnly';
import NewsScreen from './../screens/NewsTimeline/News';
import TimelineScreen from './../screens/NewsTimeline/Timeline';

class NewsContainer extends Component {
    static navigationOptions = () => {
        return {
            header: () => <HeaderTitleOnly title="Berita dan Timeline" />,
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            tab: {
                index: 0,
                routes: [
                    {key: 'news', title: 'Berita'},
                    {key: 'timeline', title: 'Timeline'},
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
                                    {backgroundColor: colors.gray02},
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

    render() {
        return (
            <View style={styles.wrapper}>
                <StatusBar
                    backgroundColor={colors.green01}
                    barStyle="dark-content"
                />
                <TabView
                    navigationState={this.state.tab}
                    renderScene={SceneMap({
                        news: NewsScreen,
                        timeline: TimelineScreen,
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
        backgroundColor: colors.green01,
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

export default NewsContainer;
