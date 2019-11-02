/*
 * Created on Fri Nov 01 2019
 *
 * Copyright (c) 2019 Justin
 */

import { ToastAndroid } from 'react-native';
import { SubmissionError, reset } from 'redux-form';
import auth from '@react-native-firebase/auth';

export default async function submitSignUp(values, dispatch, props) {
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
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      dispatch(reset('signUpForm'));
      props.navigation.navigate('LogIn');
      ToastAndroid.show('Registrasi berhasil', ToastAndroid.SHORT);
    } catch (e) {
      switch (e,code) {
        case 'auth/email-already-in-use':
          ToastAndroid.show('Alamat email sudah terdaftar', ToastAndroid.SHORT);
          break;
        case 'auth/weak-password':
          ToastAndroid.show('Password harus minimal 6 karakter', ToastAndroid.SHORT);
          break;
      }
    }
  }
}