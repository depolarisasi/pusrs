import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import HeaderTitleBackable from '../../components/headers/HeaderTitleBackable';
import Pdf from 'react-native-pdf';

/**
 * Created by Handika Dwiputra on 26/01/2020.
 * handikadwiputradev@gmail.com
 */

class PdfScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: () => (
                <HeaderTitleBackable
                    navigation={navigation}
                    title="Pdf Screen"
                />
            ),
        };
    };
    constructor(props) {
        super(props);
        const {params} = this.props.navigation.state;
        this.state = {
            pdfFile: params.onClickPdfScreen,
        };
    }

    render() {
        return <Pdf source={this.state.pdfFile} style={styles.pdf} />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    TextStyle: {
        fontSize: 23,
        textAlign: 'center',
        color: '#f00',
    },
});
export default PdfScreen;
