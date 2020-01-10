/*
 * Created on Fri Nov 01 2019
 *
 * Copyright (c) 2019 Justin
 */

import { ToastAndroid } from 'react-native';
import { SubmissionError, reset } from 'redux-form';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
var uuid = require('react-native-uuid');

export default async function submitSignUp(values, dispatch, props) {
  let error = {};
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const {
    profilePic,
    username,
    password
  } = values;
  let { email } = values;

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
      email = email.toLowerCase();
      await auth().createUserWithEmailAndPassword(email, password)
        .then(async(authData) => {
          const ext = profilePic.uri.split('.').pop();
          const filename = `${uuid.v4()}.${ext}`;
          const refStorage = storage().ref(`/user/${filename}`);
          await refStorage.putFile(profilePic.uri)
            .then(async() => {
              await refStorage.getDownloadURL()
                .then(async(url) => {
                  let account = {};
                  account.email = email;
                  account.uid = authData.user.uid;
                  account.username = username;
                  account.photoURL = url;
                  const refDb = database().ref(`/users/profile/${account.uid}`);
                  await refDb.set({ account })
                    .then(() => {
                      dispatch(reset('signUpForm'));
                      ToastAndroid.show('Registrasi berhasil', ToastAndroid.SHORT);
                    })
                    .catch(error => {
                      console.log(`Gagal menyimpan ke realtime database: ${error.message}`);
                    });
                })
                .catch(error => {
                  console.log(`Gagal mendapatkan storage download URL: ${error.message}`);
                });
            })
            .catch(error => {
              console.log(`Gagal menyimpan file ke storage: ${error.message}`);
            });
        });
    } catch (error) {
      switch (error.code) {
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