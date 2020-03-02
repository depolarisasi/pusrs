/**
 * Created by Handika Dwiputra on 29/02/2020.
 * handikadwiputradev@gmail.com
 */

import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../styles/colors';

export default class HeaderMoquito extends Component {
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
                <TouchableOpacity
                    onPress={() => {
                        // this.props.navigation.state.params.checkProbableCases();
                    }}>
                    <Text style={[styles.text, styles.bold]}>Selesai</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
HeaderMoquito.propTypes = {
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
});
