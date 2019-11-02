/*
 * Created on Sat Nov 02 2019
 *
 * Copyright (c) 2019 Justin
 */

import { ToastAndroid } from 'react-native';
import { SubmissionError, reset } from 'redux-form';
import auth from '@react-native-firebase/auth';

export default async function submitLogin(values, dispatch, props) {
  let error = {};
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const { email, password } = values;

  if (!reg.test(email)) {
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
      await auth().signInWithEmailAndPassword(email, password);
      dispatch(reset('logInForm'));
      props.navigation.navigate('LoggedIn');
      ToastAndroid.show('Log in berhasil', ToastAndroid.SHORT);
    } catch (e) {
      switch (e.code) {
        case 'auth/user-not-found':
          ToastAndroid.show('User tidak terdaftar atau mungkin sudah terhapus', ToastAndroid.SHORT);
          break;
        case 'auth/wrong-password':
          ToastAndroid.show('Password tidak valid', ToastAndroid.SHORT);
          break;
      }
    }
  }
}