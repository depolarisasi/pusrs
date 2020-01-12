/*
 * Created on Sat Sep 14 2019
 *
 * Copyright (c) 2019 Justin
 */

import {StyleSheet} from 'react-native';
import colors from './../../styles/colors';

let termsTextSize = 14;
let appNameTextSize = 20;

const styles = StyleSheet.create({
    bg: {
        width: '100%',
        height: '100%',
        flex: 1,
        display: 'flex',
    },
    wrapper: {
        flex: 1,
        display: 'flex',
    },
    wrapperInner: {
        flex: 1,
        display: 'flex',
        marginTop: 30,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    appIcon: {
        width: 100,
        height: 100,
        marginTop: 50,
    },
    appName: {
        fontSize: appNameTextSize,
        color: colors.black,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    termsAndConditions: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    termsText: {
        color: colors.white,
        fontSize: termsTextSize,
        fontWeight: '600',
    },
    linkText: {
        color: colors.blue01,
    },
    facebookButtonIcon: {
        color: colors.gray01,
        position: 'relative',
        left: 20,
        zIndex: 8,
    },
});

export default styles;
