/*
 * Created on Thu Dec 05 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, {Component} from 'react';
import {
    StatusBar,
    View,
    Image,
    StyleSheet,
    FlatList,
    TouchableWithoutFeedback,
} from 'react-native';
import colors from './../../styles/colors';
import HeaderTitleBackable from './../../components/headers/HeaderTitleBackable';

class PDFCollection extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: () => (
                <HeaderTitleBackable
                    navigation={navigation}
                    title="Koleksi PDF"
                />
            ),
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            PDF: [
                {
                    id: 1,
                    imgPdf: require('./../../img/pdf/1.png'),
                    onPress: () =>
                        this.props.navigation.navigate('PdfScreen', {
                            onClickPdfScreen: {uri: 'bundle-assets://PDF1.pdf'},
                        }),
                },
                {
                    id: 2,
                    imgPdf: require('./../../img/pdf/2.png'),
                    onPress: () =>
                        this.props.navigation.navigate('PdfScreen', {
                            onClickPdfScreen: {uri: 'bundle-assets://PDF2.pdf'},
                        }),
                },
                {
                    id: 3,
                    imgPdf: require('./../../img/pdf/3.png'),
                    onPress: () =>
                        this.props.navigation.navigate('PdfScreen', {
                            onClickPdfScreen: {uri: 'bundle-assets://PDF3.pdf'},
                        }),
                },
                {
                    id: 4,
                    imgPdf: require('./../../img/pdf/4.png'),
                    onPress: () =>
                        this.props.navigation.navigate('PdfScreen', {
                            onClickPdfScreen: {uri: 'bundle-assets://PDF4.pdf'},
                        }),
                },
                {
                    id: 5,
                    imgPdf: require('./../../img/pdf/5.png'),
                    onPress: () =>
                        this.props.navigation.navigate('PdfScreen', {
                            onClickPdfScreen: {uri: 'bundle-assets://PDF5.pdf'},
                        }),
                },
                {
                    id: 6,
                    imgPdf: require('./../../img/pdf/6.png'),
                    onPress: () =>
                        this.props.navigation.navigate('PdfScreen', {
                            onClickPdfScreen: {uri: 'bundle-assets://pdf.pdf'},
                        }),
                },
            ],
        };
    }

    renderItem({item, index}) {
        return (
            <TouchableWithoutFeedback onPress={item.onPress}>
                <View style={styles.pdfInnerContainer}>
                    <View style={styles.imageContainer}>
                        <Image source={item.imgPdf} style={styles.image} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <StatusBar
                    backgroundColor={colors.green01}
                    barStyle="dark-content"
                />
                <FlatList
                    contentContainerStyle={styles.listContainer}
                    data={this.state.PDF}
                    renderItem={this.renderItem}
                    numColumns={2}
                    keyExtractor={(item, index) => `pdf-${item.id}`}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    listContainer: {
        padding: 10,
    },
    pdfInnerContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: 5,
    },
    imageContainer: {
        height: 300,
        backgroundColor: colors.white,
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'contain',
    },
});

export default PDFCollection;
