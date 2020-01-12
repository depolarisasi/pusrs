/*
 * Created on Thu Oct 03 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, {PureComponent} from 'react';
import {BackHandler} from 'react-native';
import {compose, createStore, applyMiddleware} from 'redux';
import {
    createReduxContainer,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import {NavigationActions} from 'react-navigation';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {connect} from 'react-redux';
import AppRouteConfigs from './AppRouteConfigs';
import reducer from './../redux/reducers';

const middleware = createReactNavigationReduxMiddleware(state => state.nav);

const App = createReduxContainer(AppRouteConfigs);

class ReduxNavigation extends PureComponent {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    shouldCloseApp = nav => {
        if (nav.index > 0) {
            return false;
        }

        if (nav.routes) {
            return nav.routes.every(this.shouldCloseApp);
        }

        return true;
    };

    goBack = () => this.props.dispatch(NavigationActions.back());

    onBackPress = () => {
        if (this.shouldCloseApp(this.props.navigation)) {
            return false;
        }
        this.goBack();
        return true;
    };

    render() {
        const {navigation, dispatch} = this.props;
        return <App state={navigation} dispatch={dispatch} />;
    }
}

const mapStateToProps = state => ({
    navigation: state.nav,
});
const Root = connect(mapStateToProps)(ReduxNavigation);

const loggerMiddleware = createLogger({predicate: () => __DEV__});
const configureStore = initialState => {
    const enhancer = compose(
        applyMiddleware(middleware, thunkMiddleware, loggerMiddleware),
    );
    return createStore(reducer, initialState, enhancer);
};

export {configureStore, Root};
