import React, { PureComponent } from 'react';
import { BackHandler } from 'react-native';
import { compose, createStore, applyMiddleware } from 'redux';
import {
  createReduxContainer,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';
import { NavigationActions } from 'react-navigation';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { connect } from 'react-redux';
import AppRouteConfigs from './AppRouteConfigs';
import reducer from './../redux/reducers';

const middleware = createReactNavigationReduxMiddleware(
  state => state.nav,
);

const App = createReduxContainer(AppRouteConfigs);

class ReduxNavigation extends PureComponent {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const { navigation, dispatch } = this.props;
    if (navigation.index === 0) {
      return false;
    }

    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    const { navigation, dispatch } = this.props;
    return <App
      state={navigation}
      dispatch={dispatch}
    />;
  }
}

const mapStateToProps = (state) => ({
  navigation: state.nav,
});
const Root = connect(mapStateToProps)(ReduxNavigation);

const loggerMiddleware = createLogger({ predicate: () => __DEV__ });
const configureStore = (initialState) => {
  const enhancer = compose(
    applyMiddleware(
      middleware,
      thunkMiddleware,
      loggerMiddleware,
    ),
  );
  return createStore(reducer, initialState, enhancer);
};

export {
  configureStore,
  Root,
};