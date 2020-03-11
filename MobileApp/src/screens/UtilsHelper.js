/**
 * Created by Handika Dwiputra on 01/03/2020.
 * handikadwiputradev@gmail.com
 */

import AsyncStorage from '@react-native-community/async-storage';

export async function getAsyncStorage(key) {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
        console.log(`getAsyncStorage: ${value}`);
    } catch (e) {
        alert(`getToken: ${e}`);
    }
}

export async function saveAsyncStorage(key, value) {
    await AsyncStorage.setItem(key, value);
}

export async function removeAsyncStorage(key) {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        alert(`removeUserToken: ${e}`);
    }
}
