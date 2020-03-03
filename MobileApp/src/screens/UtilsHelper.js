/**
 * Created by Handika Dwiputra on 01/03/2020.
 * handikadwiputradev@gmail.com
 */

import {AsyncStorage} from 'react-native';

export async function getUserToken(key) {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
    } catch (e) {
        alert(`getToken: ${e}`);
    }
}

export async function saveUserToken(key, value) {
    await AsyncStorage.setItem('user', value);
}

export async function removeUserToken(key) {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        alert(`removeUserToken: ${e}`);
    }
}
