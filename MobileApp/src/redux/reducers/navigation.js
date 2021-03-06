/*
 * Created on Thu Sep 12 2019
 *
 * Copyright (c) 2019 Justin
 */

import createReducer from './../helpers/createReducer';
import AppRouteConfigs from './../../navigators/AppRouteConfigs';

const firstAction = AppRouteConfigs.router.getActionForPathAndParams('Loading');
const initialNavState = AppRouteConfigs.router.getStateForAction(firstAction);

const nav = (state = initialNavState, action) => {
    const nextState = AppRouteConfigs.router.getStateForAction(action, state);

    return nextState || state;
};

export {nav};
