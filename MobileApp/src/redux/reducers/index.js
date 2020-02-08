/*
 * Created on Thu Sep 12 2019
 *
 * Copyright (c) 2019 Justin
 */

import {combineReducers} from 'redux';
import * as Navigation from './navigation';
import {reducer as formReducer} from 'redux-form';

export default combineReducers(
    Object.assign(Navigation, {
        form: formReducer,
    }),
);
