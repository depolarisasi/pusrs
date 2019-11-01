/*
 * Created on Fri Nov 01 2019
 *
 * Copyright (c) 2019 Justin
 */

import { SubmissionError, reset } from 'redux-form';
import firebase from 'react-native-firebase';

export default function submitSignUp(values, dispatch, props) {
  let error = {};
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const { username, email, password } = values;

  if (!username) {
    error.username = 'Username harus diisi';
  } else if (!reg.test(email)) {
    error.email = 'Format email salah';
  } else if (!email) {
    error.email = 'Email harus diisi';
  } else if (!password) {
    error.password = 'Password harus diisi';
  }

  if (Object.keys(error).length) {
    throw new SubmissionError(error);
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => alert('Sign up berhasil'))
      .catch(error => console.log('Error while signing user up: ' + error.message));
  }
}