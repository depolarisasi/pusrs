/*
 * Created on Thu Dec 05 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    Dimensions,
    ToastAndroid,
} from 'react-native';
import {Linking} from 'react-native';
import {TouchableHighlight} from 'react-native';
import colors from './../../styles/colors';

const WEBSITES = [
    {
        id: 1,
        img: require('./../../img/who.png'),
        url:
            'https://www.who.int/news-room/fact-sheets/detail/dengue-and-severe-dengue',
    },
    {
        id: 2,
        img: require('./../../img/dept_of_health_logo.png'),
        url: 'https://www.doh.gov.ph/Health-Advisory/Dengue',
    },
];

const NEWS = [
    {
        id: 26,
        img: require('./../../img/relief_web.png'),
        title:
            'Dengue cases slightly up in Pengasinan - Philippines - ReliefWeb',
    },
    {
        id: 27,
        img: require('./../../img/relief_web.png'),
        title:
            'Dengue cases slightly up in Pengasinan - Philippines - ReliefWeb',
    },
    {
        id: 28,
        img: require('./../../img/relief_web.png'),
        title:
            'Dengue cases slightly up in Pengasinan - Philippines - ReliefWeb',
    },
];

class News extends Component {
    renderWebsites() {
        return (
            <View>
                {WEBSITES.map((website, index) => (
                    <TouchableHighlight
                        key={`website-${index}`}
                        onPress={() => Linking.openURL(website.url)}>
                        <View style={styles.websiteContainer}>
                            <Image source={website.img} style={styles.image} />
                        </View>
                    </TouchableHighlight>
                ))}
            </View>
        );
    }

    renderNews() {
        return (
            <View>
                {NEWS.map((news, index) => (
                    <TouchableHighlight
                        key={`news-${index}`}
                        onPress={() =>
                            ToastAndroid.show(
                                `news-id ${news.id}`,
                                ToastAndroid.SHORT,
                            )
                        }>
                        <View style={styles.newsContainer}>
                            <View style={styles.imageContainer}>
                                <Image
                                    source={news.img}
                                    style={styles.imageNews}
                                />
                            </View>
                            <View style={styles.newsTextContainer}>
                                <Text style={styles.title}>{news.title}</Text>
                                <Text>CNN America</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                ))}
            </View>
        );
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.header}>
                    <Text style={[styles.text, styles.bold]}>Web & News</Text>
                </View>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.sectionTitle}>
                            <Text style={[styles.text, styles.bold]}>
                                Websites
                            </Text>
                        </View>
                        {this.renderWebsites()}
                        <View style={styles.sectionTitle}>
                            <Text style={[styles.text, styles.bold]}>News</Text>
                        </View>
                        {this.renderNews()}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.green01,
    },
    header: {
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: '500',
        color: colors.white,
        marginHorizontal: 15,
    },
    bold: {
        fontWeight: 'bold',
    },
    sectionTitle: {
        backgroundColor: colors.black,
        paddingVertical: 5,
    },
    sectionTitleText: {
        fontWeight: '500',
        color: colors.white,
        marginHorizontal: 15,
    },
    websiteContainer: {
        backgroundColor: colors.white,
        width: Dimensions.get('window').width,
        height: 150,
    },
    newsContainer: {
        width: Dimensions.get('window').width,
        height: 300,
        paddingBottom: 10,
    },
    imageContainer: {
        display: 'flex',
        flex: 2,
        backgroundColor: colors.gray05,
    },
    image: {
        flex: 1,
        height: 150,
        width: Dimensions.get('window').width,
        resizeMode: 'stretch',
        alignSelf: 'center',
        marginTop: '2%',
        marginBottom: '5%',
    },
    imageNews: {
        flex: 1,
        height: Dimensions.get('window').width / 2,
        width: Dimensions.get('window').width,
        resizeMode: 'stretch',
        alignSelf: 'center',
        marginBottom: '3%',
    },
    imageStyle: {
        flex: 1,
        height: 150,
        alignSelf: 'center',
        marginTop: '2%',
        marginBottom: '5%',
        resizeMode: 'contain',
    },
    newsTextContainer: {
        justifyContent: 'center',
        paddingTop: 5,
        paddingBottom: 10,
        paddingHorizontal: 16,
        backgroundColor: 'white',
    },
    title: {
        color: colors.black,
        fontSize: 14,
        letterSpacing: 0.5,
    },
});

export default News;
