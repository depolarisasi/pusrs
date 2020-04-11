/**
 * Created by Handy on 03/04/20.
 * Macbook Pro 2015
 * akang.handy95@gmail.com
 */

import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import NativeToastAndroid from 'react-native/Libraries/Components/ToastAndroid/NativeToastAndroid';

export default class HeaderDetailForm extends Component {
    render():
        | React.ReactElement<any>
        | string
        | number
        | {}
        | React.ReactNodeArray
        | React.ReactPortal
        | boolean
        | null
        | undefined {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}>
                    <Text style={styles.text}>Batal</Text>
                </TouchableOpacity>
                <Text style={[styles.text, styles.bold]}>
                    Rincian Moquito Cases
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        NativeToastAndroid.show(
                            'Dalam Proses pengembangan',
                            NativeToastAndroid.SHORT,
                        );
                    }}>
                    <Text style={[styles.text, styles.bold]}>Ubah</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

HeaderDetailForm.protoTypes = {
    //
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: colors.green01,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        fontWeight: '500',
        color: colors.white,
        marginHorizontal: 15,
    },
    bold: {
        fontWeight: 'bold',
    },
    left: {
        width: 80,
        height: 50,
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
