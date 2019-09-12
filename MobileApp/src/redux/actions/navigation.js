/*
 * Created on Thu Sep 12 2019
 *
 * Copyright (c) 2019 Justin
 */

import * as types from './types';

const setLoggedInState = loggedInState => (
  {
    type: types.SET_LOGGED_IN_STATE,
    loggedInState,
  }
);

export {
  setLoggedInState,
};